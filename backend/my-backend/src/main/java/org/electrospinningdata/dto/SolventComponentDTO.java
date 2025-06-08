package org.electrospinningdata.dto;

public class SolventComponentDTO {

    private String solventName;
    private Double weight;
    private String weightUnit;
    private Double volumeRatio;
    private String volumeRatioUnit;

    public String getSolventName() {
        return solventName;
    }

    public void setSolventName(String solventName) {
        this.solventName = solventName;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getWeightUnit() {
        return weightUnit;
    }

    public void setWeightUnit(String weightUnit) {
        this.weightUnit = weightUnit;
    }

    public Double getVolumeRatio() {
        return volumeRatio;
    }

    public void setVolumeRatio(Double volumeRatio) {
        this.volumeRatio = volumeRatio;
    }

    public String getVolumeRatioUnit() {
        return volumeRatioUnit;
    }

    public void setVolumeRatioUnit(String volumeRatioUnit) {
        this.volumeRatioUnit = volumeRatioUnit;
    }
}
