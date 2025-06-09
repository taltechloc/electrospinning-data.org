package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

public class PolymerComponentDTO {
    @Setter
    @Getter
    private String polymerName;
    @Setter
    @Getter
    private Double polymerWeight;
    @Setter
    @Getter
    private String polymerWeightUnit;
    @Setter
    @Getter
    private Double molecularWeight;
    @Setter
    @Getter
    private String molecularWeightUnit;
    @Setter
    @Getter
    private Double weightRatio;
    @Setter
    @Getter
    private String weightRatioUnit;
}
