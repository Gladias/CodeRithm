package com.gladias.coderithm.service;

import com.gladias.coderithm.exception.SwearWordInCommentException;
import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.CommentEntity;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.comment.CommentDto;
import com.gladias.coderithm.payload.comment.CommentRequest;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.CommentRepository;
import com.gladias.coderithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    @Value("classpath:swearWords.txt")
    private Resource resource;

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;

    public List<CommentDto> getComments(Long challengeId) {
        Set<CommentEntity> commentEntities = challengeRepository.findById(challengeId).get().getComments();
        return commentEntities
                .stream()
                .map(CommentDto::of)
                .sorted(Comparator.comparing(CommentDto::creationTime))
                .collect(Collectors.toList());
    }

    public void addComment(String username, Long challengeId, CommentRequest request) throws IOException, SwearWordInCommentException {
        UserEntity userEntity = userRepository.findByLogin(username).get();
        ChallengeEntity challengeEntity = challengeRepository.findById(challengeId).get();

        if (commentContainsSwearWords(request.content())) {
            throw new SwearWordInCommentException("Swear word found in comment!");
        }

        CommentEntity commentEntity = CommentEntity.builder()
                .author(userEntity)
                .content(request.content())
                .build();

        challengeEntity.addNewComment(commentEntity);
        challengeRepository.save(challengeEntity);
    }

    //TODO: make commandLineRunner
    private boolean commentContainsSwearWords(String commentContent) throws IOException {
        List<String> swearWords = Files.readAllLines(Paths.get(resource.getURI()),
                StandardCharsets.UTF_8);

        for (String swearWord : swearWords) {
            if (commentContent.toLowerCase(Locale.ROOT).contains(swearWord)) {
                return true;
            }
        }

        return false;
    }
}
