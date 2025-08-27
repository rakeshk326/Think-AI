package com.ai.integration.Think.AI.Controller;

import com.ai.integration.Think.AI.Service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/prompt/gemini")
    public ResponseEntity<String> generatedResponse(@RequestPart(value = "Text", required = false) String prompt, @RequestPart(value = "File", required = false) MultipartFile file) {

        try {
            String response = aiService.askGemini(prompt);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body("Invalid prompt : " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(502).body("Gemini API error : " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error : " + e.getMessage());
        }
    }
}