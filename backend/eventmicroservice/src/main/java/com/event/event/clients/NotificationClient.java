package com.event.event.clients;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class NotificationClient {

    private final RestTemplate restTemplate;

    public NotificationClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendNotification(Long userId, String message) {
        String url = "http://localhost:8084/notification/send";
        restTemplate.postForObject(url, new NotificationRequest(userId, message), Void.class);
    }
}
