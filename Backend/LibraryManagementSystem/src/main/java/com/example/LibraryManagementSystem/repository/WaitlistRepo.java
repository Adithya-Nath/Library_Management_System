package com.example.LibraryManagementSystem.repository;

import com.example.LibraryManagementSystem.entity.Waitlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaitlistRepo extends JpaRepository<Waitlist,Integer> {
}
