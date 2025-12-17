package com.event.event.controllers;

import com.event.event.entities.Event;
import com.event.event.services.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<Event> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Event getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Event save(@RequestBody Event event) {
        return service.save(event);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
