package com.gladias.coderithm.controller;

import com.gladias.coderithm.payload.profile.ProfileResponse;
import com.gladias.coderithm.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/getAll")
    public Page<ProfileResponse> getAllProfiles(@RequestParam(defaultValue = "0") Integer page,
                                               @RequestParam(defaultValue = "20") Integer size) {
        return profileService.getAllProfiles(page, size);
    }

    @GetMapping("/getOne")
    public ProfileResponse getProfileById(@RequestParam("id") Long id) {
        return profileService.getProfileById(id);
    }

    @GetMapping("/getByToken")
    public ProfileResponse getProfileByToken(@CookieValue("token") String token) {
        return profileService.getProfileByToken(token);
    }
}
