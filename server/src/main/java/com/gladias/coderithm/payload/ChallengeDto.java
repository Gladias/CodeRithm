package com.gladias.coderithm.payload;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.DifficultyLevel;
import com.gladias.coderithm.model.SolutionStatus;

public record ChallengeDto(Long id, String title, String description, String author,
                           DifficultyLevel difficultyLevel, SolutionStatus solutionStatus,
                           int commentsNumber, double averageRating) {
    public static ChallengeDto of(ChallengeEntity challenge) {
        return new ChallengeDto(
                challenge.getId(),
                challenge.getTitle(),
                challenge.getDescription(),
                challenge.getAuthor().getLogin(),
                challenge.getDifficultyLevel(),
                challenge.getSolutionStatus(),
                challenge.getCommentsNumber(),
                challenge.getAverageRating());
    }
}
