package com.gladias.coderithm.filter;

import com.gladias.coderithm.model.ChallengeEntity;

import java.util.List;

public abstract class BaseChallengeFilter {
    private BaseChallengeFilter next;

    public BaseChallengeFilter addToChain(BaseChallengeFilter next) {
        this.next = next;
        return next;
    }

    public abstract List<ChallengeEntity> filter(List<ChallengeEntity> challenges);

    protected List<ChallengeEntity> passToNextFilter(List<ChallengeEntity> challenges) {
        if (next != null) {
            return next.filter(challenges);
        } else {
            return challenges;
        }
    }
}
