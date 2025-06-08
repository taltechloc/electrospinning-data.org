package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
@Table(name = "polymer_components")
public class PolymerComponents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "component_id")
    private Long componentId;

    @ManyToOne
    @JoinColumn(name = "polymer_property_id", nullable = false)
    private PolymerProperties polymerProperty;

    @ManyToOne
    @JoinColumn(name = "polymer_id", nullable = false)
    private Polymer polymer;  // changed from polymerName string to entity relation

    @Column(name = "polymer_weight")
    private Double polymerWeight;

    @Column(name = "molecular_weight")
    private Double molecularWeight;

    @ManyToOne
    @JoinColumn(name = "polymer_weight_unit_id")
    private Unit polymerWeightUnitId;

    @ManyToOne
    @JoinColumn(name = "molecular_weight_unit_id")
    private Unit molecularWeightUnit;

    @Column(name = "weight_ratio")
    private Double weightRatio;

    @ManyToOne
    @JoinColumn(name = "weight_ratio_unit_id")
    private Unit weightRatioUnitId;

    public PolymerComponents() {}


    public Long getComponentId() {
        return componentId;
    }

    public void setComponentId(Long componentId) {
        this.componentId = componentId;
    }

    public PolymerProperties getPolymerProperty() {
        return polymerProperty;
    }

    public void setPolymerProperty(PolymerProperties polymerProperty) {
        this.polymerProperty = polymerProperty;
    }

    public Polymer getPolymer() {
        return polymer;
    }

    public void setPolymer(Polymer polymer) {
        this.polymer = polymer;
    }

    public Double getPolymerWeight() {
        return polymerWeight;
    }

    public void setPolymerWeight(Double polymerWeight) {
        this.polymerWeight = polymerWeight;
    }

    public Double getMolecularWeight() {
        return molecularWeight;
    }

    public void setMolecularWeight(Double molecularWeight) {
        this.molecularWeight = molecularWeight;
    }

    public Unit getPolymerWeightUnit() {
        return polymerWeightUnitId;
    }

    public void setPolymerWeightUnit(Unit polymerWeightUnitId) {
        this.polymerWeightUnitId = polymerWeightUnitId;
    }

    public Unit getMolecularWeightUnit() {
        return molecularWeightUnit;
    }

    public void setMolecularWeightUnit(Unit molecularWeightUnit) {
        this.molecularWeightUnit = molecularWeightUnit;
    }

    public Double getWeightRatio() {
        return weightRatio;
    }

    public void setWeightRatio(Double weightRatio) {
        this.weightRatio = weightRatio;
    }

    public Unit getWeightRatioUnit() {
        return weightRatioUnitId;
    }

    public void setWeightRatioUnit(Unit weightRatioUnitId) {
        this.weightRatioUnitId = weightRatioUnitId;
    }

}
