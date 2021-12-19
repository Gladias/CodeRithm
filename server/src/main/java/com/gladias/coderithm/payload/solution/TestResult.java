package com.gladias.coderithm.payload.solution;

import java.util.Objects;

public record TestResult(String input, String output, String userOutput) {
    public boolean isPassed() {
        return Objects.equals(output, userOutput);
    }
}
