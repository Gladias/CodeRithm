package com.gladias.coderithm.service;

import com.gladias.coderithm.filter.BaseChallengeFilter;
import com.gladias.coderithm.filter.DifficultyChallengeFilter;
import com.gladias.coderithm.filter.LanguageChallengeFilter;
import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.SolutionEntity;
import com.gladias.coderithm.model.SolutionStatus;
import com.gladias.coderithm.model.SortingOption;
import com.gladias.coderithm.model.TagEntity;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.FiltersDto;
import com.gladias.coderithm.payload.challenge.ChallengeDto;
import com.gladias.coderithm.payload.challenge.ChallengesRequest;
import com.gladias.coderithm.payload.challenge.LanguageDto;
import com.gladias.coderithm.payload.challenge.LanguagesAndTagsDto;
import com.gladias.coderithm.payload.challenge.add.AddChallengeRequest;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.LanguageRepository;
import com.gladias.coderithm.repository.SolutionRepository;
import com.gladias.coderithm.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final TagRepository tagRepository;
    private final LanguageRepository languageRepository;
    private final SolutionRepository solutionRepository;
    private final AuthService authService;

    public Page<ChallengeDto> getAllChallenges(String token, Integer page, Integer size) {
        // If token is passed and correct user is authenticated, so we can fetch
        // his solution status for each challenge
        // For not logged users return Status NEW
        System.out.println("Token " + token);

        UserEntity user = authService.getUserFromToken(token);

        Pageable pageable = PageRequest.of(page, size);
        Page<ChallengeEntity> allChallenges = challengeRepository.findAll(pageable);
        List<ChallengeDto> challengeDtos;

        challengeDtos = allChallenges
                .stream()
                .map(challenge ->
                        ChallengeDto.of(challenge, findSolutionStatusForChallenge(challenge, user)))
                .collect(Collectors.toList());

        return new PageImpl<>(challengeDtos);
    }

    private SolutionStatus findSolutionStatusForChallenge(ChallengeEntity challenge, UserEntity user) {
        if (challenge == null || user == null) {
            System.out.println("USER OR CHALLENGE NULL");
            return SolutionStatus.New;
        }

        Optional<SolutionEntity> solution = solutionRepository.findByAuthorIdAndChallengeId(user.getId(), challenge.getId());

        if (solution.isEmpty()) {
            System.out.println("SOLUTION NOT FOUND");
            return SolutionStatus.New;
        }

        System.out.println("I ve found solution: " + solution.get().getStatus());
        return solution.get().getStatus();
    }

    public ChallengeDto getChallengeById(String token, Long id) {
        ChallengeEntity challengeEntity = challengeRepository.findById(id).get();
        UserEntity user = authService.getUserFromToken(token);
        SolutionStatus solutionStatusForChallenge = findSolutionStatusForChallenge(challengeEntity, user);

        return ChallengeDto.of(challengeEntity, solutionStatusForChallenge);
    }

    public Long addChallenge(AddChallengeRequest request, UserEntity author) {
        System.out.println(request);

        Set<LanguageEntity> languages = request.languages().stream().map(languageRepository::findByName).collect(Collectors.toSet());
        ChallengeEntity requestEntity = ChallengeEntity.of(request, languages, author);
        ChallengeEntity savedEntity = challengeRepository.save(requestEntity);

        return savedEntity.getId();
    }

    /*
    public Page<ChallengeDto> getFilteredChallenges(ChallengesRequest request) {
        List<ChallengeEntity> allChallenges = challengeRepository.findAll();

        System.out.println(allChallenges);
        BaseChallengeFilter filterChain = new LanguageChallengeFilter(request.selectedLanguageEntity());
        filterChain.addToChain(new DifficultyChallengeFilter(request.difficultyLevels()));

        List<ChallengeDto> filteredChallenges = filterChain
                .filter(allChallenges)
                .stream()
                .map(ChallengeDto::of)
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(request.page(), request.size());

        System.out.println(filteredChallenges);
        return new PageImpl<>(filteredChallenges, pageable, filteredChallenges.size());
    }*/

    public LanguagesAndTagsDto getAvailableLanguagesAndTags() {
        List<String> tagDtos = tagRepository.findAll().stream().map(TagEntity::getValue).collect(Collectors.toList());
        List<LanguageDto> languageDtos = languageRepository.findAll().stream()
                .map(LanguageDto::of).collect(Collectors.toList());

        return new LanguagesAndTagsDto(languageDtos, tagDtos);
    }

    public FiltersDto getAvailableFilterOptions() {
        List<SortingOption> availableSortingOptions = List.of(SortingOption.values());

        return new FiltersDto(new LinkedHashSet<>(Collections.singleton(new LanguageDto("Python", "3.10.0"))),
                new LinkedHashSet<>(availableSortingOptions));
    }
}
