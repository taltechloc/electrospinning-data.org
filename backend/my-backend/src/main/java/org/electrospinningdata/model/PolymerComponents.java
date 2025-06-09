package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "polymer_components")
public class PolymerComponents {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "component_id")
    private Long componentId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "polymer_property_id", nullable = false)
    private PolymerProperties polymerProperty;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "polymer_id", nullable = false)
    private Polymer polymer;  // changed from polymerName string to entity relation

    @Setter
    @Getter
    @Column(name = "polymer_weight")
    private Double polymerWeight;

    @Setter
    @Getter
    @Column(name = "molecular_weight")
    private Double molecularWeight;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "polymer_weight_unit_id")
    private Unit polymerWeightUnit;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "molecular_weight_unit_id")
    private Unit molecularWeightUnit;

    @Setter
    @Getter
    @Column(name = "weight_ratio")
    private Double weightRatio;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "weight_ratio_unit_id")
    private Unit weightRatioUnit;

    public PolymerComponents() {}

}
