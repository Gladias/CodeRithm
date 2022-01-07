package com.gladias.coderithm.payload.challenge;

import com.gladias.coderithm.model.ChallengesSortingOption;

import java.util.List;
import java.util.Set;

public record LanguagesAndTagsAndSortingOptionsDto(List<LanguageAndVersionDto> languages,
                                                   List<String> tags,
                                                   Set<ChallengesSortingOption> sortingOptions) {
}
