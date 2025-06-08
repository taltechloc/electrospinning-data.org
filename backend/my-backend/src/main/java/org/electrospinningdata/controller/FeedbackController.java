package org.electrospinningdata.controller;

import org.electrospinningdata.dto.FeedbackDTO;
import org.electrospinningdata.service.FeedbackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private static final Logger logger = LoggerFactory.getLogger(FeedbackController.class);
    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        logger.info("Received feedback submission request.");
        try {
            String response = service.saveFeedback(feedbackDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error submitting feedback", e);
            return ResponseEntity.status(500).body("Error submitting feedback: " + e.getMessage());
        }
    }
}
