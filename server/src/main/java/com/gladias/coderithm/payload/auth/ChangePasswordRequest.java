package com.gladias.coderithm.payload.auth;

public record ChangePasswordRequest(String oldPassword, String newPassword) { }
