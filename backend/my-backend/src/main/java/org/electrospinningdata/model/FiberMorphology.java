package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class FiberMorphology {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fiber_morphology_id", nullable = false, updatable = false)
    private long fiberMorphologyId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "fiber_property_id")
    private FiberProperties fiberProperty;

    @Setter
    @Getter
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "morphology_id", nullable = true)
    private Morphology morphology;

}
