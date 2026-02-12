package com.example.LibraryManagementSystem.repository;

import com.example.LibraryManagementSystem.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<AppUser,Integer> {
    public AppUser findByUsername(String username);
    public AppUser findByEmailId(String emailId);
}
