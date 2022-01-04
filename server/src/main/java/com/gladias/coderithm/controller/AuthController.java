package com.gladias.coderithm.controller;

import com.gladias.coderithm.exception.NoPasswordMatchException;
import com.gladias.coderithm.exception.UserAlreadyExistsException;
import com.gladias.coderithm.payload.auth.ChangePasswordRequest;
import com.gladias.coderithm.payload.auth.RegisterRequest;
import com.gladias.coderithm.payload.auth.UserDto;
import com.gladias.coderithm.service.AuthService;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/userData")
    public UserDto getUserData(@CookieValue("token") String token) {
        return authService.getUserData(AuthService.getUsernameFromToken(token));
    }

    @PostMapping("/register")
    public void registerUserAccount(@RequestBody @Valid RegisterRequest registerRequest) {
        try {
            authService.registerUserAccount(registerRequest);
        } catch (UserAlreadyExistsException | NoPasswordMatchException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("/changePassword")
    public void changePassword(@CookieValue("token") String token, @RequestBody ChangePasswordRequest changePasswordRequest) {
        try {
            authService.changePassword(token, changePasswordRequest);
        } catch (NoPasswordMatchException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}

