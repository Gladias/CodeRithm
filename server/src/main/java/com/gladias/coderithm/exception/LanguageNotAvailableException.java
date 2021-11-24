package com.gladias.coderithm.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class LanguageNotAvailableException extends Exception {
    public LanguageNotAvailableException(String message) {
        super(message);
    }
}
