package com.gladias.coderithm.payload.comment;

import com.gladias.coderithm.model.CommentEntity;

import java.time.LocalDateTime;

public record CommentDto(Long id, String content, LocalDateTime creationTime, String author) {
    public static CommentDto of(CommentEntity comment) {
        return new CommentDto(
                comment.getId(),
                comment.getContent(),
                comment.getCreationTime(),
                comment.getAuthor().getLogin());
    }
}
