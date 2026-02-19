package com.example.LibraryManagementSystem.repository;

import com.example.LibraryManagementSystem.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book,Long> {
    Page<Book> findByTitleContainingIgnoreCaseOrAuthorNameContainingIgnoreCase(
            String title, String authorName, Pageable pageable
    );
    long countByStatus(String status);
}
