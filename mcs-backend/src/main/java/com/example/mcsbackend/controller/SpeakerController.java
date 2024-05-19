package com.example.mcsbackend.controller;

import com.example.mcsbackend.model.Speaker;
import com.example.mcsbackend.repository.service.SpeakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/speaker")
public class SpeakerController {
    @Autowired
    private SpeakerService speakerService;
    @GetMapping
    public List<Speaker> getAllUsers() {
        List<Speaker> speakers = new ArrayList<>();
        // Creating sample Speaker objects with photo URLs
        speakers.add(new Speaker(1, "John", "Doe", "john.doe@example.com", "Bio for John Doe", "https://ibb.co/98hb8rc"));
        speakers.add(new Speaker(2, "Jane", "Smith", "jane.smith@example.com", "Bio for Jane Smith", "https://ibb.co/98hb8rc"));
        speakers.add(new Speaker(3, "Emily", "Johnson", "emily.johnson@example.com", "Bio for Emily Johnson", "https://ibb.co/98hb8rc"));

        return speakers;

        // return speakerService.getAllUsers();
    }
    @PostMapping
    public ResponseEntity<Speaker> createUser(@RequestBody Speaker speaker) {
        System.out.println("Received Speaker Data: " + speaker);
        return new ResponseEntity<>(speaker, HttpStatus.OK);
        //speakerService.createUser(speaker);
    }
}
