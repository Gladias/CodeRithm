package com.gladias.coderithm.controller;

import com.gladias.coderithm.exception.LanguageNotAvailableException;
import com.gladias.coderithm.payload.solution.SolutionRequest;
import com.gladias.coderithm.payload.solution.SolutionResponse;
import com.gladias.coderithm.service.SolutionService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
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
    
    @PostMapping("/add")
    public SolutionResponse postSolution(@RequestBody SolutionRequest request) throws LanguageNotAvailableException, JSONException, IOException, InterruptedException {
            return solutionService.postSolution(request);
    }
}
