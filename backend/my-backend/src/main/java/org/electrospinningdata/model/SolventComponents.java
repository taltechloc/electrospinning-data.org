package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "solvent_components")
public class SolventComponents {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "component_id")
    private Long componentId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "solvent_property_id", nullable = false)
    private SolventProperties solventProperty;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "solvent_id", nullable = false)
    private Solvent solvent;

    @Setter
    @Getter
    @Column(name = "weight")
    private Double weight;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "weight_unit_id")
    private Unit weightUnit;

    @Setter
    @Getter
    @Column(name = "volume_ratio")
    private Double volumeRatio;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "volume_ratio_unit_id")
    private Unit volumeRatioUnit;

    public SolventComponents() {}

}
