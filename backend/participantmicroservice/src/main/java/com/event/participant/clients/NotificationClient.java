package com.event.participant.clients;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class NotificationClient {

    private final RestTemplate restTemplate;

    private final String BASE_URL = "http://localhost:8084/notifications";

    public void send(Long userId, String message) {

        Map<String, Object> req = Map.of(
            "userId", userId,
            "message", message
        );

        restTemplate.postForObject(
            BASE_URL + "/send",
            req,
            Void.class
        );
    }
}
