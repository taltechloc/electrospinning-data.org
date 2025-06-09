package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

public class FeedbackDTO {
    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private String email;
    @Setter
    @Getter
    private String category;
    @Setter
    @Getter
    private String subject;
    @Setter
    @Getter
    private String message;
    @Setter
    @Getter
    private String imageBase64;
}
