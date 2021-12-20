package com.gladias.coderithm.payload.profile;

import com.gladias.coderithm.model.DifficultyLevel;

import java.util.Map;

public record ProfileResponse(String username,
                              Integer position,
                              Map<DifficultyLevel, Integer> challengesByDifficulty,
                              Map<String, Integer> generalStats,
                              Map<String, Integer> challengesByLanguage) { }
