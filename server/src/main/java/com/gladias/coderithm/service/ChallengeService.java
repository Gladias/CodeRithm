package com.gladias.coderithm.service;

import com.gladias.coderithm.filter.BaseChallengeFilter;
import com.gladias.coderithm.filter.DifficultyChallengeFilter;
import com.gladias.coderithm.filter.LanguageChallengeFilter;
import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.SortingOption;
import com.gladias.coderithm.model.TagEntity;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.FiltersDto;
import com.gladias.coderithm.payload.challenge.LanguageDto;
import com.gladias.coderithm.payload.challenge.ChallengeDto;
import com.gladias.coderithm.payload.challenge.ChallengesRequest;
import com.gladias.coderithm.payload.challenge.LanguagesAndTagsDto;
import com.gladias.coderithm.payload.challenge.TagDto;
import com.gladias.coderithm.payload.challenge.add.AddChallengeRequest;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.LanguageRepository;
import com.gladias.coderithm.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final TagRepository tagRepository;
    private final LanguageRepository languageRepository;

    public Page<ChallengeDto> getAllChallenges(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);

        List<ChallengeDto> challenges = challengeRepository
                .findAll(pageable)
                .stream()
                .map(ChallengeDto::of)
                .collect(Collectors.toList());

        return new PageImpl<>(challenges);
    }

    public ChallengeDto getChallengeById(Long id) {
        ChallengeEntity challengeEntity = challengeRepository.findById(id).get();
        if (challengeEntity.getTags().isEmpty())


        System.out.println(challengeEntity.getTags());
        return ChallengeDto.of(challengeEntity);
    }

    public Long addChallenge(AddChallengeRequest request, UserEntity author) {
        System.out.println(request);

        Set<LanguageEntity> languages = request.languages().stream().map(languageRepository::findByName).collect(Collectors.toSet());
        ChallengeEntity requestEntity = ChallengeEntity.of(request, languages, author);
        ChallengeEntity savedEntity = challengeRepository.save(requestEntity);

        return savedEntity.getId();
    }

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
    }

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
