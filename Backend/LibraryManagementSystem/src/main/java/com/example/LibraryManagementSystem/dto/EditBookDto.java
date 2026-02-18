package com.example.LibraryManagementSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditBookDto {
    private String title;
    private String authorName;
    private Long isbn;
    private String status;
    private String category;    // Added
    private String description; // Added
    private String imageUrl;
}
