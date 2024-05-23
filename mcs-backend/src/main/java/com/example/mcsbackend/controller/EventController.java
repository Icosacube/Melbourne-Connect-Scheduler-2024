package com.example.mcsbackend.controller;

import com.example.mcsbackend.model.Event;
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
        event.setId(events.size());
        events.add(event);
    }

    @PutMapping("/{event_id}")
    public void updateEvent(@PathVariable("event_id") int event_id, @RequestBody Event event) {
        // Assuming event_id corresponds to the index in the list
        if (event_id >= 0 && event_id < events.size()) {
            events.set(event_id, event);
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

    // Temp dummy data
    public EventController() {
        events.add(new Event(0, "AI Conference", "This is an event abstract",
                "This is an event description", "This is an event banner",
                LocalDateTime.parse("2024-05-19T09:30"), Arrays.asList("Kia Tan", "Brendan Lee"), "123",
                "Melbourne Connect"));

    }
}
