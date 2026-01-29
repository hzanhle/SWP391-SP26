package com.waste.wcs.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DTO representing the response from the AI classification service.
 */
public class AIClassificationResponse {
    
    @JsonProperty("suggestedLabel")
    private String suggestedLabel;
    
    @JsonProperty("confidence")
    private Double confidence;
    
    public AIClassificationResponse() {
    }
    
    public AIClassificationResponse(String suggestedLabel, Double confidence) {
        this.suggestedLabel = suggestedLabel;
        this.confidence = confidence;
    }
    
    public String getSuggestedLabel() {
        return suggestedLabel;
    }
    
    public void setSuggestedLabel(String suggestedLabel) {
        this.suggestedLabel = suggestedLabel;
    }
    
    public Double getConfidence() {
        return confidence;
    }
    
    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }
}
