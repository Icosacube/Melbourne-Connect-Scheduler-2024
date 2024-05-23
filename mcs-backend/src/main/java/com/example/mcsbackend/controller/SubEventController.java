package com.example.mcsbackend.controller;

import com.example.mcsbackend.model.Event;
import com.example.mcsbackend.model.SubEvent;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/subevent")
public class SubEventController {

    private List<SubEvent> subEvents = new ArrayList<>();

    @GetMapping
    public List<SubEvent> getAllSubEvents() {
        return subEvents;
    }

    @PostMapping
    public void createSubEvent(@RequestBody SubEvent subEvent) {
        subEvent.setId(subEvents.size());
        subEvents.add(subEvent);
    }

    @PutMapping("/{subEventId}")
    public void updateSubEvent(@PathVariable("subEventId") int subEventId, @RequestBody SubEvent subEvent) {
        // Assuming subEventId corresponds to the index in the list
        if (subEventId >= 0 && subEventId < subEvents.size()) {
            subEvents.set(subEventId, subEvent);
        } else {
            throw new IllegalArgumentException("Invalid subEventId");
        }
    }

    @DeleteMapping("/{subEventId}")
    public void deleteSubEvent(@PathVariable("subEventId") int subEventId) {
        // Assuming subEventId corresponds to the index in the list
        if (subEventId >= 0 && subEventId < subEvents.size()) {
            subEvents.remove(subEventId);
        } else {
            throw new IllegalArgumentException("Invalid subEventId");
        }
    }

    // Temp dummy data
    public SubEventController() {
        subEvents.add(new SubEvent(0, "AI Conference", "Workshop",
                LocalDateTime.parse("2024-05-19T09:30"), Arrays.asList("Keahna Hansen-Fernandez"),
                Arrays.asList("John Doe", "Jane Smith"), 1000.50, 500, false));
    }
}
