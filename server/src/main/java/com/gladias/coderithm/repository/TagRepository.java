package com.gladias.coderithm.repository;

import com.gladias.coderithm.model.LanguageEntity;
import com.gladias.coderithm.model.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {
    TagEntity findTagEntityById(Long id);
    TagEntity findByValue(String value);
}
