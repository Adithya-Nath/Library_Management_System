package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.dto.AddBookDto;
import com.example.LibraryManagementSystem.dto.AdminStatsDto;
import com.example.LibraryManagementSystem.dto.EditBookDto;
import com.example.LibraryManagementSystem.entity.Book;
import com.example.LibraryManagementSystem.entity.IssuedBook;
import com.example.LibraryManagementSystem.repository.IssuedBookRepo;
import com.example.LibraryManagementSystem.repository.UserRepo;
import com.example.LibraryManagementSystem.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    BookService bookService;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private IssuedBookRepo issuedBookRepo;

    @PostMapping("/addbook")
    public ResponseEntity<String> addBook(@RequestBody AddBookDto addBookDto){
        Book book=new Book();
        book.setTitle(addBookDto.getTitle());
        book.setAuthorName(addBookDto.getAuthorName());
        book.setCategory(addBookDto.getCategory());
        book.setDescription(addBookDto.getDescription());
        book.setIsbn(addBookDto.getIsbn());
        book.setImageUrl(addBookDto.getImageUrl());
        bookService.insertNewBook(book);
        return ResponseEntity.ok("Book saved successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Book>> getAllBooks(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        if (search.isEmpty()) {
            return ResponseEntity.ok(bookService.viewAllBooks(page, size));
        }
        return ResponseEntity.ok(bookService.searchBooks(search, page, size));
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDto> getAdminStats() {
        long totalBooks = bookService.countTotalBooks();
        long issuedBooks = bookService.countByStatus("Issued");
        // For now, these can be 0 or calculated from your UserRepo
        long totalMembers = userRepository.count();
        long overdue = 0;

        return ResponseEntity.ok(new AdminStatsDto(totalBooks, issuedBooks, totalMembers, overdue));
    }

    @PutMapping("/update/{id}")
    @Transactional // Ensures both updates succeed or both fail
    public ResponseEntity<String> updateBookDetails(@PathVariable Long id, @RequestBody EditBookDto editBookDto){
        Book book = bookService.getBookById(id);
        String oldStatus = book.getStatus();
        String newStatus = editBookDto.getStatus();

        // Smart Sync Logic
        if ("Issued".equalsIgnoreCase(oldStatus) && "Available".equalsIgnoreCase(newStatus)) {
            // Find the active loan record for this book
            List<IssuedBook> activeLoans = issuedBookRepo.findByBookIdAndStatus(id, "Active");

            for (IssuedBook loan : activeLoans) {
                loan.setStatus("Returned");
                issuedBookRepo.save(loan);
            }
        }

        // Standard updates
        book.setTitle(editBookDto.getTitle());
        book.setAuthorName(editBookDto.getAuthorName());
        book.setIsbn(editBookDto.getIsbn());
        book.setStatus(newStatus);
        book.setCategory(editBookDto.getCategory());
        book.setDescription(editBookDto.getDescription());
        book.setImageUrl(editBookDto.getImageUrl());

        bookService.updateBook(book);
        return ResponseEntity.ok("Book updated and loan records synced successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok("Book deleted successfully");
    }



}
