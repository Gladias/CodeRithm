package com.gladias.coderithm.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gladias.coderithm.model.UserEntity;
import com.gladias.coderithm.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("User with login: " + login + "does not exist"));

        return UserPrincipal.of(user);
    }
}
