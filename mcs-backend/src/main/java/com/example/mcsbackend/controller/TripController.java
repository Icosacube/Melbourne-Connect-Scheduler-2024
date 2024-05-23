package com.example.mcsbackend.controller;
import com.example.mcsbackend.model.Trip;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/trip")
public class TripController {

    private List<Trip> trips = new ArrayList<>();

    @GetMapping
    public List<Trip> getAllTrips() {
        return trips;
    }

    @PostMapping
    public void createTrip(@RequestBody Trip trip) {
        trip.setId(trips.size());
        trips.add(trip);
    }

    @PutMapping("/{tripId}")
    public void updateTrip(@PathVariable("tripId") int tripId, @RequestBody Trip trip) {
        // Assuming tripId corresponds to the index in the list
        if (tripId >= 0 && tripId < trips.size()) {
            trips.set(tripId, trip);
        } else {
            throw new IllegalArgumentException("Invalid tripId");
        }
    }

    @DeleteMapping("/{tripId}")
    public void deleteTrip(@PathVariable("tripId") int tripId) {
        // Assuming tripId corresponds to the index in the list
        if (tripId >= 0 && tripId < trips.size()) {
            trips.remove(tripId);
        } else {
            throw new IllegalArgumentException("Invalid tripId");
        }
    }

    // Temp dummy data
    public TripController() {
        trips.add(new Trip(0, "John Doe", LocalDate.parse("2024-06-01"),
                LocalDate.parse("2024-06-10"), 10, "Hotel ABC",
                "Bus", "Flight XYZ", 5, false));
    }
}
