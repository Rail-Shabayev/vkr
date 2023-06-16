package com.task.vkr.controller;

import com.task.vkr.model.Cart;
import com.task.vkr.model.Product;
import com.task.vkr.repo.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = {"http://localhost:4200"})
public class CartController {

    @Autowired
    private CartRepo cartRepo;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Cart> getCart() {
        return cartRepo.findAll();
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Cart postCart(@RequestBody Cart cart) {
        return cartRepo.save(cart);
    }

}
