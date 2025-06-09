package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Experiments {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experiment_id")
    private Integer experimentId;

    @Setter
    @Getter
    @Column(name = "timestamp")
    private String timestamp;

    @Setter
    @Getter
    @Column(name = "user_id", columnDefinition = "CHAR(36)")
    private String userId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false)
    private UserInfo userInfo;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "submission_id")
    private DataSubmission submission;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    public Experiments() {
        this.timestamp = java.time.LocalDateTime.now().toString();
    }
}
