package org.electrospinningdata.dto;


public class DataSubmissionDTO {
    private int submissionId;
    private int experimentId;
    private int userId;
    private String submissionTimestamp;

    public DataSubmissionDTO() {}

    public DataSubmissionDTO(int submissionId, int experimentId, int userId, String submissionTimestamp) {
        this.submissionId = submissionId;
        this.experimentId = experimentId;
        this.userId = userId;
        this.submissionTimestamp = submissionTimestamp;
    }

    // Getters and Setters
    public int getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(int submissionId) {
        this.submissionId = submissionId;
    }

    public int getExperimentId() {
        return experimentId;
    }

    public void setExperimentId(int experimentId) {
        this.experimentId = experimentId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getSubmissionTimestamp() {
        return submissionTimestamp;
    }

    public void setSubmissionTimestamp(String submissionTimestamp) {
        this.submissionTimestamp = submissionTimestamp;
    }

}
