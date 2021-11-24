package com.gladias.coderithm.repository;

import com.gladias.coderithm.model.LanguageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<LanguageEntity, Long> {
    LanguageEntity findByName(String name);
}
