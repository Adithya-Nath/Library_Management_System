package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.dto.AddBookDto;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @PostMapping("/addBook")
    public String addBook(@RequestBody AddBookDto addBookDto){
        return "Book Added";
    }

    @GetMapping("/getBook")
    public String getBook(){
        return "Book Retrieved Successfully";
    }

    @PutMapping("/edit")
    public String editBook(){
        return "Book Updated";
    }

    @DeleteMapping("/delete")
    public String deleteBook(){
        return "Book Deleted";
    }

}
