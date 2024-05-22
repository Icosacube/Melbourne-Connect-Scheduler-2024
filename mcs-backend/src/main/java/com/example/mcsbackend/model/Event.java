package com.example.mcsbackend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name="MainEvent")
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String eventAbstract;

    private String description;

    private String banner;

    private LocalDateTime date;

    @ElementCollection
    private List<String> speakers;

    private String catering;

    private String venue;

}