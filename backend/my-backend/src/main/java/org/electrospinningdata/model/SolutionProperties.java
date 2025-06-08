package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
@Table(name = "solution_properties")
public class SolutionProperties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solution_property_id")
    private Long solutionPropertyId;

    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Column(name = "concentration")
    private Double concentration;

    @ManyToOne
    @JoinColumn(name = "concentration_unit_id")
    private Unit concentrationUnit;

    @Column(name = "viscosity")
    private Double viscosity;

    @ManyToOne
    @JoinColumn(name = "viscosity_unit_id")
    private Unit viscosityUnit;

    @Column(name = "surface_tension")
    private Double surfaceTension;

    @ManyToOne
    @JoinColumn(name = "surface_tension_unit_id")
    private Unit surfaceTensionUnit;

    @Column(name = "conductivity")
    private Double conductivity;

    @ManyToOne
    @JoinColumn(name = "conductivity_unit_id")
    private Unit conductivityUnit;

    @Column(name = "evaporation_rate")
    private Double evaporationRate;

    @ManyToOne
    @JoinColumn(name = "evaporation_rate_unit_id")
    private Unit evaporationRateUnit;

    @Column(name = "pH")
    private Double pH;

    public SolutionProperties() {}

    public SolutionProperties(Experiments experiment, Double concentration, Unit concentrationUnit,
                              Double viscosity, Unit viscosityUnit, Double surfaceTension, Unit surfaceTensionUnit,
                              Double conductivity, Unit conductivityUnit, Double evaporationRate, Unit evaporationRateUnit,
                              Double pH) {
        this.experiment = experiment;
        this.concentration = concentration;
        this.concentrationUnit = concentrationUnit;
        this.viscosity = viscosity;
        this.viscosityUnit = viscosityUnit;
        this.surfaceTension = surfaceTension;
        this.surfaceTensionUnit = surfaceTensionUnit;
        this.conductivity = conductivity;
        this.conductivityUnit = conductivityUnit;
        this.evaporationRate = evaporationRate;
        this.evaporationRateUnit = evaporationRateUnit;
        this.pH = pH;
    }

    public Long getSolutionPropertyId() {
        return solutionPropertyId;
    }

    public void setSolutionPropertyId(Long solutionPropertyId) {
        this.solutionPropertyId = solutionPropertyId;
    }

    public Experiments getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiments experiment) {
        this.experiment = experiment;
    }

    public Double getConcentration() {
        return concentration;
    }

    public void setConcentration(Double concentration) {
        this.concentration = concentration;
    }

    public Unit getConcentrationUnit() {
        return concentrationUnit;
    }

    public void setConcentrationUnit(Unit concentrationUnit) {
        this.concentrationUnit = concentrationUnit;
    }

    public Double getViscosity() {
        return viscosity;
    }

    public void setViscosity(Double viscosity) {
        this.viscosity = viscosity;
    }

    public Unit getViscosityUnit() {
        return viscosityUnit;
    }

    public void setViscosityUnit(Unit viscosityUnit) {
        this.viscosityUnit = viscosityUnit;
    }

    public Double getSurfaceTension() {
        return surfaceTension;
    }

    public void setSurfaceTension(Double surfaceTension) {
        this.surfaceTension = surfaceTension;
    }

    public Unit getSurfaceTensionUnit() {
        return surfaceTensionUnit;
    }

    public void setSurfaceTensionUnit(Unit surfaceTensionUnit) {
        this.surfaceTensionUnit = surfaceTensionUnit;
    }

    public Double getConductivity() {
        return conductivity;
    }

    public void setConductivity(Double conductivity) {
        this.conductivity = conductivity;
    }

    public Unit getConductivityUnit() {
        return conductivityUnit;
    }

    public void setConductivityUnit(Unit conductivityUnit) {
        this.conductivityUnit = conductivityUnit;
    }

    public Double getEvaporationRate() {
        return evaporationRate;
    }

    public void setEvaporationRate(Double evaporationRate) {
        this.evaporationRate = evaporationRate;
    }

    public Unit getEvaporationRateUnit() {
        return evaporationRateUnit;
    }

    public void setEvaporationRateUnit(Unit evaporationRateUnit) {
        this.evaporationRateUnit = evaporationRateUnit;
    }

    public Double getPH() {
        return pH;
    }

    public void setPH(Double pH) {
        this.pH = pH;
    }
}
