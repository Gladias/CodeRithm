package com.gladias.coderithm.payload.challenge;

import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.TagEntity;

public record LanguageDto(String name, String version) {
    public static LanguageDto of(LanguageEntity languageEntity) {
        return new LanguageDto(languageEntity.getName(), languageEntity.getVersion());
    }
}
