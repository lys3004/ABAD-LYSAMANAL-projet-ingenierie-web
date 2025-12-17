package com.event.event.repositories;

import com.event.event.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByOrganizerId(Long organizerId);
}
