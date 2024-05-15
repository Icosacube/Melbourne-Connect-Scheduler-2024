package com.example.mcsbackend.repository;

import com.example.mcsbackend.model.Speaker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Speakerrepo extends JpaRepository<Speaker, Long> {
}
