package com.example.LibraryManagementSystem.controller;

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
    private LoanService loanService; // Inject the service

    @Autowired
    private IssuedBookRepo issuedBookRepo;

    @PostMapping("/confirm")
    public ResponseEntity<?> borrowBook(@RequestBody LoanRequestDto request) {
        try {
            // All business logic, status checks, and DB saves happen here
            String message = loanService.processLoan(request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            // Catches "Book not found", "Already borrowed", etc.
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all-issued")
    public ResponseEntity<List<IssuedBook>> getAllIssuedBooks() {
        return ResponseEntity.ok(issuedBookRepo.findAll());
    }

    @PostMapping("/return/{loanId}")
    public ResponseEntity<?> returnBook(@PathVariable Long loanId) {
        try {
            // It's a good idea to move return logic to Service too!
            String result = loanService.processReturn(loanId);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

