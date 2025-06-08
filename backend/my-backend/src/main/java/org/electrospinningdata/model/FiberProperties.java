package org.electrospinningdata.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fiber_properties")
public class FiberProperties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fiber_property_id")
    private Long fiberPropertyId;

    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Column(name = "is_formation_stable")
    private Boolean isFormationStable;

    @Column(name = "fiber_diameter")
    private Double fiberDiameter;

    @ManyToOne
    @JoinColumn(name = "fiber_diameter_unit_id")
    private Unit fiberDiameterUnit;

    @Column(name = "product_weight")
    private Double productWeight;

    @ManyToOne
    @JoinColumn(name = "product_weight_unit_id")
    private Unit productWeightUnit;

    @Column(name = "fiber_diameter_variation")
    private Double fiberDiameterVariation;

    @Column(name = "quality_grade")
    private Double qualityGrade;

    @ManyToOne
    @JoinColumn(name = "fiber_diameter_variation_unit_id")
    private Unit fiberDiameterVariationUnit;

    @OneToMany(mappedBy = "fiberProperty", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FiberMorphology> fiberMorphologies = new ArrayList<>();


    public FiberProperties() {}


    public Long getFiberPropertyId() {
        return fiberPropertyId;
    }

    public void setFiberPropertyId(Long fiberPropertyId) {
        this.fiberPropertyId = fiberPropertyId;
    }

    public Experiments getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiments experiment) {
        this.experiment = experiment;
    }

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

    public Unit getFiberDiameterUnit() {
        return fiberDiameterUnit;
    }

    public void setFiberDiameterUnit(Unit fiberDiameterUnit) {
        this.fiberDiameterUnit = fiberDiameterUnit;
    }

    public Double getFiberDiameterVariation() {
        return fiberDiameterVariation;
    }

    public void setProductWeight(Double productWeight){this.productWeight = productWeight;}

    public Double getProductWeight(){return productWeight;}

    public Unit getProductWeightUnit() {
        return productWeightUnit;
    }

    public void setProductWeightUnit(Unit productWeightUnit) {
        this.productWeightUnit = productWeightUnit;
    }

    public void setFiberDiameterVariation(Double fiberDiameterVariation) {
        this.fiberDiameterVariation = fiberDiameterVariation;
    }

    public Unit getFiberDiameterVariationUnit() {
        return fiberDiameterVariationUnit;
    }

    public void setFiberDiameterVariationUnit(Unit fiberDiameterVariationUnit) {
        this.fiberDiameterVariationUnit = fiberDiameterVariationUnit;
    }

    public void setQualityGrade(Double qualityGrade){this.qualityGrade = qualityGrade;}

    public Double getQualityGrade(){return qualityGrade;}

    public void addMorphology(FiberMorphology fiberMorphology) {
        fiberMorphology.setFiberProperty(this);
        this.fiberMorphologies.add(fiberMorphology);
    }
}
