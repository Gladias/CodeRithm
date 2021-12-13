package com.gladias.coderithm.payload.challenge;

import java.util.List;
import java.util.Map;

public record LanguagesAndTagsDto(List<LanguageDto> languages, List<String> tags) {
}
