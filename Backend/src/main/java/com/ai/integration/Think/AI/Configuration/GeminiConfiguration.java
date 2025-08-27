package com.ai.integration.Think.AI.Configuration;

import com.google.genai.Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeminiConfiguration {

    @Bean
    public Client createClient() {
        return new Client();
    }

}