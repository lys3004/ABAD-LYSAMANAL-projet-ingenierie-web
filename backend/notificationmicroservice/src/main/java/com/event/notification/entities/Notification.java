package com.event.notification.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;              // utilisateur concerné
    private String message;           // corps du message
    private boolean readStatus;       // false = non lu, true = lu
    private LocalDateTime date;       // date de création
}
