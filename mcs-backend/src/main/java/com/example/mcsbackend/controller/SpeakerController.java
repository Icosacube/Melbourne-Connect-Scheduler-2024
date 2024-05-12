package com.example.mcsbackend.controller;


import com.example.mcsbackend.model.Speaker;
import com.example.mcsbackend.repository.service.SpeakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/speaker")
public class SpeakerController {
    @Autowired
    private SpeakerService speakerService;
    @GetMapping
    public List<Speaker> getAllUsers() {
        return speakerService.getAllUsers();
    }
    @PostMapping
    public void createUser(@RequestBody Speaker speaker) {
        speakerService.createUser(speaker);
    }
}
