package com.gladias.coderithm.filter;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.LanguageEntity;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class LanguageChallengeFilter extends BaseChallengeFilter {
    private final LanguageEntity selectedLanguageEntity;

    @Override
    public List<ChallengeEntity> filter(List<ChallengeEntity> challenges) {
        /*List<ChallengeEntity> filteredChallenges = challenges
                .stream()
                .filter(challenge -> challenge
                        .getAvailableLanguageEntities()
                        .contains(selectedLanguageEntity))
                .collect(Collectors.toList());*/

        return null;
    }
}
