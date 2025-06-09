package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

public class ExperimentRowDTO {
    @Setter
    @Getter
    private Long experimentId;
    @Setter
    @Getter
    private String experimentName;
    @Setter
    @Getter
    private Map<String, Object> processParameters;
    @Setter
    @Getter
    private List<NeedlePropertyDTO> needleProperties;
}
