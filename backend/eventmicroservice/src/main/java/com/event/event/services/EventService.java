package com.event.event.services;

import com.event.event.entities.Event;
import com.event.event.repositories.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository repo;

    public EventService(EventRepository repo) {
        this.repo = repo;
    }

    public List<Event> getAll() {
        return repo.findAll();
    }

    public Event getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Event save(Event event) {
        return repo.save(event);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Event> getByOrganizer(Long organizerId) {
        return repo.findByOrganizerId(organizerId);
    }
}
