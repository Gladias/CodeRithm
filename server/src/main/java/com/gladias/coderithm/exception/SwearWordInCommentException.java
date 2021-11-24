package com.gladias.coderithm.exception;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@ResponseStatus(value= HttpStatus.BAD_REQUEST, reason="No swear words allowed")
public class SwearWordInCommentException extends Exception {
    public SwearWordInCommentException(String message) {
        super(message);
    }
}
