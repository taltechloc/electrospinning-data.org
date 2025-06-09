package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class FiberPropertyDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Setter
    @Getter
    private Boolean isFormationStable;
    @Setter
    @Getter
    private Double fiberDiameter;
    @Setter
    @Getter
    private Double fiberDiameterVariation;
    @Setter
    @Getter
    private String fiberDiameterUnit;
    @Setter
    @Getter
    private String fiberDiameterVariationUnit;
    @Setter
    @Getter
    private Double productWeight;
    @Setter
    @Getter
    private String productWeightUnit;
    @Setter
    @Getter
    private Double qualityGrade;
    @Setter
    @Getter
    private List<FiberMorphologyDTO> fiberMorphology;
}
