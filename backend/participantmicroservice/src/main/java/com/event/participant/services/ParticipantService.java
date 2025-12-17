package com.event.participant.services;

import com.event.participant.entities.Participant;
import com.event.participant.repositories.ParticipantRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ParticipantService {

    private final ParticipantRepository repo;

    public ParticipantService(ParticipantRepository repo) {
        this.repo = repo;
    }

    public String register(Long userId, Long eventId) {

        // Vérifier si déjà inscrit
        if (repo.existsByUserIdAndEventId(userId, eventId)) {
            return "User already registered to this event";
        }

        Participant p = Participant.builder()
                .userId(userId)
                .eventId(eventId)
                .registrationDate(LocalDate.now().toString())
                .build();

        repo.save(p);
        return "User successfully registered";
    }

    public boolean unregister(Long userId, Long eventId) {
        return repo.findByUserIdAndEventId(userId, eventId)
                .map(p -> {
                    repo.delete(p);
                    return true;
                })
                .orElse(false);
    }
}
