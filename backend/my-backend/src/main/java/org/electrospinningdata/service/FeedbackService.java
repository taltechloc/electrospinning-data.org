package org.electrospinningdata.service;

import org.electrospinningdata.dto.FeedbackDTO;
import org.electrospinningdata.model.Feedback;
import org.electrospinningdata.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Base64;

@Service
public class FeedbackService {

    private final FeedbackRepository repository;

    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
    }

    public String saveFeedback(FeedbackDTO dto) throws Exception {
        Feedback feedback = new Feedback();

        feedback.setName(dto.getName());
        feedback.setEmail(dto.getEmail());
        feedback.setCategory(dto.getCategory());
        feedback.setSubject(dto.getSubject());
        feedback.setMessage(dto.getMessage());

        if (StringUtils.hasText(dto.getImageBase64())) {
            byte[] imageBytes = Base64.getDecoder().decode(dto.getImageBase64());
            feedback.setImageData(imageBytes);
        }

        Feedback saved = repository.save(feedback);
        return "Feedback submitted successfully with ID: " + saved.getFeedbackId();
    }
}
