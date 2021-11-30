package com.gladias.coderithm.payload.challenge;

import com.gladias.coderithm.model.DifficultyLevel;

import java.util.Set;

public record AddChallengeRequest(String title,
                                  String description,
                                  DifficultyLevel difficultyLevel,
                                  Set<String> tags,
                                  Set<String> languages,
                                  Integer linesLimit,
                                  Integer executionTimeLimitInSeconds) {
}
