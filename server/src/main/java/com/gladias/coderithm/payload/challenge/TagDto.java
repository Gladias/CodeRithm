package com.gladias.coderithm.payload.challenge;

import com.gladias.coderithm.model.TagEntity;

public record TagDto(String name) {
    public static TagDto of(TagEntity tagEntity) {
        return new TagDto(tagEntity.getValue());
    }
}
