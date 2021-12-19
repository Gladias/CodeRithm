package com.gladias.coderithm.engine;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gladias.coderithm.payload.codeexecution.CodeExecutionRequest;
import org.json.JSONException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;

import org.json.JSONObject;

@Service
public class CodeExecutionEngineManager {
    // TODO: Local docker should be used http://piston:2000/api/v2/runtimes
    // TODO: async
    public final static String URL_GET_RUNTIMES = "https://emkc.org/api/v2/piston/runtimes";
    public final static String URL_POST_CODE = "https://emkc.org/api/v2/piston/execute";

    public void getAvailableRuntimes() throws IOException, InterruptedException {
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(URL_GET_RUNTIMES))
                .header("User-Agent", "spring_boot_application")
                .header("Content-type", "application/json")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(httpRequest, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }

    public String executeCode(CodeExecutionRequest request) throws IOException, InterruptedException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = objectMapper
                .writerWithDefaultPrettyPrinter()
                .writeValueAsString(request);

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(URL_POST_CODE))
                .header("User-Agent", "spring_boot_application")
                .header("Content-type", "application/json")
                .method("POST", HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(httpRequest, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        //TODO: std err
        JSONObject json = new JSONObject(response.body());
        String output = json.getJSONObject("run").getString("stdout").trim();
        return output;
    }
}
