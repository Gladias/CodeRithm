package com.gladias.coderithm.controller;

import com.gladias.coderithm.model.ChallengesSortingOption;
import com.gladias.coderithm.model.DifficultyLevel;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.FiltersDto;
import com.gladias.coderithm.payload.challenge.LanguageDto;
import com.gladias.coderithm.payload.challenge.RateRequest;
import com.gladias.coderithm.payload.challenge.TagDto;
import com.gladias.coderithm.payload.challenge.add.AddChallengeRequest;
import com.gladias.coderithm.payload.challenge.ChallengeDto;
import com.gladias.coderithm.payload.challenge.LanguagesAndTagsDto;
import com.gladias.coderithm.payload.challenge.add.AddChallengeResponse;
import com.gladias.coderithm.service.ChallengeService;
import com.gladias.coderithm.service.AuthService;
import com.gladias.coderithm.service.RateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;
    private final AuthService authService;
    private final RateService rateService;

    @GetMapping("/getAll")
    public List<ChallengeDto> getAllChallenges(
            @CookieValue(value = "token", required = false) String token,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Set<TagDto> tags,
            @RequestParam(required = false) Set<DifficultyLevel> difficultyLevels,
            @RequestParam(required = false) LanguageDto language,
            @RequestParam(required = false) boolean hideCompleted,
            @RequestParam(required = false) ChallengesSortingOption sortingOption) {
        return challengeService.getAllChallenges(token, title,
            tags, difficultyLevels, language, hideCompleted, sortingOption);
    }

    @GetMapping("/getOne")
    public ChallengeDto getChallengeById(@CookieValue(value = "token", required = false) String token, @RequestParam("id") Long id) {
        return challengeService.getChallengeById(token, id);
    }

    /*
    @PostMapping("/get")
    public Page<ChallengeDto> getFilteredChallenges(@RequestBody ChallengesRequest request) {
        return challengeService.getFilteredChallenges(request);
    }*/

    @PostMapping("/add")
    public AddChallengeResponse addChallenge(@RequestBody AddChallengeRequest request, @CookieValue("token") String token) {
        UserEntity author = authService.getUserFromToken(token);
        Long addedChallengeId = challengeService.addChallenge(request, author);

        return new AddChallengeResponse(addedChallengeId);
    }

    @PostMapping("/rate")
    public ChallengeDto rateChallenge(@CookieValue("token") String token,
                                      @RequestParam("id") Long challengeId,
                                      @RequestBody RateRequest rateRequest) {
        String username = AuthService.getUsernameFromToken(token);
        rateService.addRate(username, challengeId, rateRequest);

        return getChallengeById(token, challengeId);
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
