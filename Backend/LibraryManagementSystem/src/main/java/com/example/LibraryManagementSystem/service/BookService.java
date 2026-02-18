package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.entity.Book;
import com.example.LibraryManagementSystem.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepo repo;


    public void insertNewBook(Book book){
        repo.save(book);
    }

    public List<Book> viewAllBooks(){
        return repo.findAll();
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

    public long countTotalBooks() {
        return repo.count();
    }

    public long countByStatus(String status) {
        // Optimized: Now the database does the counting, not the Java application
        return repo.countByStatus(status);
    }

}
