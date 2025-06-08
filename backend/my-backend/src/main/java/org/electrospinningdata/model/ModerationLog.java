package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
public class ModerationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private int logId;

    @ManyToOne
    @JoinColumn(name = "submission_id", referencedColumnName = "submission_id")
    private DataSubmission dataSubmission;

    @ManyToOne
    @JoinColumn(name = "moderator_id", referencedColumnName = "user_id")
    private UserInfo moderator;

    @Enumerated(EnumType.STRING)
    private Action action;

    @Column(name = "action_timestamp")
    private String actionTimestamp;

    private String comment;

    public ModerationLog() {
        this.actionTimestamp = java.time.LocalDateTime.now().toString();
    }

    public enum Action {
        APPROVED,
        REJECTED,
        FLAGGED
    }

    // Getters and Setters
    public int getLogId() {
        return logId;
    }

    public void setLogId(int logId) {
        this.logId = logId;
    }

    public DataSubmission getDataSubmission() {
        return dataSubmission;
    }

    public void setDataSubmission(DataSubmission dataSubmission) {
        this.dataSubmission = dataSubmission;
    }

    public UserInfo getModerator() {
        return moderator;
    }

    public void setModerator(UserInfo moderator) {
        this.moderator = moderator;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public String getActionTimestamp() {
        return actionTimestamp;
    }

    public void setActionTimestamp(String actionTimestamp) {
        this.actionTimestamp = actionTimestamp;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
