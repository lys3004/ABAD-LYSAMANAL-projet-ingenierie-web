package com.event.auth.controllers;

import com.event.auth.entities.AppUser;
import com.event.auth.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUser register(@RequestBody AppUser user) {
        userService.register(user);
        return user;
    }

    @PostMapping("/login")
    public AppUser login(@RequestBody AppUser user) {
        return userService.login(user.getEmail(), user.getPassword());
    }
}
