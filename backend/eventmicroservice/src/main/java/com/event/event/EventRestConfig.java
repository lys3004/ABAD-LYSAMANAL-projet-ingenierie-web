package com.event.event;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class EventRestConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
