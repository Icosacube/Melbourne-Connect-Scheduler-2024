package com.example.mcsbackend.controller;

import com.example.mcsbackend.model.Event;
import com.example.mcsbackend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    // @Autowired
    // private EventService eventService;

    @GetMapping
    List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        events.add(new Event(1, "AI Conference", "Talk", "10-05-2024 09:00", "123456", "Melbourne Connect"));
        return events;
    }
}
