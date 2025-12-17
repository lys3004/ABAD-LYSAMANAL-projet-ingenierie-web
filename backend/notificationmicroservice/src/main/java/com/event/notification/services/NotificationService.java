package com.event.notification.services;

import com.event.notification.entities.Notification;
import com.event.notification.repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repo;

    public Notification send(Long userId, String message) {
        Notification notif = Notification.builder()
                .userId(userId)
                .message(message)
                .readStatus(false)
                .date(LocalDateTime.now())
                .build();

        return repo.save(notif);
    }

    public List<Notification> getUserNotifications(Long userId) {
        return repo.findByUserIdOrderByDateDesc(userId);
    }

    public Notification markAsRead(Long id) {
        Notification notif = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notif.setReadStatus(true);
        return repo.save(notif);
    }
}
