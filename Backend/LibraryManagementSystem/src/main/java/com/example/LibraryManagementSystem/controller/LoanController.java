package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.dto.IssuedBookResponseDto;
import com.example.LibraryManagementSystem.dto.LoanRequestDto;
import com.example.LibraryManagementSystem.entity.AppUser;
import com.example.LibraryManagementSystem.entity.Book;
import com.example.LibraryManagementSystem.entity.IssuedBook;
import com.example.LibraryManagementSystem.repository.BookRepo;
import com.example.LibraryManagementSystem.repository.IssuedBookRepo;
import com.example.LibraryManagementSystem.repository.UserRepo;
import com.example.LibraryManagementSystem.service.LoanService;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private IssuedBookRepo issuedBookRepo;

    @PostMapping("/confirm")
    public ResponseEntity<?> borrowBook(@RequestBody LoanRequestDto request) {
        try {
            String message = loanService.processLoan(request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all-issued")
    public ResponseEntity<List<IssuedBookResponseDto>> getAllIssuedBooks() {
        List<IssuedBook> loans = issuedBookRepo.findAll();

        // Convert Entities to DTOs manually to avoid circular references
        List<IssuedBookResponseDto> dtos = loans.stream().map(this::convertToDto).toList();

        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/return/{loanId}")
    public ResponseEntity<?> returnBook(@PathVariable Long loanId) {
        try {
            String result = loanService.processReturn(loanId);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Helper method to keep the GET method clean and handle nulls
    private IssuedBookResponseDto convertToDto(IssuedBook loan) {
        IssuedBookResponseDto dto = new IssuedBookResponseDto();
        dto.setId(loan.getId());

        if (loan.getBook() != null) {
            dto.setBookId(loan.getBook().getId());
            dto.setBookTitle(loan.getBook().getTitle());
            dto.setBookImageUrl(loan.getBook().getImageUrl());
        }

        if (loan.getUser() != null) {
            dto.setStudentName(loan.getUser().getFirstName() + " " + loan.getUser().getLastName());
            dto.setUsername(loan.getUser().getUsername());
            dto.setUserId(loan.getUser().getId());
        }

        dto.setIssueDate(loan.getIssueDate());
        dto.setReturnDate(loan.getReturnDate());
        dto.setStatus(loan.getStatus());

        return dto;
    }
}