package com.gladias.coderithm.payload.codeexecution;

import java.util.List;

public record CodeExecutionRequest(String language, String version, List<CodeExecutionFile> files, List<String> args) {}
