package com.gladias.coderithm.payload.challenge.add;

import com.gladias.coderithm.model.DifficultyLevel;

import java.util.List;
import java.util.Set;

public record AddChallengeRequest(String title,
                                  String description,
                                  DifficultyLevel difficultyLevel,
                                  Set<String> tags,
                                  List<String> languages,
                                  Integer linesLimit,
                                  Integer executionTimeLimitInSeconds,
                                  Set<AddChallengeDataSet> dataSets) {
}
