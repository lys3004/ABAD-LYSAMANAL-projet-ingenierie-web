package com.event.auth.services;

import com.event.auth.entities.AppUser;
import com.event.auth.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public AppUser register(AppUser user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public AppUser login(String email, String password) {

    AppUser user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!encoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    return user;
}

}
