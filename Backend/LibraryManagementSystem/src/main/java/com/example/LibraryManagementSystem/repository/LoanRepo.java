package com.example.LibraryManagementSystem.repository;

import com.example.LibraryManagementSystem.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepo extends JpaRepository<Loan,Integer> {
}
