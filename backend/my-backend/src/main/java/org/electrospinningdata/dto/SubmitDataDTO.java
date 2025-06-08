package org.electrospinningdata.dto;

import java.util.List;

public class SubmitDataDTO {
    private UserMetadataDTO userMetadata;
    private List<ExperimentDataDTO> experimentData;  // Changed to List

    public UserMetadataDTO getUserMetadata() {
        return userMetadata;
    }

    public void setUserMetadata(UserMetadataDTO userMetadata) {
        this.userMetadata = userMetadata;
    }

    public List<ExperimentDataDTO> getExperimentData() {
        return experimentData;
    }

    public void setExperimentData(List<ExperimentDataDTO> experimentData) {
        this.experimentData = experimentData;
    }
}
