package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

public class SolventComponentDTO {
    @Setter
    @Getter
    private String solventName;
    @Setter
    @Getter
    private Double weight;
    @Setter
    @Getter
    private String weightUnit;
    @Setter
    @Getter
    private Double volumeRatio;
    @Setter
    @Getter
    private String volumeRatioUnit;
}
