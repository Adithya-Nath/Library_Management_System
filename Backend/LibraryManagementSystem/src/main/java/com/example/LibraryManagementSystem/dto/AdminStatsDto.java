package com.example.LibraryManagementSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminStatsDto {
    private long totalBooks;
    private long issuedBooks;
    private long totalMembers;
    private long overdueBooks;
}
