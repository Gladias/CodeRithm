package com.gladias.coderithm.service;

import com.gladias.coderithm.exception.SwearWordInCommentException;
import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.CommentEntity;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.comment.CommentDto;
import com.gladias.coderithm.payload.comment.CommentRequest;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.UserRepository;
import lombok.SneakyThrows;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final List<String> swearWords;

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;

    @SneakyThrows
    public CommentService(UserRepository userRepository, ChallengeRepository challengeRepository) {
        Resource swearWordsResource = new ClassPathResource("swearWords.txt");
        List<String> swearWords = Files.readAllLines(Paths.get(swearWordsResource.getURI()),
                StandardCharsets.UTF_8);

        this.swearWords = swearWords;
        this.userRepository = userRepository;
        this.challengeRepository = challengeRepository;
    }

    public List<CommentDto> getComments(Long challengeId) {
        Set<CommentEntity> commentEntities = challengeRepository.findById(challengeId).get().getComments();
        return commentEntities
                .stream()
                .map(CommentDto::of)
                .sorted(Comparator.comparing(CommentDto::creationTime))
                .collect(Collectors.toList());
    }

    public void addComment(String username, Long challengeId, CommentRequest commentRequest) throws IOException, SwearWordInCommentException {
        UserEntity userEntity = userRepository.findByLogin(username).get();
        ChallengeEntity challengeEntity = challengeRepository.findById(challengeId).get();

        List<String> detectedSwearWords = getSwearWordsInComment(commentRequest.content());
        if (detectedSwearWords.size() > 0) {
            throw new SwearWordInCommentException(detectedSwearWords);
        }

        CommentEntity commentEntity = CommentEntity.builder()
                .author(userEntity)
                .content(commentRequest.content())
                .build();

        challengeEntity.addNewComment(commentEntity);
        challengeRepository.save(challengeEntity);
    }

    protected List<String> getSwearWordsInComment(String commentContent) throws IOException {
        List<String> detectedSwearWords = new ArrayList<>();

        commentContent = removeNonAlphanumericCharacters(commentContent);
        commentContent = removeAdjacentDuplicateCharacters(commentContent);

        for (String swearWord : swearWords) {
            if (commentContent.toLowerCase(Locale.ROOT).contains(removeAdjacentDuplicateCharacters(swearWord))) {
                detectedSwearWords.add(swearWord);
            }
        }

        return detectedSwearWords;
    }

    protected String removeNonAlphanumericCharacters(String comment) {
        final String NON_ALPHANUMERIC_REGEX = "[^a-zA-Z0-9\\s]";
        return comment.replaceAll(NON_ALPHANUMERIC_REGEX, "");
    }

    protected String removeAdjacentDuplicateCharacters(String comment) {
        StringBuilder newComment = new StringBuilder();
        char previousLetter = '?';

        for (char letter : comment.toCharArray()) {
            if (newComment.length() != 0) {
                if (letter != previousLetter) {
                    newComment.append(letter);
                }
            } else {
                newComment.append(letter);
            }

            previousLetter = letter;
        }

        return newComment.toString();
    }
}
