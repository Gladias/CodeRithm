package com.gladias.coderithm.repository;

import com.gladias.coderithm.model.ChallengeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<ChallengeEntity, Long> {
    List<ChallengeEntity> findAllByTitleContainingIgnoreCase(String title);
}
