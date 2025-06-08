package org.electrospinningdata.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class DataSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "submission_id")
    private int submissionId;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL)
//    private List<Experiments> experiments = new ArrayList<>();
    private List<Experiments> experiments;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserInfo userInfo;

    @Column(name = "submission_timestamp")
    private String submissionTimestamp;

    public DataSubmission() {
        this.submissionTimestamp = java.time.LocalDateTime.now().toString();
    }


    // Getters and Setters
    public int getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(int submissionId) {
        this.submissionId = submissionId;
    }


    public List<Experiments> getExperiments() {
        return experiments;
    }

    public void setExperiments(List<Experiments> experiments) {
        this.experiments = experiments;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public String getSubmissionTimestamp() {
        return submissionTimestamp;
    }

    public void setSubmissionTimestamp(String submissionTimestamp) {
        this.submissionTimestamp = submissionTimestamp;
    }


}
