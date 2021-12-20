package com.gladias.coderithm.repository;

import com.gladias.coderithm.model.NotesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotesRepository extends JpaRepository<NotesEntity, Long> {
}
