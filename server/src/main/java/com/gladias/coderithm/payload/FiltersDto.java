package com.gladias.coderithm.payload;


import com.gladias.coderithm.model.SortingOption;
import com.gladias.coderithm.payload.challenge.LanguageDto;

import java.util.Set;

public record FiltersDto(Set<LanguageDto> availableLanguageEntities, Set<SortingOption> sortingOptions) {}
