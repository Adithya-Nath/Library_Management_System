package com.example.LibraryManagementSystem.dto;

import lombok.Data;

@Data
public class LoanRequestDto {
    private Long bookId;
    private Long userId;
    private String returnDate;
}
