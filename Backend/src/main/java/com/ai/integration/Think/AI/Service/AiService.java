package com.ai.integration.Think.AI.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AiService {

    private final Client client;
    private final List<String> conversation = new ArrayList<>();

    public String askGemini(String prompt) {

        if(isOffensive(prompt)) {
            throw new IllegalArgumentException("Offensive content");
        }

        conversation.add("user : " + prompt);

        StringBuilder query = new StringBuilder();
        for(String str : conversation) {
            query.append(str).append("\n");
        }

        GenerateContentResponse geminiResponse = client.models.generateContent(
                "gemini-2.5-flash",
                query.toString(),
                null
        );

        String response = geminiResponse.text();
        conversation.add("Gemini : " + response);
        return response;
    }

    private boolean isOffensive(String prompt) {
        return false;
    }
}