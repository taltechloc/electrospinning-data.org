package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
public class FiberMorphology {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fiber_morphology_id", nullable = false, updatable = false)
    private long fiberMorphologyId;

    @ManyToOne
    @JoinColumn(name = "fiber_property_id")
    private FiberProperties fiberProperty;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "morphology_id", nullable = true)
    private Morphology morphology;

    // Getters and Setters

    public long getFiberMorphologyId() {
        return fiberMorphologyId;
    }

    public void setFiberMorphologyId(long fiberMorphologyId) {
        this.fiberMorphologyId = fiberMorphologyId;
    }

    public FiberProperties getFiberProperty() {
        return fiberProperty;
    }

    public void setFiberProperty(FiberProperties fiberProperty) {
        this.fiberProperty = fiberProperty;
    }

    public Morphology getMorphology() {
        return morphology;
    }

    public void setMorphology(Morphology morphology) {
        this.morphology = morphology;
    }
}
