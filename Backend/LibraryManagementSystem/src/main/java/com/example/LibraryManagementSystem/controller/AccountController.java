package com.example.LibraryManagementSystem.controller;
import com.example.LibraryManagementSystem.dto.LoginDto;
import com.example.LibraryManagementSystem.dto.RegisterDto;
import com.example.LibraryManagementSystem.entity.AppUser;
import com.example.LibraryManagementSystem.repository.UserRepo;
import com.example.LibraryManagementSystem.service.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private UserRepo userRepository;
    @Autowired
    private PasswordEncoder pwdEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDto registerDto){

        if(userRepository.findByEmailId(registerDto.getEmailId())!=null){
            return ResponseEntity.badRequest().body("Error : Email is already in use! ");
        }
        if(userRepository.findByUsername(registerDto.getUsername())!=null){
            return ResponseEntity.badRequest().body("Error : Username is already taken ! ");
        }
        AppUser appuser=new AppUser();
        appuser.setFirstName(registerDto.getFirstName());
        appuser.setLastName(registerDto.getLastName());
        appuser.setUsername(registerDto.getUsername());
        appuser.setPassword(pwdEncoder.encode(registerDto.getPassword()));
        appuser.setEmailId(registerDto.getEmailId());
        appuser.setPhoneNumber(registerDto.getPhoneNumber());
        appuser.setRole(registerDto.getRole());
        userRepository.save(appuser);
        return ResponseEntity.ok("Registered Successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto loginDto){
        HashMap<String,Object> response=new HashMap<>();
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword()));
            AppUser appuser=userRepository.findByUsername(loginDto.getUsername());
            String jwtToken=jwtTokenService.createJwtToken(appuser);
            response.put("jwt token",jwtToken);
            response.put("User",appuser);
        }
        catch(Exception e){
            return ResponseEntity.status(401).body("invalid username or password");
        }

        return  ResponseEntity.ok(response);
    }


}
