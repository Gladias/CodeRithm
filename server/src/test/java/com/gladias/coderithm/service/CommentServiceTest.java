package com.gladias.coderithm.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.List;

public class CommentServiceTest {
    CommentService commentService;

    @BeforeEach
    void setUp() {
        commentService = new CommentService(null, null, null);
    }

    @Test
    void testGetSwearWordsInComment() throws IOException {
        // given
        String firstCommentWithSwearWords = "Swear words varations: ns-?!-fw,  how? to* kkkill";
        String secondCommentWithoutSwearWords = "I really liked that challenge, good job :)";

        // when
        List<String> listOfFirstCommentSwearWords = commentService.getSwearWordsInComment(firstCommentWithSwearWords);
        List<String> listOfSecondCommentSwearWords = commentService.getSwearWordsInComment(secondCommentWithoutSwearWords);

        // then
        Assertions.assertEquals(2, listOfFirstCommentSwearWords.size());
        Assertions.assertEquals(0, listOfSecondCommentSwearWords.size());

        Assertions.assertEquals(List.of("how to kill", "nsfw"), listOfFirstCommentSwearWords);
    }

    @Test
    void testRemoveNonAlphanumericCharacters() {
        // given
        String firstCommentWithNonAlphanumericCharacters = "Com-ment?!, c`omżółent$";
        String secondCommentWithoutNonAlphanumericCharacters = "Comment Abcdef";

        // when
        String firstCommentCleared = commentService.removeNonAlphanumericCharacters(firstCommentWithNonAlphanumericCharacters);
        String secondCommentCleared = commentService.removeNonAlphanumericCharacters(secondCommentWithoutNonAlphanumericCharacters);

        // then
        Assertions.assertEquals("Comment coment", firstCommentCleared);
        Assertions.assertEquals(secondCommentWithoutNonAlphanumericCharacters, secondCommentCleared);
    }

    @Test
    void testRemoveAdjacentDuplicateCharacters() {
        // given
        String firstCommentWithAdjacentDuplicateCharacters = "Comment aabb tteest";
        String secondCommentWithoutAdjacentDuplicateCharacters = "abcd test";

        // when
        String firstCommentCleared = commentService.removeAdjacentDuplicateCharacters(firstCommentWithAdjacentDuplicateCharacters);
        String secondCommentCleared = commentService.removeNonAlphanumericCharacters(secondCommentWithoutAdjacentDuplicateCharacters);

        // then
        Assertions.assertEquals("Coment ab test", firstCommentCleared);
        Assertions.assertEquals(secondCommentWithoutAdjacentDuplicateCharacters, secondCommentCleared);
    }
}
