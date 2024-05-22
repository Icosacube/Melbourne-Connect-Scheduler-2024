package com.example.mcsbackend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Table(name="Trip")
@NoArgsConstructor
@AllArgsConstructor
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String speaker;

    private LocalDate startDate;

    private LocalDate endDate;

    private int duration;

    private String accommodation;

    private String localTransport;

    private String flight;

    private int canvassing;

    private boolean completed;
}
