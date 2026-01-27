package com.waste.wcs.controller;

import com.waste.wcs.dto.AIClassificationResponse;
import com.waste.wcs.service.AIClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

/**
 * REST controller for AI image classification endpoints.
 */
@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*") // Allow CORS for frontend
public class AIController {
    
    private final AIClientService aiClientService;
    
    public AIController(AIClientService aiClientService) {
        this.aiClientService = aiClientService;
    }
    
    /**
     * Classifies an image using the AI service.
     * 
     * POST /api/ai/classify
     * Content-Type: multipart/form-data
     * 
     * @param imageFile The image file to classify
     * @return AIClassificationResponse with suggestedLabel and confidence
     */
    @PostMapping("/classify")
    public ResponseEntity<AIClassificationResponse> classifyImage(
            @RequestParam("file") MultipartFile imageFile) {
        
        // Validate file is provided
        if (imageFile == null || imageFile.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                "Image file is required");
        }
        
        // Validate file is an image
        String contentType = imageFile.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                "File must be an image");
        }
        
        // Forward to AI service
        AIClassificationResponse response = aiClientService.classifyImage(imageFile);
        
        return ResponseEntity.ok(response);
    }
}
