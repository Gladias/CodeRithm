package com.gladias.coderithm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gladias.coderithm.model.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByLogin(String login);
    boolean existsByLogin(String login);
    boolean existsByEmail(String email);
}
