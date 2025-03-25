package com.murara.todo.controller;

import com.murara.todo.model.DTO.LoginRequestDTO;
import com.murara.todo.model.DTO.AuthResponseDTO;
import com.murara.todo.model.DTO.RegisterRequestDTO;
import com.murara.todo.model.entity.User;
import com.murara.todo.repository.UserRepository;
import com.murara.todo.security.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO login) {
        User user = this.userRepository.findByEmail(login.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(login.password(), user.getPassword())) {
            String token = tokenService.generateToken(user);
            return ResponseEntity.ok(new AuthResponseDTO(login.email(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO register) {
        Optional<User> user = this.userRepository.findByEmail(register.email());

        if(user.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(register.email());
            newUser.setPassword(passwordEncoder.encode(register.password()));
            this.userRepository.save(newUser);

            String token = tokenService.generateToken(newUser);
            return ResponseEntity.ok(new AuthResponseDTO(newUser.getEmail(), token));
        }


        return ResponseEntity.badRequest().build();
    }
}
