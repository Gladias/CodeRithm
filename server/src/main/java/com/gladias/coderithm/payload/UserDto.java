package com.gladias.coderithm.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private final Long id;
    private final String login;
    private final String email;
}
