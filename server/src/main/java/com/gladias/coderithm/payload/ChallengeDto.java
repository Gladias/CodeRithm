package com.gladias.coderithm.payload;

import com.gladias.coderithm.model.ChallengeEntity;

public record ChallengeDto(String title, String description) {
    public static ChallengeDto of(ChallengeEntity challengeEntity) {
        return new ChallengeDto(challengeEntity.getTitle(), challengeEntity.getDescription());
    }
}
