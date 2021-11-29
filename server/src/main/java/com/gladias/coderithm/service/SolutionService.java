package com.gladias.coderithm.service;

import com.gladias.coderithm.engine.CodeExecutionEngineManager;
import com.gladias.coderithm.exception.LanguageNotAvailableException;
import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.TestCaseEntity;
import com.gladias.coderithm.payload.codeexecution.CodeExecutionFile;
import com.gladias.coderithm.payload.codeexecution.CodeExecutionRequest;
import com.gladias.coderithm.payload.solution.SolutionRequest;
import com.gladias.coderithm.payload.solution.SolutionResponse;
import com.gladias.coderithm.payload.solution.TestResult;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.LanguageRepository;
import com.gladias.coderithm.repository.SolutionRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SolutionService {

    private final ChallengeRepository challengeRepository;
    private final LanguageRepository languageRepository;
    private final SolutionRepository solutionRepository;
    private final CodeExecutionEngineManager codeExecutionEngineManager;

    public SolutionResponse postSolution( SolutionRequest request) throws LanguageNotAvailableException, IOException, InterruptedException, JSONException {
        System.out.println(request);
        ChallengeEntity challengeEntity = challengeRepository.findById(request.challengeId()).get();
        LanguageEntity languageEntity = languageRepository.findByName(request.languageOption().name());

        boolean isLanguageValid = isLanguageAvailableToUse(challengeEntity, languageEntity);

        if (!isLanguageValid) {
            throw new LanguageNotAvailableException("Language: " + languageEntity.getName() + " is not avaiable to use in this challenge");
        }

        String languageVersion = languageRepository.findByName(request.languageOption().name()).getVersion();
        CodeExecutionFile codeToExecute = new CodeExecutionFile(request.content());

        Map<String, String> testCases =
                challengeEntity.getTestCases().stream().collect(Collectors.toMap(TestCaseEntity::getInput, TestCaseEntity::getOutput));

        List<TestResult> testResults = new ArrayList<>();

        for (Map.Entry<String, String> testCase : testCases.entrySet()) {
            CodeExecutionRequest codeExecutionRequest = new CodeExecutionRequest(
                    request.languageOption().name(),
                    languageVersion,
                    List.of(codeToExecute),
                    testCase.getKey());

            String output = codeExecutionEngineManager.executeCode(codeExecutionRequest);
            if (output.equals(testCase.getValue())) {
                System.out.println("TEST POPRAWNY");
            }

            testResults.add(new TestResult(testCase.getKey(), testCase.getValue(), output));
        }

        return new SolutionResponse(testResults);
    }

    private void executeCodeAndTest() {
    }

    private boolean isLanguageAvailableToUse(ChallengeEntity challenge, LanguageEntity language) {
        // TODO: add language version to check and request
        return challenge.getAvailableLanguages().stream().map(LanguageEntity::getName).anyMatch(name -> name.equals(language.getName()));
    }
}
