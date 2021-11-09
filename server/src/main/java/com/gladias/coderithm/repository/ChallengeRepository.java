package com.gladias.coderithm.repository;

import com.gladias.coderithm.model.ChallengeEntity;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeRepository extends PagingAndSortingRepository<ChallengeEntity, Long> {
}
