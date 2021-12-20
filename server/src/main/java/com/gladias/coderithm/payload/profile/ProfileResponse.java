package com.gladias.coderithm.payload.profile;

import com.gladias.coderithm.model.DifficultyLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
@AllArgsConstructor
public class ProfileResponse {
    private Long id;
    private String username;
    private Integer position;
    private Map<DifficultyLevel, Integer> challengesByDifficulty;
    private Map<String, Integer> generalStats;
    private Map<String, Integer> challengesByLanguage;
}
