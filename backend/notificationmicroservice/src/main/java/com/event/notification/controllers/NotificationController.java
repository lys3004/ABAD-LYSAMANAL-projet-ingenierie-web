package com.event.notification.controllers;

import com.event.notification.entities.Notification;
import com.event.notification.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @PostMapping("/send")
    public Notification send(@RequestBody Map<String, Object> req) {
        Long userId = Long.valueOf(req.get("userId").toString());
        String message = req.get("message").toString();
        return service.send(userId, message);
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getUserNotifications(@PathVariable Long userId) {
        return service.getUserNotifications(userId);
    }

    @PutMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        return service.markAsRead(id);
    }
}
