package com.gladias.coderithm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import com.gladias.coderithm.exception.NoPasswordMatchException;
import com.gladias.coderithm.exception.UserAlreadyExistsException;
import com.gladias.coderithm.payload.RegisterRequest;
import com.gladias.coderithm.payload.UserDto;
import com.gladias.coderithm.service.UserService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService service;

    @GetMapping("/auth/userData")
    public UserDto getUserData(@CookieValue("token") String token) {
        return service.getUserData(UserService.getUsernameFromToken(token));
    }

    @PostMapping("/auth/register")
    public void registerUserAccount(@RequestBody @Valid RegisterRequest registerRequest) {
        try {
            service.registerUserAccount(registerRequest);
        } catch (UserAlreadyExistsException | NoPasswordMatchException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}

