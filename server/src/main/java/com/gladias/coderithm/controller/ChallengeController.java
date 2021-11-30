package com.gladias.coderithm.controller;

import com.gladias.coderithm.payload.FiltersDto;
import com.gladias.coderithm.payload.challenge.ChallengeDto;
import com.gladias.coderithm.payload.challenge.ChallengesRequest;
import com.gladias.coderithm.payload.challenge.LanguagesAndTagsDto;
import com.gladias.coderithm.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping("/getAll")
    public Page<ChallengeDto> getAllChallenges(@RequestParam(defaultValue = "0") Integer page,
                                               @RequestParam(defaultValue = "20") Integer size) {
        return challengeService.getAllChallenges(page, size);
    }

    @GetMapping("/getOne")
    public ChallengeDto getChallengeById(@RequestParam("id") Long id) {
        return challengeService.getChallengeById(id);
    }

    @PostMapping("/get")
    public Page<ChallengeDto> getFilteredChallenges(@RequestBody ChallengesRequest request) {
        return challengeService.getFilteredChallenges(request);
    }

    @PostMapping("/add")
    public Page<ChallengeDto> addChallenge(@RequestBody ChallengesRequest request) {
        return challengeService.getFilteredChallenges(request);
    }

    @GetMapping("/tagsAndLanguages")
    public LanguagesAndTagsDto getTagsAndLanguages() {
        return challengeService.getAvailableLanguagesAndTags();
    }

    @GetMapping("/filters")
    public FiltersDto getAvailableFilterOptions() {
        return challengeService.getAvailableFilterOptions();
    }
}
