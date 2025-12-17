package com.event.event.clients;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class ParticipantClient {

    private final RestTemplate restTemplate;

    public Object[] getParticipants(Long eventId) {
        return restTemplate.getForObject(
                "http://localhost:8083/participants/event/" + eventId,
                Object[].class
        );
    }
}
