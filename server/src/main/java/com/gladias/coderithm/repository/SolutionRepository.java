package com.gladias.coderithm.repository;

import com.gladias.coderithm.model.SolutionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SolutionRepository extends JpaRepository<SolutionEntity, Long> {
    Optional<SolutionEntity> findByAuthorIdAndChallengeId(Long authorId, Long challengeId);
}
