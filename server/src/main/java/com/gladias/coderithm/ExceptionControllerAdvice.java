package com.gladias.coderithm;

import com.gladias.coderithm.payload.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionControllerAdvice {
    @ResponseStatus(HttpStatus.BAD_REQUEST) // 400
    @ExceptionHandler(value = {RuntimeException.class})
    public ResponseEntity<ErrorResponseDto> handleException(RuntimeException ex) {
        String errorCause = ex.getCause() != null ? ex.getCause().getMessage() : "Unknown";

        return ResponseEntity.badRequest()
                .body(new ErrorResponseDto(ex.getMessage(), errorCause));
    }
}
