package com.gladias.coderithm.controller;

import com.gladias.coderithm.exception.LanguageNotAvailableException;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.solution.SolutionRequest;
import com.gladias.coderithm.payload.solution.SolutionResponse;
import com.gladias.coderithm.service.SolutionService;
import com.gladias.coderithm.service.UserService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/solution")
public class SolutionController {

    private final SolutionService solutionService;
    private final UserService userService;
    
    @PostMapping("/add")
    public SolutionResponse postSolution(@RequestBody SolutionRequest request, @CookieValue("token") String token) throws LanguageNotAvailableException, JSONException, IOException, InterruptedException {
        UserEntity author = userService.getUserFromToken(token);
        return solutionService.postSolution(request, author);
    }
}
