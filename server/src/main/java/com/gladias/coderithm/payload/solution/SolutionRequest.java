package com.gladias.coderithm.payload.solution;

import com.gladias.coderithm.payload.challenge.LanguageDto;

public record SolutionRequest(Long challengeId, String content, LanguageDto languageOption) {}
