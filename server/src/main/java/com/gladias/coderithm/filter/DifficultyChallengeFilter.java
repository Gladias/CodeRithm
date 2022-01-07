package com.gladias.coderithm.filter;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.DifficultyLevel;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class DifficultyChallengeFilter extends BaseChallengeFilter {
    private final Set<DifficultyLevel> selectedDifficulties;

    @Override
    public List<ChallengeEntity> filter(List<ChallengeEntity> challenges) {
        if (selectedDifficulties == null) {
            return passToNextFilter(challenges);
        }

        List<ChallengeEntity> filteredChallenges = challenges
                .stream()
                .filter(challenge -> selectedDifficulties
                        .contains(challenge.getDifficultyLevel()))
                .collect(Collectors.toList());

        return passToNextFilter(filteredChallenges);
    }
}
