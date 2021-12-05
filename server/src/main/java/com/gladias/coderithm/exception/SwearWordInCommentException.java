package com.gladias.coderithm.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@NoArgsConstructor
@Getter
@ResponseStatus(value= HttpStatus.BAD_REQUEST)
public class SwearWordInCommentException extends Exception {

    public SwearWordInCommentException(List<String> detectedSwearWords) {
        super("Detected swear words: " + detectedSwearWords);
    }
}
