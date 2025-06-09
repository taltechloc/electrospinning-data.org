package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

public class SolutionPropertyDTO implements Serializable {

    private static final long serialVersionUID = 1L;
    @Setter
    @Getter
    private Double solutionViscosity;
    @Setter
    @Getter
    private Double solutionConductivity;
    @Setter
    @Getter
    private Double concentration;
    @Setter
    @Getter
    private String concentrationUnit;
    @Setter
    @Getter
    private Double viscosity;
    @Setter
    @Getter
    private String viscosityUnit;
    @Setter
    @Getter
    private Double surfaceTension;
    @Setter
    @Getter
    private String surfaceTensionUnit;
    @Setter
    @Getter
    private Double conductivity;
    @Setter
    @Getter
    private String conductivityUnit;
    @Setter
    @Getter
    private Double evaporationRate;
    @Setter
    @Getter
    private String evaporationRateUnit;
    @Setter
    @Getter
    private Double pH;
}
