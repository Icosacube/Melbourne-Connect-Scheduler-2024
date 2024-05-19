package com.example.mcsbackend.controller;

import com.example.mcsbackend.model.Event;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    private List<Event> events = new ArrayList<>();

    @GetMapping
    public List<Event> getAllEvents() {
        return events;
    }

    @PostMapping
    public void createEvent(@RequestBody Event event) {
        events.add(event);
    }

    @PutMapping("/{event_id}")
    public void updateEvent(@PathVariable("event_id") int eventId, @RequestBody Event event) {
        // Assuming event_id corresponds to the index in the list
        if (eventId >= 0 && eventId > events.size()) {
            events.set(eventId, event);
        } else {
            throw new IllegalArgumentException("Invalid event_id");
        }
    }

    @DeleteMapping("/{event_id}")
    public void deleteEvent(@PathVariable("event_id") int eventId) {
        // Assuming event_id corresponds to the index in the list
        if (eventId >= 0 && eventId < events.size()) {
            events.remove(eventId);
        } else {
            throw new IllegalArgumentException("Invalid event_id");
        }
    }

    // Initialising with some sample data
    public EventController() {
        events.add(new Event(1, "AI Conference", "Conference", "123456", "Melbourne Connect",
                Arrays.asList("1", "2"), LocalDateTime.parse("2024-05-19T09:30"), "2 hours",
                "This is an AI conference"));
    }

}
