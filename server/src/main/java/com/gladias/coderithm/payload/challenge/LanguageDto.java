package com.gladias.coderithm.payload.challenge;

import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.TagEntity;

public record LanguageDto(String name) {
    public static LanguageDto of(LanguageEntity languageEntity) {
        return new LanguageDto(languageEntity.getName());
    }
}
