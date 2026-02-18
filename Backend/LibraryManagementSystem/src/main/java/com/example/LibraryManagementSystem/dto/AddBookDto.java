package com.example.LibraryManagementSystem.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddBookDto {

    private String title;
    private String authorName;
    private String category;
    private String description;
    private Long isbn;
    private String imageUrl;

}
