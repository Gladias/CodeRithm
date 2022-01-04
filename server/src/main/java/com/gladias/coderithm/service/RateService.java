package com.gladias.coderithm.service;

import com.gladias.coderithm.model.ChallengeEntity;
import com.gladias.coderithm.model.RateEntity;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.challenge.RateRequest;
import com.gladias.coderithm.repository.ChallengeRepository;
import com.gladias.coderithm.repository.RateRepository;
import com.gladias.coderithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RateService {

    private final UserRepository userRepository;
    private final RateRepository rateRepository;
    private final ChallengeRepository challengeRepository;

    public void addRate(String username, Long challengeId, RateRequest rateRequest) {
        UserEntity userEntity = userRepository.findByLogin(username).get();
        ChallengeEntity challengeEntity = challengeRepository.findById(challengeId).get();

        // Check if this user rated previously this challenge
        // if yes then change that previous rate, don't add second one
        Optional<RateEntity> previousRate = rateRepository.
                findByUserIdAndChallengeId(userEntity.getId(), challengeEntity.getId());

        if (previousRate.isPresent()) {
            previousRate.get().setRate(rateRequest.rate());
            rateRepository.save(previousRate.get());
        } else {
            RateEntity rateEntity = RateEntity.builder()
                    .rate(rateRequest.rate())
                    .challenge(challengeEntity)
                    .user(userEntity)
                    .build();

            rateRepository.save(rateEntity);
        }
    }
}
