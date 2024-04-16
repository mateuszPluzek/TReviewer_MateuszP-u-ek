package com.example.treviewer.repositories;

import com.example.treviewer.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
