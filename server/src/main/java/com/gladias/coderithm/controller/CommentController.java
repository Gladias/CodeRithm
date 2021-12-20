package com.gladias.coderithm.controller;

import com.gladias.coderithm.payload.comment.CommentDto;
import com.gladias.coderithm.payload.comment.CommentRequest;
import com.gladias.coderithm.service.CommentService;
import com.gladias.coderithm.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public List<CommentDto> getComments(@RequestParam("challengeId") Long challengeId) {
        return commentService.getComments(challengeId);
    }

    @PostMapping
    public List<CommentDto> addComment(@CookieValue("token") String token,
                                       @RequestParam("challengeId") Long challengeId,
                                       @RequestBody CommentRequest request) {
        String username = AuthService.getUsernameFromToken(token);

        try {
            commentService.addComment(username, challengeId, request);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Swear words not allowed", e);
        }
        System.out.println("COMMENT ADDED, trying to get comments...");
        return commentService.getComments(challengeId);
    }
}
