package com.gladias.coderithm.payload.challenge;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.DifficultyLevel;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.SolutionStatus;
import com.gladias.coderithm.model.TagEntity;
import com.gladias.coderithm.model.TestCaseEntity;

import java.util.Set;
import java.util.stream.Collectors;

public record ChallengeDto(Long id, String title, String description, String author,
                           DifficultyLevel difficultyLevel, SolutionStatus solutionStatus,
                           int commentsNumber, double averageRating, Set<String> tags, Set<String> availableLanguages,
                           Set<TestCaseEntity> testCases, Integer linesLimit, Integer executionTimeLimitInSeconds) {
    public static ChallengeDto of(ChallengeEntity challenge) {
        return new ChallengeDto(
                challenge.getId(),
                challenge.getTitle(),
                challenge.getDescription(),
                challenge.getAuthor().getLogin(),
                challenge.getDifficultyLevel(),
                challenge.getSolutionStatus(),
                challenge.getCommentsNumber(),
                challenge.getAverageRating(),
                challenge.getTagsValues(),
                challenge.getAvailableLanguages().stream().map(LanguageEntity::getName).collect(Collectors.toSet()),
                challenge.getTestCases(),
                challenge.getLinesLimit(),
                challenge.getExecutionTimeLimitInSeconds());
    }
}
