package com.gladias.coderithm.service;

import com.gladias.coderithm.payload.ChallengeDto;
import com.gladias.coderithm.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;

    public Page<ChallengeDto> getAllChallenges(Integer page, Integer size) {
        Pageable requestPage = PageRequest.of(page, size);

        List<ChallengeDto> challenges = challengeRepository
                .findAll(requestPage)
                .stream()
                .map(ChallengeDto::of)
                .collect(Collectors.toList());

        return new PageImpl<>(challenges);
    }
}
