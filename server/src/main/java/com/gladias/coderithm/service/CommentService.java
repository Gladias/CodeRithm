package com.gladias.coderithm.service;

import com.gladias.coderithm.model.CommentEntity;
import com.gladias.coderithm.payload.comment.CommentDto;
import com.gladias.coderithm.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public List<CommentDto> getChallengeComments(Long challengeId) {
        List<CommentEntity> commentEntities = commentRepository.findCommentsEntityByChallengeId(challengeId);
        return commentEntities
                .stream()
                .map(CommentDto::of)
                .collect(Collectors.toList());
    }
}
