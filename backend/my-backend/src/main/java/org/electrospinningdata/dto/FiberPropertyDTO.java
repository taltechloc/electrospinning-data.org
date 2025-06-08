package org.electrospinningdata.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class FiberPropertyDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Boolean isFormationStable;
    private Double fiberDiameter;
    private Double fiberDiameterVariation;
    private String fiberDiameterUnit;
    private String fiberDiameterVariationUnit;
    private Double productWeight;
    private String productWeightUnit;
    private Double qualityGrade;
    private List<FiberMorphologyDTO> fiberMorphology;


    // Getters and Setters
    public void setIsFormationStable(Boolean isFormationStable)
    {
        this.isFormationStable = isFormationStable;
    }

    public Boolean getIsFormationStable()
    {
        return isFormationStable;
    }

    public Double getFiberDiameter() {
        return fiberDiameter;
    }

    public void setFiberDiameter(Double fiberDiameter) {
        this.fiberDiameter = fiberDiameter;
    }

    public Double getFiberDiameterVariation() {
        return fiberDiameterVariation;
    }

    public void setFiberDiameterVariation(Double fiberDiameterVariation) {
        this.fiberDiameterVariation = fiberDiameterVariation;
    }

    public String getFiberDiameterUnit() {
        return fiberDiameterUnit;
    }

    public void setFiberDiameterUnit(String diameterUnit) {
        this.fiberDiameterUnit = diameterUnit;
    }

    public String getFiberDiameterVariationUnit() {
        return fiberDiameterVariationUnit;
    }

    public void setFiberDiameterVariationUnit(String diameterUnit) {
        this.fiberDiameterVariationUnit = diameterUnit;
    }

    public void setProductWeight(Double productWeight){this.productWeight = productWeight;}

    public Double getProductWeight(){return productWeight;}

    public String getProductWeightUnit() {
        return productWeightUnit;
    }

    public void setProductWeightUnit(String productWeightUnit) {
        this.productWeightUnit = productWeightUnit;
    }

    public void setQualityGrade(Double qualityGrade){this.qualityGrade = qualityGrade;}

    public Double getQualityGrade(){return qualityGrade;}


    public List<FiberMorphologyDTO> getFiberMorphology() {
        return fiberMorphology;
    }

    public void setFiberMorphology(List<FiberMorphologyDTO> fiberMorphology) {
        this.fiberMorphology = fiberMorphology;
    }
}
