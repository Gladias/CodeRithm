package com.gladias.coderithm.service;

import com.gladias.coderithm.filter.BaseChallengeFilter;
import com.gladias.coderithm.filter.DifficultyFilter;
import com.gladias.coderithm.filter.LanguageFilter;
import com.gladias.coderithm.filter.TagFilter;
import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.ChallengesSortingOption;
import com.gladias.coderithm.model.DifficultyLevel;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.SolutionEntity;
import com.gladias.coderithm.model.SolutionStatus;
import com.gladias.coderithm.model.TagEntity;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.challenge.ChallengeDto;
import com.gladias.coderithm.payload.challenge.LanguageAndVersionDto;
import com.gladias.coderithm.payload.challenge.LanguageDto;
import com.gladias.coderithm.payload.challenge.LanguagesAndTagsAndSortingOptionsDto;
import com.gladias.coderithm.payload.challenge.TagDto;
import com.gladias.coderithm.payload.challenge.add.AddChallengeRequest;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.LanguageRepository;
import com.gladias.coderithm.repository.SolutionRepository;
import com.gladias.coderithm.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@SuppressWarnings("ALL")
@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final TagRepository tagRepository;
    private final LanguageRepository languageRepository;
    private final SolutionRepository solutionRepository;
    private final AuthService authService;

    public List<ChallengeDto> getAllChallenges(String token, String title, Set<TagDto> tags,
                                               Set<DifficultyLevel> difficultyLevels, LanguageDto languageDto,
                                               boolean hideCompleted, ChallengesSortingOption sortingOption) {

        System.out.println("Title: " + title);
        System.out.println("Tags: " + tags);
        System.out.println("difficultyLevels: " + difficultyLevels);
        System.out.println("languageDto: " + languageDto);

        // If token is passed and correct user is authenticated, so we can fetch
        // his solution status for each challenge
        // For not logged users return Status NEW
        System.out.println("Token " + token);

        UserEntity user = authService.getUserFromToken(token);

        List<ChallengeEntity> allChallenges;

        if (title != null) {
            allChallenges = challengeRepository.findAllByTitleContainingIgnoreCase(title);
        } else {
            allChallenges = challengeRepository.findAll();
        }

        // Tworzenie łańcucha filtrów
        BaseChallengeFilter filterChain = new LanguageFilter(languageDto);
        filterChain
                .addToChain(new DifficultyFilter(difficultyLevels))
                .addToChain(new TagFilter(tags));

        // Przekazanie listy zadań do filtrowania
        allChallenges = filterChain.filter(allChallenges);

        // Sort
        if (sortingOption != null) {
            if (sortingOption == ChallengesSortingOption.HIGHEST_RATING) {
                allChallenges.sort(Comparator.comparing(ChallengeEntity::getAverageRating));
            } else if (sortingOption == ChallengesSortingOption.MOST_COMMENTED) {
                allChallenges.sort(Comparator.comparing(ChallengeEntity::getCommentsNumber));
            } else if (sortingOption == ChallengesSortingOption.MOST_SOLUTIONS) {
                allChallenges.sort(Comparator.comparing(challenge -> challenge.getSolutions().size()));
            }
        }

        // Make dtos and check challenge status
        List<ChallengeDto> challengeDtos;
        challengeDtos = allChallenges
                .stream()
                .map(challenge ->
                        ChallengeDto.of(challenge, findSolutionStatusForChallenge(challenge, user)))
                .collect(Collectors.toList());

        // Hide Completed
        if (hideCompleted) {
            challengeDtos =
                challengeDtos
                        .stream()
                        .filter(challengeDto -> challengeDto.solutionStatus() != SolutionStatus.Completed)
                        .collect(Collectors.toList());
        }

        return challengeDtos;
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
        Set<TagEntity> tags = request.tags().stream().map(tagRepository::findByValue).collect(Collectors.toSet());
        ChallengeEntity requestEntity = ChallengeEntity.of(request, languages, tags, author);
        ChallengeEntity savedEntity = challengeRepository.save(requestEntity);

        return savedEntity.getId();
    }

    public LanguagesAndTagsAndSortingOptionsDto getAvailableLanguagesAndTags() {
        List<String> tagDtos = tagRepository.findAll().stream().map(TagEntity::getValue).distinct().collect(Collectors.toList());

        List<LanguageAndVersionDto> languageAndVersionDtos = languageRepository.findAll().stream()
                .map(LanguageAndVersionDto::of).distinct().collect(Collectors.toList());

        Set<ChallengesSortingOption> availableSortingOptions = Set.of(ChallengesSortingOption.values());

        return new LanguagesAndTagsAndSortingOptionsDto(languageAndVersionDtos, tagDtos, availableSortingOptions);
    }
}
