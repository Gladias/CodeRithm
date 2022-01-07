package com.gladias.coderithm.payload.challenge;

import com.gladias.coderithm.model.LanguageEntity;

public record LanguageAndVersionDto(String name, String version) {
    public static LanguageAndVersionDto of(LanguageEntity languageEntity) {
        return new LanguageAndVersionDto(languageEntity.getName(), languageEntity.getVersion());
    }
}
