package java.com.gladias.coderithm.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.com.gladias.coderithm.exception.NoPasswordMatchException;
import java.com.gladias.coderithm.exception.UserAlreadyExistsException;
import java.com.gladias.coderithm.model.UserEntity;
import java.com.gladias.coderithm.payload.RegisterRequest;
import java.com.gladias.coderithm.payload.UserDto;
import java.com.gladias.coderithm.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserDto getUserData(String username) {
        UserEntity user = repository.findByLogin(username).get();

        return UserDto.builder()
                .id(user.getId())
                .login(user.getLogin())
                .email(user.getEmail())
                .build();
    }

    public void registerUserAccount(@NotNull RegisterRequest registerRequest) throws UserAlreadyExistsException,
            NoPasswordMatchException {
        if (repository.existsByLogin(registerRequest.getLogin())) {
            throw new UserAlreadyExistsException("There is an account with login: " + registerRequest.getLogin());
        } else if (repository.existsByEmail(registerRequest.getEmail())) {
            throw new UserAlreadyExistsException("There is an account with email: " + registerRequest.getEmail());
        } else if (!registerRequest.getPassword().equals(registerRequest.getPasswordConfirm())) {
            throw new NoPasswordMatchException("Provided passwords do not match");
        }

        UserEntity user = UserEntity.builder()
                .login(registerRequest.getLogin())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .email(registerRequest.getEmail())
                .build();

        repository.save(user);
    }

    public static String getUsernameFromToken(String jwtToken) {
        return JWT.require(Algorithm.HMAC256("testSecret"))
                .build()
                .verify(jwtToken)
                .getSubject();
    }
}
