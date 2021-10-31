package com.gladias.coderithm.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class RegisterRequest {
    @NotBlank
    @Size(min = 6, max = 20)
    private String login;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(min = 6, max = 40)
    private String passwordConfirm;

    @Email
    private String email;
}
