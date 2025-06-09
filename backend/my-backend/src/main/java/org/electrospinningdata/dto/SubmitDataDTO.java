package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class SubmitDataDTO {
    @Setter
    @Getter
    private UserMetadataDTO userMetadata;
    @Setter
    @Getter
    private List<ExperimentDataDTO> experimentData;  // Changed to List
}
