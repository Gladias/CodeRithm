package com.gladias.coderithm.payload.solution;

import com.gladias.coderithm.payload.challenge.LanguageAndVersionDto;

public record SolutionRequest(Long challengeId, String content, LanguageAndVersionDto languageOption) {}
