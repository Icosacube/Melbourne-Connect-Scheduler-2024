package com.example.mcsbackend.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="Event")
@NoArgsConstructor
@AllArgsConstructor
public class Event{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;

    private String eventName;

    private String eventType;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private String eventDateTime;

    private String cateringBookingReference;

    private String venueName;

}