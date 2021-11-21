package com.gladias.coderithm.payload.auth;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record RegisterRequest(@NotBlank @Size(min = 6, max = 20)String login,
                              @NotBlank @Size(min = 6, max = 40)String password,
                              @NotBlank @Size(min = 6, max = 40)String passwordConfirm,
                              @Email String email) {}
