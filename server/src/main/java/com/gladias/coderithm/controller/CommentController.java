package com.gladias.coderithm.controller;

import com.gladias.coderithm.payload.challenge.ChallengeDto;
import com.gladias.coderithm.payload.comment.CommentDto;
import com.gladias.coderithm.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/get")
    public List<CommentDto> getChallengeComments(@RequestParam("challengeId") Long id) {
        return commentService.getChallengeComments(id);
    }
}
