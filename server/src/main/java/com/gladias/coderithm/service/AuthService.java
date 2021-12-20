package com.gladias.coderithm.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.gladias.coderithm.exception.NoPasswordMatchException;
import com.gladias.coderithm.exception.UserAlreadyExistsException;
import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.payload.auth.RegisterRequest;
import com.gladias.coderithm.payload.auth.UserDto;
import com.gladias.coderithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserEntity getUserFromToken(String token) {
        String login = getUsernameFromToken(token);
        return userRepository.findByLogin(login).get();
    }

    public UserDto getUserData(String username) {
        UserEntity user = userRepository.findByLogin(username).get();

        return new UserDto(user.getId(), user.getLogin(), user.getEmail());
    }

    public UserDto getUserData(Long id) {
        UserEntity user = userRepository.findById(id).get();

        return new UserDto(user.getId(), user.getLogin(), user.getEmail());
    }


    public void registerUserAccount(@NotNull RegisterRequest registerRequest) throws UserAlreadyExistsException,
            NoPasswordMatchException {
        if (userRepository.existsByLogin(registerRequest.login())) {
            throw new UserAlreadyExistsException("There is an account with login: " + registerRequest.login());
        } else if (userRepository.existsByEmail(registerRequest.email())) {
            throw new UserAlreadyExistsException("There is an account with email: " + registerRequest.email());
        } else if (!registerRequest.password().equals(registerRequest.passwordConfirm())) {
            throw new NoPasswordMatchException("Provided passwords do not match");
        }

        UserEntity user = UserEntity.builder()
                .login(registerRequest.login())
                .password(passwordEncoder.encode(registerRequest.password()))
                .email(registerRequest.email())
                .build();

        userRepository.save(user);
    }

    public static String getUsernameFromToken(String jwtToken) {
        return JWT.require(Algorithm.HMAC256("testSecret"))
                .build()
                .verify(jwtToken)
                .getSubject();
    }
}
