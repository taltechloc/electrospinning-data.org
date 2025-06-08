package org.electrospinningdata.dto;

import java.util.List;
import java.util.Map;

public class ExperimentRowDTO {
    private Long experimentId;
    private String experimentName;
    private Map<String, Object> processParameters;
    private List<NeedlePropertyDTO> needleProperties;  // renamed and type changed

    public Long getExperimentId() {
        return experimentId;
    }

    public void setExperimentId(Long experimentId) {
        this.experimentId = experimentId;
    }

    public String getExperimentName() {
        return experimentName;
    }

    public void setExperimentName(String experimentName) {
        this.experimentName = experimentName;
    }

    public Map<String, Object> getProcessParameters() {
        return processParameters;
    }

    public void setProcessParameters(Map<String, Object> processParameters) {
        this.processParameters = processParameters;
    }

    public List<NeedlePropertyDTO> getNeedleProperties() {
        return needleProperties;
    }

    public void setNeedleProperties(List<NeedlePropertyDTO> needleProperties) {
        this.needleProperties = needleProperties;
    }
}
