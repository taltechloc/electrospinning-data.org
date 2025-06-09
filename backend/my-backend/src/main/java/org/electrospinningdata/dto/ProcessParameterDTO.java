package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

public class ProcessParameterDTO {
    @Setter
    @Getter
    private Double voltage;
    @Setter
    @Getter
    private String voltageUnit;
    @Setter
    @Getter
    private Double flowRate;
    @Setter
    @Getter
    private String flowRateUnit;
    @Setter
    @Getter
    private Double tipCollectorDistance;
    @Setter
    @Getter
    private String tipCollectorDistanceUnit;
    @Setter
    @Getter
    private Double spinningDuration;
    @Setter
    @Getter
    private String spinningDurationUnit;
}
