package com.task.vkr.controller;

import com.task.vkr.model.User;
import com.task.vkr.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/login")
public class LoginController {
    @Autowired
    UserRepo userRepo;

    @GetMapping
    public String login() {
        return "authenticated successfully";
    }

    @GetMapping("/user")
    public User user(Principal user) {
        Optional<User> user1 = userRepo.findByUsername(user.getName());
        return user1.get();
    }

}
