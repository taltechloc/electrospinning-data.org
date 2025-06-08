package org.electrospinningdata.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "polymer_properties")
public class PolymerProperties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "polymer_property_id")
    private Long polymerPropertyId;

    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @OneToMany(mappedBy = "polymerProperty", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PolymerComponents> polymerComponents = new ArrayList<>();


    public PolymerProperties() {}

    public PolymerProperties(Experiments experiment, String blendType) {
        this.experiment = experiment;
    }

    public Long getPolymerPropertyId() {
        return polymerPropertyId;
    }

    public void setPolymerPropertyId(Long polymerPropertyId) {
        this.polymerPropertyId = polymerPropertyId;
    }

    public Experiments getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiments experiment) {
        this.experiment = experiment;
    }

    public void addComponent(PolymerComponents component) {
        component.setPolymerProperty(this);
        this.polymerComponents.add(component);
    }
    public List<PolymerComponents> getPolymerComponents() {
        return polymerComponents;
    }


}

