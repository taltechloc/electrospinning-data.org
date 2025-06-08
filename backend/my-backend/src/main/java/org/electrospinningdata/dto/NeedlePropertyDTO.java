package org.electrospinningdata.dto;

import java.util.Map;

public class NeedlePropertyDTO {

    private Long needlePropertyId;
    private Long experimentId;
    private String needleType;

    private Map<String, Object> needleDefinition;
    // Getters and setters

    public Long getNeedlePropertyId() {
        return needlePropertyId;
    }

    public void setNeedlePropertyId(Long needlePropertyId) {
        this.needlePropertyId = needlePropertyId;
    }

    public Long getExperimentId() {
        return experimentId;
    }

    public void setExperimentId(Long experimentId) {
        this.experimentId = experimentId;
    }

    public String getNeedleType() {
        return needleType;
    }

    public void setNeedleType(String needleType) {
        this.needleType = needleType;
    }

    public Map<String, Object> getNeedleDefinition() {
        return needleDefinition;
    }

    public void setNeedleDefinition(Map<String, Object> needleDefinition) {
        this.needleDefinition = needleDefinition;
    }
}
