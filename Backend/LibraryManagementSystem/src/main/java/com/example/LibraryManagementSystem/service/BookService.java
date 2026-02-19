package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.entity.Book;
import com.example.LibraryManagementSystem.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepo repo;


    public void insertNewBook(Book book){
        repo.save(book);
    }

    public Page<Book> viewAllBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable);
    }

    public void updateBook(Book book){
        repo.save(book);
    }

    public Book getBookById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    public void deleteBook(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            throw new RuntimeException("Cannot delete. Book not found with id: " + id);
        }
    }

    public Page<Book> searchBooks(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findByTitleContainingIgnoreCaseOrAuthorNameContainingIgnoreCase(query, query, pageable);
    }

    public long countTotalBooks() {
        return repo.count();
    }

    public long countByStatus(String status) {
        // Optimized: Now the database does the counting, not the Java application
        return repo.countByStatus(status);
    }

}
