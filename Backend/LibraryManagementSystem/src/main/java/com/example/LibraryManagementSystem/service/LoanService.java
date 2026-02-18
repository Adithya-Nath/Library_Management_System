package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.dto.LoanRequestDto;
import com.example.LibraryManagementSystem.entity.AppUser;
import com.example.LibraryManagementSystem.entity.Book;
import com.example.LibraryManagementSystem.entity.IssuedBook;
import com.example.LibraryManagementSystem.repository.BookRepo;
import com.example.LibraryManagementSystem.repository.IssuedBookRepo;
import com.example.LibraryManagementSystem.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class LoanService {
    @Autowired private IssuedBookRepo issuedBookRepo;
    @Autowired private BookRepo bookRepo;
    @Autowired private UserRepo userRepo;

    @Transactional
    public String processLoan(LoanRequestDto request) {
        Book book = bookRepo.findById(request.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        AppUser user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if ("Issued".equalsIgnoreCase(book.getStatus())) {
            throw new RuntimeException("Book is already borrowed.");
        }

        IssuedBook loan = new IssuedBook();
        loan.setBook(book);
        loan.setUser(user);
        loan.setIssueDate(LocalDate.now());
        loan.setReturnDate(LocalDate.parse(request.getReturnDate()));
        loan.setStatus("Active");

        book.setStatus("Issued");
        bookRepo.save(book);
        issuedBookRepo.save(loan);

        return "Borrowed successfully until " + request.getReturnDate();
    }

    @Transactional
    public String processReturn(Long loanId) {
        IssuedBook loan = issuedBookRepo.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan record not found"));

        // Update the Book status back to Available
        Book book = loan.getBook();
        book.setStatus("Available");
        bookRepo.save(book);

        // Update the Loan status to Returned
        loan.setStatus("Returned");
        issuedBookRepo.save(loan);

        return "Book returned successfully!";
    }
}