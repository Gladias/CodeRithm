package com.gladias.coderithm.controller;

import com.gladias.coderithm.engine.CodeExecutionEngineManager;
import com.gladias.coderithm.payload.solution.SolutionRequest;
import com.gladias.coderithm.service.SolutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/solution")
public class SolutionController {

    private final SolutionService solutionService;
    private final CodeExecutionEngineManager codeExecutionEngineManager;
    
    @PostMapping("/add/{challengeId}")
    public SolutionRequest postSolution(@PathVariable Long challengeId, @RequestBody SolutionRequest request) {
        return null;
    }
}
