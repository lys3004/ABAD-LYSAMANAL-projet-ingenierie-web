package com.event.participant.repositories;

import com.event.participant.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    Optional<Participant> findByUserIdAndEventId(Long userId, Long eventId);
}
