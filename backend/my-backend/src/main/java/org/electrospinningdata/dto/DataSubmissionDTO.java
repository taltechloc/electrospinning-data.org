package org.electrospinningdata.dto;


import lombok.Getter;
import lombok.Setter;

public class DataSubmissionDTO {
    @Setter
    @Getter
    private int submissionId;
    @Setter
    @Getter
    private int experimentId;
    @Setter
    @Getter
    private int userId;
    @Setter
    @Getter
    private String submissionTimestamp;

    public DataSubmissionDTO() {}

    public DataSubmissionDTO(int submissionId, int experimentId, int userId, String submissionTimestamp) {
        this.submissionId = submissionId;
        this.experimentId = experimentId;
        this.userId = userId;
        this.submissionTimestamp = submissionTimestamp;
    }
}
