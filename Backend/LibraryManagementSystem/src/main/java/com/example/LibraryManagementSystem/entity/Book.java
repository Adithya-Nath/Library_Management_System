package com.example.LibraryManagementSystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "books")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String authorName;
    private String category;
    private String description;
    @Column(unique = true)
    private Long isbn;
    private String imageUrl;
   // private String bookCount;
    @Column(nullable = false)
    private String status="Available";
    private boolean isAvailable;
}
