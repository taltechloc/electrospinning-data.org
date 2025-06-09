package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "solution_properties")
public class SolutionProperties {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solution_property_id")
    private Long solutionPropertyId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Setter
    @Getter
    @Column(name = "concentration")
    private Double concentration;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "concentration_unit_id")
    private Unit concentrationUnit;

    @Setter
    @Getter
    @Column(name = "viscosity")
    private Double viscosity;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "viscosity_unit_id")
    private Unit viscosityUnit;

    @Setter
    @Getter
    @Column(name = "surface_tension")
    private Double surfaceTension;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "surface_tension_unit_id")
    private Unit surfaceTensionUnit;

    @Setter
    @Getter
    @Column(name = "conductivity")
    private Double conductivity;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "conductivity_unit_id")
    private Unit conductivityUnit;

    @Setter
    @Getter
    @Column(name = "evaporation_rate")
    private Double evaporationRate;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "evaporation_rate_unit_id")
    private Unit evaporationRateUnit;

    @Setter
    @Getter
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
}
