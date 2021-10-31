package com.gladias.coderithm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gladias.coderithm.model.UserEntity;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByLogin(String login);
    boolean existsByLogin(String login);
    boolean existsByEmail(String email);
}
