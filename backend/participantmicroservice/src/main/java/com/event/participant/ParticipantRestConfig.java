package com.event.participant;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ParticipantRestConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
