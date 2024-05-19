package com.example.mcsbackend.controller;

import com.example.mcsbackend.model.Event;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    // @Autowired
    // private EventService eventService;

    @GetMapping
    List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        events.add(new Event(1, "AI Conference", "Conference", "123456", "Melbourne Connect", Arrays.asList("1", "2"), LocalDateTime.parse("2024-05-19T09:30"), "2 hours", "This is an AI conference"));
        return events;
    }
}
