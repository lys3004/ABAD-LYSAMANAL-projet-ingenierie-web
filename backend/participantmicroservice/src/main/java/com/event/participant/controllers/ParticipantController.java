package com.event.participant.controllers;

import com.event.participant.services.ParticipantService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/participant")
//@CrossOrigin("*")
public class ParticipantController {

    private final ParticipantService service;

    public ParticipantController(ParticipantService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestParam Long userId, @RequestParam Long eventId) {
        return service.register(userId, eventId);
    }

    @DeleteMapping("/unregister")
    public boolean unregister(@RequestParam Long userId, @RequestParam Long eventId) {
        return service.unregister(userId, eventId);
    }
}
