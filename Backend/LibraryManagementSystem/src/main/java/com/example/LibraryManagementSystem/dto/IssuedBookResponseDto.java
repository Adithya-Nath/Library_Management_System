package com.example.LibraryManagementSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssuedBookResponseDto {
    private Long id;
    private Long bookId;        // Flattened
    private String bookTitle;   // Flattened
    private String bookImageUrl;// Flattened
    private String studentName; // Flattened
    private String username;    // Flattened
    private Long userId;        // CRITICAL: Used for filtering in React
    private LocalDate issueDate;
    private LocalDate returnDate;
    private String status;
}