package com.gladias.coderithm.repository;

import com.gladias.coderithm.model.RateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RateRepository extends JpaRepository<RateEntity, Long> {
    Optional<RateEntity> findByUserIdAndChallengeId(Long userId, Long challengeId);
}
