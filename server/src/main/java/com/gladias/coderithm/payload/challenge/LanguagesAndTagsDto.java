package com.gladias.coderithm.payload.challenge;

import java.util.List;

public record LanguagesAndTagsDto(List<LanguageAndVersionDto> languages, List<String> tags) {
}
