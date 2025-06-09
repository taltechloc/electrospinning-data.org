package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
public class DataSubmission {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "submission_id")
    private int submissionId;

    @Setter
    @Getter
    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL)
//    private List<Experiments> experiments = new ArrayList<>();
    private List<Experiments> experiments;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserInfo userInfo;

    @Setter
    @Getter
    @Column(name = "submission_timestamp")
    private String submissionTimestamp;

    public DataSubmission() {
        this.submissionTimestamp = java.time.LocalDateTime.now().toString();
    }

}
