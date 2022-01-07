package com.gladias.coderithm.payload;


import com.gladias.coderithm.model.ChallengesSortingOption;
import com.gladias.coderithm.payload.challenge.LanguageAndVersionDto;

import java.util.Set;

public record FiltersDto(Set<LanguageAndVersionDto> availableLanguageEntities, Set<ChallengesSortingOption> sortingOptions) {}
