package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.entity.AppUser;
import com.example.LibraryManagementSystem.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepo userrepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       AppUser user=userrepository.findByUsername(username);
       if(user!=null){
           var springUser= User.withUsername(user.getUsername())
                   .password(user.getPassword())
                   .roles(user.getRole())
                   .build();
       return springUser;
       }
       else{
           throw new UsernameNotFoundException("User Not Found");
       }
    }
}
