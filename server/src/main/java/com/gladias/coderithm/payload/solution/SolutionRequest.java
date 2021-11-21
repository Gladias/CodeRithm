package com.gladias.coderithm.payload.solution;

import com.gladias.coderithm.payload.LanguageOption;

public record SolutionRequest(Long challengeId, String content, LanguageOption languageOption) {}
