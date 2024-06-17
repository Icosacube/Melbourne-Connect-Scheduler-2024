package com.example.mcsbackend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="Speaker")
@NoArgsConstructor
@AllArgsConstructor
public class Speaker{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String firstname;
    private String lastname;
    private String Bio;
    private String photo;

}

