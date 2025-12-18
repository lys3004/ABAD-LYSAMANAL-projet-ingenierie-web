package com.event.event.entities;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private String date;
    private String time;
    private String category;

    private Long organizerId;

    private int maxParticipants = 50;
    
    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;  // Base64 encoded image or URL
}
