package com.gladias.coderithm.payload;


import com.gladias.coderithm.model.SortingOption;

import java.util.Set;

public record FiltersDto(Set<LanguageOption> availableLanguageEntities, Set<SortingOption> sortingOptions) {}
