package com.gladias.coderithm.payload.challenge;

import com.gladias.coderithm.model.DifficultyLevel;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.SortingOption;

import java.util.Set;

public record ChallengesRequest(Integer page, Integer size,
                                Set<DifficultyLevel> difficultyLevels, LanguageEntity selectedLanguageEntity,
                                SortingOption sortingOption) {}
