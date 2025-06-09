package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fiber_properties")
public class FiberProperties {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fiber_property_id")
    private Long fiberPropertyId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Setter
    @Getter
    @Column(name = "is_formation_stable")
    private Boolean isFormationStable;

    @Setter
    @Getter
    @Column(name = "fiber_diameter")
    private Double fiberDiameter;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "fiber_diameter_unit_id")
    private Unit fiberDiameterUnit;

    @Setter
    @Getter
    @Column(name = "product_weight")
    private Double productWeight;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "product_weight_unit_id")
    private Unit productWeightUnit;

    @Setter
    @Getter
    @Column(name = "fiber_diameter_variation")
    private Double fiberDiameterVariation;

    @Setter
    @Getter
    @Column(name = "quality_grade")
    private Double qualityGrade;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "fiber_diameter_variation_unit_id")
    private Unit fiberDiameterVariationUnit;

    @Setter
    @Getter
    @OneToMany(mappedBy = "fiberProperty", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FiberMorphology> fiberMorphologies = new ArrayList<>();


    public FiberProperties() {}


    public void addMorphology(FiberMorphology fiberMorphology) {
        fiberMorphology.setFiberProperty(this);
        this.fiberMorphologies.add(fiberMorphology);
    }
}
