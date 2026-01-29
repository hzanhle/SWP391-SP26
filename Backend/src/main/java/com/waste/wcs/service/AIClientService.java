package com.waste.wcs.service;

import com.waste.wcs.dto.AIClassificationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.io.IOException;

/**
 * Service for communicating with the AI classification service.
 */
@Service
public class AIClientService {
    
    private final WebClient webClient;
    
    public AIClientService(WebClient.Builder webClientBuilder,
                          @Value("${ai.service.url:http://localhost:8000}") String aiServiceUrl) {
        this.webClient = webClientBuilder
                .baseUrl(aiServiceUrl)
                .build();
    }
    
    /**
     * Sends an image file to the AI service for classification.
     * 
     * @param imageFile The image file to classify
     * @return AIClassificationResponse containing the classification result
     * @throws ResponseStatusException if the AI service is unavailable (503) or if there's an error
     */
    public AIClassificationResponse classifyImage(MultipartFile imageFile) {
        try {
            // Validate file
            if (imageFile == null || imageFile.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image file is required");
            }
            
            // Validate it's an image
            String contentType = imageFile.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File must be an image");
            }
            
            // Build multipart request
            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            builder.part("file", imageFile.getResource())
                    .contentType(MediaType.parseMediaType(contentType));
            
            // Call AI service
            AIClassificationResponse response = webClient.post()
                    .uri("/predict")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData(builder.build()))
                    .retrieve()
                    .onStatus(HttpStatus::is5xxServerError, clientResponse -> 
                        Mono.error(new ResponseStatusException(
                            HttpStatus.SERVICE_UNAVAILABLE, 
                            "AI service is unavailable")))
                    .onStatus(HttpStatus::is4xxClientError, clientResponse -> 
                        Mono.error(new ResponseStatusException(
                            HttpStatus.BAD_REQUEST, 
                            "Invalid request to AI service")))
                    .bodyToMono(AIClassificationResponse.class)
                    .block(); // Blocking call since we're in a non-reactive context
            
            if (response == null) {
                throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE, 
                    "No response from AI service");
            }
            
            return response;
            
        } catch (ResponseStatusException e) {
            throw e;
        } catch (org.springframework.web.reactive.function.client.WebClientException e) {
            // Handle connection errors
            throw new ResponseStatusException(
                HttpStatus.SERVICE_UNAVAILABLE, 
                "AI service is unavailable: " + e.getMessage(), 
                e);
        } catch (IOException e) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Error processing image file: " + e.getMessage(), 
                e);
        } catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Unexpected error: " + e.getMessage(), 
                e);
        }
    }
}
