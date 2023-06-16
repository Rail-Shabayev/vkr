const express = require("express"); //imports
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "sk_test_51N79ZQCO37AiN0jQn7PG3tcEuz8zH9M6tTs0gsDux4HWWQbopg3TbYJUf9cU3vANeyglXdl7J6SuxHjOnrFdOFG600sCfyusSp"
);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["RU", "UA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "rub",
            },
            display_name: "Бесплатная доставка",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 15000,
              currency: "rub",
            },
            display_name: "Доставка на следующий день",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "rub",
          product_data: {
            name: item.name,
            images: ["./src/" + item.imageUrl],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4200/success",
      cancel_url: "http://localhost:4200/cart",
      currency: "rub",
      locale: "ru",
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

// stripe webhook

const endpointSecret =
  "whsec_37ad9095225df24056f32cba9a39f0cc9e73fd33a8ce98f82b4f066962551bea";

// app.use(bodyparser.text);
app.post(
  "/webhook",
  express.raw({ type: "application/text" }),
  (request, response) => {
    let event = request.rawBody;

    if (endpointSecret) {
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.rawBody,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    console.log(event);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    response.send().end();
  }
);

app.listen(4242, () => console.log("Running on port 4242"));
