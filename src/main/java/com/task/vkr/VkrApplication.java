package com.task.vkr;

import com.task.vkr.model.Cart;
import com.task.vkr.model.Product;
import com.task.vkr.model.User;
import com.task.vkr.repo.CartRepo;
import com.task.vkr.repo.UserRepo;
import com.task.vkr.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class VkrApplication {

    public static void main(String[] args) {
        SpringApplication.run(VkrApplication.class, args);
    }

    @Bean
    CommandLineRunner saveData(ProductService productService, UserRepo userRepo, CartRepo cartRepo) {
        return args -> {
            Product product1 = new Product(1L, "15,6\" Ноутбук Acer Aspire 3 A315-56, Intel Core i3-1005G1 (1.2 ГГц), RAM 8 ГБ, SSD 512 ГБ, Intel UHD Graphics, Windows Home, (NX.HS5ER.02D), черный, Российская клавиатура",
                    "Воспроизводите видео быстро и без задержек, просматривайте веб-страницы или выполняйте рабочие задачи благодаря процессорам Intel® Core™ i3, i5, i7 до 10-го поколения* и видеокарте NVIDIA® GeForce® MX230*(опционально).",
                    new BigDecimal(32235),
                    1500,
                    LocalDateTime.of(2017, 8, 23, 4, 2),
                    "assets/images/1.webp",
                    false, "Ноутбуки");
            Product product2 = new Product(2L, "13.3\" Ноутбук Apple MacBook Air 13 (2020), Apple M1 (8C CPU, 7C GPU), RAM 8 ГБ, SSD 256 ГБ, macOS, (MGN63RU/A), Space Grey, Российская клавиатура",
                    "Macbook Air, Адаптер питания USB-C мощностью 30 Вт, Кабель USB‑C для зарядки (2 м)",
                    new BigDecimal(92500),
                    660,
                    LocalDateTime.of(2013, 2, 12, 21, 43),
                    "assets/images/2.webp",
                    true, "Ноутбуки");
            Product product3 = new Product(3L, "27\" Монитор Digma DM-MONB2704, темно-серый",
                    "Благодаря большому 27-дюймовому экрану с разрешением Full HD (1920×1080) монитор DM-MONB2704 станет комфортным вариантом как для работы в графических редакторах, так и для домашнего просмотра фильмов и сериалов. ",
                    new BigDecimal(13000),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/3.webp",
                    true, "Мониторы");
            Product product4 = new Product(4L, "27\" Монитор Xiaomi 27\" Desktop Monitor, черный",
                    "Широкий угол обзора Xiaomi Desktop Monitor 27 в 178° доступен откуда бы вы не смотрели. Вы можете настроить отображение на дисплее как слева направо, так и справа налево. Дисплей монитора получил больше углов обзора и меньше слепых зон.\n",
                    new BigDecimal(9000),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/4.webp",
                    true, "Мониторы");
            Product product5 = new Product(5L, "Принтер Epson 3251",
                    "Принтер Epson устанавливается путем простой заливки чернил для татуировки в резервуар для черных чернил.",
                    new BigDecimal(7000),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/5.webp",
                    true, "Принтеры");
            Product product6 = new Product(6L, "Принтер лазерный Pantum P2516 (020978)",
                    "Официальная поставка. Гарантия в официальном сервисном центре. Монохромный лазерный принтер Pantum P2516 Black (PA1P2516)",
                    new BigDecimal(8000),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/6.webp",
                    true, "Принтеры");
            Product product7 = new Product(7L, "Проводная клавиатура Defender #1 HB-420 RU, черный, полноразмерная",
                    "Полноразмерная раскладка клавиш и угол наклона клавиатуры регулируется с помощью ножек.",
                    new BigDecimal(1000),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/7.webp",
                    true, "Клавиатуры");
            Product product8 = new Product(8L, "Клавиатура GMNG 985GK механическая черный USB Multimedia for gamer LED",
                    "Красные свитчи обеспечивают четкое срабатывание клавиш с минимальной тактильной отдачей. Для комфортного использования клавиатуры предусмотрена эргономичная подставка под запястья.",
                    new BigDecimal(3000),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/8.webp",
                    true, "Клавиатуры");
            Product product9 = new Product(9L, "Мышь Оклик 245M, оптическая, 1000 dpi, USB, 3 кн., проводная, черный",
                    "Мышь OKLICK 245M обладает высокими показателями наработки на отказ — 3 млн кликов, поэтому оптимально подходит для офисного пользования. Форма модели позволяет работать и правой, и левой руками.",
                    new BigDecimal(500),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/9.webp",
                    true, "Мышки");
            Product product10 = new Product(10L, "Мышь оптическая беспроводная с переходником 2,4G для компьютера, ноутбука Черная",
                    "Мышь Wogow имеет эргономичную форму, выполнена из качественного пластика в классическом черном цвете. Обладает всеми необходимыми для бесперебойной и эффективной работы функциями. ",
                    new BigDecimal(800),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/10.webp",
                    true, "Мышки");
            Product product11 = new Product(11L, "Сканер Canon CanoScan LiDE300 (версия CN)",
                    "льтратонкий планшетный сканер CanoScan LiDE 300 толщиной всего 42 мм. Благодаря уникальной технологии Canon LiDE Slide 300 обеспечивает дополнительную легкость и долговечность.",
                    new BigDecimal(1500),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/11.webp",
                    true, "Сканеры");
            Product product12 = new Product(12L, "Сканер планшетный Plustek OpticSlim 2610 Plus",
                    "Компактный, стильный и высокоскоростной сканер формата A4 для дома или офиса. Значительно повышает эффективность вашей работы за счет преобразования бумажных документы в электронные файлы всего за 3 секунды.",
                    new BigDecimal(2500),
                    230,
                    LocalDateTime.of(2011, 2, 16, 9, 12),
                    "assets/images/12.webp",
                    true, "Сканеры");

            User user1 = new User(1L, "Rail", "1234", "we@mail.ru", "89025826935", "Moscow", "Rail Shabayev", "ROLE_USER");
            userRepo.save(user1);
            productService.saveProduct(product1);
            productService.saveProduct(product2);
            productService.saveProduct(product3);
            productService.saveProduct(product4);
            productService.saveProduct(product5);
            productService.saveProduct(product6);
            productService.saveProduct(product7);
            productService.saveProduct(product8);
            productService.saveProduct(product9);
            productService.saveProduct(product10);
            productService.saveProduct(product11);
            productService.saveProduct(product12);
            cartRepo.save(new Cart(0L, new ArrayList<>()));
        };
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

}
