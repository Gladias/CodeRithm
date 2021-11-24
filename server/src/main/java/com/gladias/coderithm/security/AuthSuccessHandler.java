package com.gladias.coderithm.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class AuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final Integer expirationTime;
    private final String secret;

    public AuthSuccessHandler(@Value("${jwt.expirationTime}") Integer expirationTime,
                              @Value("${jwt.secret}") String secret) {
        this.expirationTime = expirationTime;
        this.secret = secret;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        String token = JWT.create()
                .withSubject(principal.getUsername())
                .sign(Algorithm.HMAC256(secret));

        ResponseCookie jwtCookie = ResponseCookie.from("token", token)
                .maxAge(expirationTime)
                .sameSite("None")
                .secure(true)
                .path("/")
                .build();

        //jwtCookie.setHttpOnly(true);
        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
    }
}
