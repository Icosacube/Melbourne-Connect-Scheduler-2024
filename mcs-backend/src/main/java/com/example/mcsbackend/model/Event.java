package com.example.mcsbackend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name="Event")
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;

    private String eventName;

    private String eventType;

    private String cateringReference;

    private String venue;

    @ElementCollection
    private List<String> speakerName;

    private LocalDateTime date;

    private String duration;

    private String description;


}