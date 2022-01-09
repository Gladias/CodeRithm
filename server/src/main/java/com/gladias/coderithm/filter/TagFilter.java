package com.gladias.coderithm.filter;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.payload.challenge.TagDto;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class TagFilter extends BaseChallengeFilter {
    private final Set<TagDto> selectedTags;

    @Override
    public List<ChallengeEntity> filter(List<ChallengeEntity> challenges) {
        if (selectedTags == null) {
            return passToNextFilter(challenges);
        }

        Set<String> tags = selectedTags.stream().map(TagDto::name).collect(Collectors.toSet());

        List<ChallengeEntity> filteredChallenges =  challenges
                .stream()
                .filter(challenge -> challenge
                        .getTagsValues()
                        .containsAll(tags))
                .collect(Collectors.toList());

        return passToNextFilter(filteredChallenges);
    }
}
