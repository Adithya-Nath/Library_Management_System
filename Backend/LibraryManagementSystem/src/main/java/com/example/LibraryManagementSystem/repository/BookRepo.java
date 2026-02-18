package com.example.LibraryManagementSystem.repository;

import com.example.LibraryManagementSystem.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book,Long> {
    long countByStatus(String status);
}
