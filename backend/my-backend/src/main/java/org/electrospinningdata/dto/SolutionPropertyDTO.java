package org.electrospinningdata.dto;

import java.io.Serializable;

public class SolutionPropertyDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Double solutionViscosity;
    private Double solutionConductivity;
    private Double concentration;
    private String concentrationUnit;
    private Double viscosity;
    private String viscosityUnit;
    private Double surfaceTension;
    private String surfaceTensionUnit;
    private Double conductivity;
    private String conductivityUnit;
    private Double evaporationRate;
    private String evaporationRateUnit;
    private Double pH;

    // Getters and Setters

    public Double getSolutionViscosity() {
        return solutionViscosity;
    }

    public void setSolutionViscosity(Double solutionViscosity) {
        this.solutionViscosity = solutionViscosity;
    }

    public Double getSolutionConductivity() {
        return solutionConductivity;
    }

    public void setSolutionConductivity(Double solutionConductivity) {
        this.solutionConductivity = solutionConductivity;
    }

    public Double getConcentration() {
        return concentration;
    }

    public void setConcentration(Double concentration) {
        this.concentration = concentration;
    }

    public String getConcentrationUnit() {
        return concentrationUnit;
    }

    public void setConcentrationUnit(String concentrationUnit) {
        this.concentrationUnit = concentrationUnit;
    }

    public Double getViscosity() {
        return viscosity;
    }

    public void setViscosity(Double viscosity) {
        this.viscosity = viscosity;
    }

    public String getViscosityUnit() {
        return viscosityUnit;
    }

    public void setViscosityUnit(String viscosityUnit) {
        this.viscosityUnit = viscosityUnit;
    }

    public Double getSurfaceTension() {
        return surfaceTension;
    }

    public void setSurfaceTension(Double surfaceTension) {
        this.surfaceTension = surfaceTension;
    }

    public String getSurfaceTensionUnit() {
        return surfaceTensionUnit;
    }

    public void setSurfaceTensionUnit(String surfaceTensionUnit) {
        this.surfaceTensionUnit = surfaceTensionUnit;
    }

    public Double getConductivity() {
        return conductivity;
    }

    public void setConductivity(Double conductivity) {
        this.conductivity = conductivity;
    }

    public String getConductivityUnit() {
        return conductivityUnit;
    }

    public void setConductivityUnit(String conductivityUnit) {
        this.conductivityUnit = conductivityUnit;
    }

    public Double getEvaporationRate() {
        return evaporationRate;
    }

    public void setEvaporationRate(Double evaporationRate) {
        this.evaporationRate = evaporationRate;
    }

    public String getEvaporationRateUnit() {
        return evaporationRateUnit;
    }

    public void setEvaporationRateUnit(String evaporationRateUnit) {
        this.evaporationRateUnit = evaporationRateUnit;
    }

    public Double getPH() {
        return pH;
    }

    public void setPH(Double pH) {
        this.pH = pH;
    }
}
