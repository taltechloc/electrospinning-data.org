package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
@Table(name = "solvent_components")
public class SolventComponents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "component_id")
    private Long componentId;

    @ManyToOne
    @JoinColumn(name = "solvent_property_id", nullable = false)
    private SolventProperties solventProperty;

    // Replace solventName string with solvent entity relationship
    @ManyToOne
    @JoinColumn(name = "solvent_id", nullable = false)
    private Solvent solvent;

    @Column(name = "weight")
    private Double weight;

    @ManyToOne
    @JoinColumn(name = "weight_unit_id")
    private Unit weightUnit;

    @Column(name = "volume_ratio")
    private Double volumeRatio;

    @ManyToOne
    @JoinColumn(name = "volume_ratio_unit_id")
    private Unit volumeRatioUnitId;

    public SolventComponents() {}


    public Long getComponentId() {
        return componentId;
    }

    public void setComponentId(Long componentId) {
        this.componentId = componentId;
    }

    public SolventProperties getSolventProperty() {
        return solventProperty;
    }

    public void setSolventProperty(SolventProperties solventProperty) {
        this.solventProperty = solventProperty;
    }

    public Solvent getSolvent() {
        return solvent;
    }

    public void setSolvent(Solvent solvent) {
        this.solvent = solvent;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Unit getWeightUnit() {
        return weightUnit;
    }

    public void setWeightUnit(Unit weightUnit) {
        this.weightUnit = weightUnit;
    }

    public Double getVolumeRatio() {
        return volumeRatio;
    }

    public void setVolumeRatio(Double volumeRatio) {
        this.volumeRatio = volumeRatio;
    }

    public Unit getVolumeRatioUnit() {
        return volumeRatioUnitId;
    }

    public void setVolumeRatioUnit(Unit volumeRatioUnitId) {
        this.volumeRatioUnitId = volumeRatioUnitId;
    }

}
