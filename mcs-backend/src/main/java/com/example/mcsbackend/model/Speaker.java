package com.example.mcsbackend.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Speaker")
public class Speaker{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstname;
    private String email;
}

