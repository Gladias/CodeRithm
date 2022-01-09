package com.gladias.coderithm.filter;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.payload.challenge.LanguageDto;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class LanguageFilter extends BaseChallengeFilter {
    private final LanguageDto selectedLanguage;

    @Override
    public List<ChallengeEntity> filter(List<ChallengeEntity> challenges) {
        if (selectedLanguage == null) {
            return passToNextFilter(challenges);
        }

        List<ChallengeEntity> filteredChallenges =  challenges
                .stream()
                .filter(challenge -> challenge
                        .getAvailableLanguagesNames()
                        .contains(selectedLanguage.name()))
                .collect(Collectors.toList());

        return passToNextFilter(filteredChallenges);
    }
}
