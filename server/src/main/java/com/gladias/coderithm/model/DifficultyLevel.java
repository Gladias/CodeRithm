package com.gladias.coderithm.model;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public enum DifficultyLevel {
    EASY, MEDIUM, HARD, CHALLENGING;

    public static Set<DifficultyLevel> getValues() {
        return new LinkedHashSet<>(List.of(DifficultyLevel.values()));
    }
}
