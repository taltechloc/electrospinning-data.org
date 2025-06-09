package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class ModerationLog {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private int logId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "submission_id", referencedColumnName = "submission_id")
    private DataSubmission dataSubmission;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "moderator_id", referencedColumnName = "user_id")
    private UserInfo moderator;

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    private Action action;

    @Setter
    @Getter
    @Column(name = "action_timestamp")
    private String actionTimestamp;

    @Setter
    @Getter
    private String comment;
    public ModerationLog() {
        this.actionTimestamp = java.time.LocalDateTime.now().toString();
    }

    public enum Action {
        APPROVED,
        REJECTED,
        FLAGGED
    }
}
