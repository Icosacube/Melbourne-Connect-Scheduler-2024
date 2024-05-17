package com.example.mcsbackend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="Event")
@NoArgsConstructor
@AllArgsConstructor
public class Event{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String eventName;
    private String eventType;
    // private Catering bookingReference;
    // private Venue venue;
}