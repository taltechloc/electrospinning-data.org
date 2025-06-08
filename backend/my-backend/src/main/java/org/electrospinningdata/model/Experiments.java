package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
public class Experiments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experiment_id")
    private Integer experimentId;

    @Column(name = "timestamp")
    private String timestamp;

    @Column(name = "user_id", columnDefinition = "CHAR(36)")
    private String userId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false)
    private UserInfo userInfo;

    @ManyToOne
    @JoinColumn(name = "submission_id")
    private DataSubmission submission;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    public Experiments() {
        this.timestamp = java.time.LocalDateTime.now().toString();
    }

    // Getters and Setters
    public int getExperimentId() {
        return experimentId;
    }

    public void setExperimentId(int experimentId) {
        this.experimentId = experimentId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    public DataSubmission getSubmission() {
        return submission;
    }

    public void setSubmission(DataSubmission submission) {
        this.submission = submission;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
