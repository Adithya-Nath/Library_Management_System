package com.example.LibraryManagementSystem.repository;

import com.example.LibraryManagementSystem.entity.IssuedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssuedBookRepo extends JpaRepository<IssuedBook, Long> {
    // Custom query to find active loans for a specific user
    List<IssuedBook> findByBookIdAndStatus(Long bookId, String status);
    long countByUserIdAndStatus(Long userId, String status);
    List<IssuedBook> findByUserId(Long userId);
}