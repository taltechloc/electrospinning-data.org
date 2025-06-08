package org.electrospinningdata.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

public class CollectorPropertyDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String collectorType;
    private Map<String, Object> collectorDefinition;


    // Getters and Setters

    public String getCollectorType() {
        return collectorType;
    }

    public void setCollectorType(String collectorType) {
        this.collectorType = collectorType;
    }

    public Map<String, Object> getCollectorDefinition() {
        return collectorDefinition;
    }

    public void setCollectorDefinition(Map<String, Object> collectorDefinition) {
        this.collectorDefinition = collectorDefinition;
    }
}
