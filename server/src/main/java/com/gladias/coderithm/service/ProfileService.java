package com.gladias.coderithm.service;

import com.gladias.coderithm.model.DifficultyLevel;
import com.gladias.coderithm.model.SolutionEntity;
import com.gladias.coderithm.model.SolutionStatus;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.challenge.ChallengeDto;
import com.gladias.coderithm.payload.profile.ProfileResponse;
import com.gladias.coderithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;
    private final AuthService authService;

    public Page<ProfileResponse> getAllProfiles(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        int positionCounter = 0;

        List<ProfileResponse> profiles = userRepository
                .findAll(pageable)
                .stream()
                .map(userEntity -> getProfileById(userEntity.getId()))
                .collect(Collectors.toList());

        for (ProfileResponse profile : profiles)
            profile.setPosition(++positionCounter);

        return new PageImpl<>(profiles);
    }

    public ProfileResponse getProfileByToken(String token) {
        return getProfileById(authService.getUserFromToken(token).getId());
    }

    public ProfileResponse getProfileById(Long id) {
        UserEntity userEntity = userRepository.findById(id).get();

        String username = authService.getUserData(id).login();

        Map<String, Integer> generalStats = getGeneralStats(userEntity);
        System.out.println("GENERAL STATS");
        System.out.println(generalStats);

        Map<DifficultyLevel, Integer> completedChallengesByDifficulty = getCompletedChallengesByDifficulty(userEntity.getCreatedSolutions());
        System.out.println("DIFFICULTY STATS");
        System.out.println(completedChallengesByDifficulty);

        Map<String, Integer> completedChallengesByLanguage = getCompletedChallengesByLanguage(userEntity.getCreatedSolutions());
        System.out.println("LANGUAGE STATS");
        System.out.println(completedChallengesByLanguage);

        return new ProfileResponse(
                id,
                username,
                null,
                completedChallengesByDifficulty,
                generalStats,
                completedChallengesByLanguage);
    }

    private Map<String, Integer> getGeneralStats(UserEntity user) {
        Map<String, Integer> statsMap = new LinkedHashMap<>();

        statsMap.put("added", user.getCreatedChallenges().size());
        statsMap.put("rated", user.getRates().size());
        statsMap.put("commented", user.getCreatedComments().size());

        return statsMap;
    }

    private Map<DifficultyLevel, Integer> getCompletedChallengesByDifficulty(Set<SolutionEntity> solutions) {
        Map<DifficultyLevel, Integer> statsMap = new LinkedHashMap<>();

        statsMap.put(DifficultyLevel.EASY, 0);
        statsMap.put(DifficultyLevel.MEDIUM, 0);
        statsMap.put(DifficultyLevel.HARD, 0);
        statsMap.put(DifficultyLevel.CHALLENGING, 0);

        for (SolutionEntity solution : solutions) {
            if (solution.getStatus().equals(SolutionStatus.Completed)) {
                statsMap.merge(solution.getChallenge().getDifficultyLevel(), 1, Integer::sum);
            }
        }

        return statsMap;
    }

    private Map<String, Integer> getCompletedChallengesByLanguage(Set<SolutionEntity> solutions) {
        Map<String, Integer> statsMap = new LinkedHashMap<>();

        statsMap.put("python", 0);
        statsMap.put("java", 0);
        statsMap.put("c#", 0);
        statsMap.put("javascript", 0);

        for (SolutionEntity solution : solutions) {
            if (solution.getStatus().equals(SolutionStatus.Completed)) {
                statsMap.merge(solution.getLanguage().getName(), 1, Integer::sum);
            }
        }

        return statsMap;
    }
}
