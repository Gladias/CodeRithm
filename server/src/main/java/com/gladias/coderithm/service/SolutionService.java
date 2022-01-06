package com.gladias.coderithm.service;

import com.gladias.coderithm.engine.CodeExecutionEngineManager;
import com.gladias.coderithm.exception.LanguageNotAvailableException;
import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.SolutionEntity;
import com.gladias.coderithm.model.SolutionStatus;
import com.gladias.coderithm.model.TestCaseEntity;
import com.gladias.coderithm.model.UserEntity;
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
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SolutionService {

    private final ChallengeRepository challengeRepository;
    private final LanguageRepository languageRepository;
    private final SolutionRepository solutionRepository;
    private final CodeExecutionEngineManager codeExecutionEngineManager;

    public SolutionResponse postSolution(SolutionRequest request, UserEntity author) throws LanguageNotAvailableException, IOException, InterruptedException, JSONException {
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

        Instant start = Instant.now();

        for (Map.Entry<String, String> testCase : testCases.entrySet()) {
            System.out.println(testCase.getKey());
            CodeExecutionRequest codeExecutionRequest = new CodeExecutionRequest(
                    request.languageOption().name(),
                    languageVersion,
                    List.of(codeToExecute),
                    List.of(testCase.getKey()));

            String output = codeExecutionEngineManager.executeCode(codeExecutionRequest);
            if (output.equals(testCase.getValue())) {
                System.out.println("TEST POPRAWNY");
            }

            testResults.add(new TestResult(testCase.getKey(), testCase.getValue(), output));
        }

        Instant finish = Instant.now();
        double executionTime = Duration.between(start, finish).toMillis() / (1000.0 * testCases.size());
        long codeLines = codeToExecute.content().chars().filter(ch -> ch == '\n').count() + 1;

        SolutionStatus status;

        // If tests passed and limits like time not exceeded mark as done
        if (codeLines <= challengeEntity.getLinesLimit()
        && executionTime <= challengeEntity.getExecutionTimeLimitInSeconds()
        && testResults.stream().allMatch(tr -> Objects.equals(tr.output(), tr.userOutput()))) {
            status = SolutionStatus.Completed;
        } else {
            status = SolutionStatus.InProgress;
        }

        Optional<SolutionEntity> previousSolution = solutionRepository.findByAuthorIdAndChallengeId(author.getId(), challengeEntity.getId());

        SolutionEntity solution;

        if (previousSolution.isPresent()) {
            solution = previousSolution.get();
            solution.setLanguage(languageEntity);
            solution.setContent(codeToExecute.content());
            solution.setStatus(status);

        } else {
            solution = SolutionEntity.builder()
                    .content(codeToExecute.content())
                    .status(status)
                    .language(languageEntity)
                    .challenge(challengeEntity)
                    .author(author)
                    .build();
        }

        solutionRepository.save(solution);

        return new SolutionResponse(testResults, codeLines, executionTime);
    }

    private void executeCodeAndTest() {
    }

    private boolean isLanguageAvailableToUse(ChallengeEntity challenge, LanguageEntity language) {
        // TODO: add language version to check and request
        return challenge.getAvailableLanguages().stream().map(LanguageEntity::getName).anyMatch(name -> name.equals(language.getName()));
    }
}
