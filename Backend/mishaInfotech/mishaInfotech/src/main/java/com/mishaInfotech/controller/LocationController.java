package com.mishaInfotech.controller;



import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class LocationController {

   
    private static final Map<Long, String> STATES = Map.of(
            1L, "Delhi",
            2L, "UP"
    );

    private static final Map<Long, List<String>> CITIES = Map.of(
            1L, List.of("Delhi", "New Delhi"),
            2L, List.of("Noida", "Lucknow")
    );

    @GetMapping("/states")
    public List<Map<String, Object>> states() {
        List<Map<String, Object>> data = new ArrayList<>();
        STATES.forEach((id, name) -> data.add(Map.of("id", id, "name", name)));
        return data;
    }

    @GetMapping("/states/{stateId}/cities")
    public List<String> cities(@PathVariable Long stateId) {
        return CITIES.getOrDefault(stateId, List.of());
    }
}
