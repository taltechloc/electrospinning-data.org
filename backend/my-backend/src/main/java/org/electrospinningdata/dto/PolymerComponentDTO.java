package org.electrospinningdata.dto;

public class PolymerComponentDTO {
    private String polymerName;
    private Double polymerWeight;
    private String polymerWeightUnit;
    private Double molecularWeight;
    private String molecularWeightUnit;
    private Double weightRatio;
    private String weightRatioUnit;

    public String getPolymerName() {
        return polymerName;
    }

    public void setPolymerName(String polymerName) {
        this.polymerName = polymerName;
    }

    public Double getPolymerWeight() {
        return polymerWeight;
    }

    public void setPolymerWeight(Double polymerWeight) {
        this.polymerWeight = polymerWeight;
    }

    // Getter and Setter for concentrationUnitId
    public String getPolymerWeightUnit() {
        return polymerWeightUnit;
    }

    public void setPolymerWeightUnit(String polymerWeightUnit) {
        this.polymerWeightUnit = polymerWeightUnit;
    }

    public Double getMolecularWeight() {
        return molecularWeight;
    }

    public void setMolecularWeight(Double molecularWeight) {
        this.molecularWeight = molecularWeight;
    }

    public String getMolecularWeightUnit() {
        return molecularWeightUnit;
    }

    public void setMolecularWeightUnit(String molecularWeightUnit) {
        this.molecularWeightUnit = molecularWeightUnit;
    }

    public Double getWeightRatio() {
        return weightRatio;
    }

    public void setWeightRatio(Double weightRatio) {
        this.weightRatio = weightRatio;
    }

    public String getWeightRatioUnit() {
        return weightRatioUnit;
    }

    public void setWeightRatioUnit(String weightRatioUnit) {
        this.weightRatioUnit = weightRatioUnit;
    }
}
