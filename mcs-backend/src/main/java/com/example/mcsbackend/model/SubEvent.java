package com.example.mcsbackend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name="SubEvent")
@NoArgsConstructor
@AllArgsConstructor

public class SubEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String type;

    private LocalDateTime date;

    @ElementCollection
    private List<String> speakers;

    @ElementCollection
    private List<String> guestAcademic;

    private double cost;

    private double funding;

    private boolean completed;

}
