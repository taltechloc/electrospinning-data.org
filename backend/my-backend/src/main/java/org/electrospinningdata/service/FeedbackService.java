package org.electrospinningdata.service;

import org.electrospinningdata.dto.FeedbackDTO;
import org.electrospinningdata.model.Feedback;
import org.electrospinningdata.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<FeedbackDTO> getAllFeedbacks() {
        return repository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private FeedbackDTO mapToDTO(Feedback feedback) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setName(feedback.getName());
        dto.setEmail(feedback.getEmail());
        dto.setCategory(feedback.getCategory());
        dto.setSubject(feedback.getSubject());
        dto.setMessage(feedback.getMessage());

        // Optional: Include base64 image string if needed
        if (feedback.getImageData() != null) {
            dto.setImageBase64(Base64.getEncoder().encodeToString(feedback.getImageData()));
        }

        return dto;
    }
}
