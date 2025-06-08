package org.electrospinningdata.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "solvent_properties")
public class SolventProperties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solvent_property_id")
    private Long solventPropertyId;

    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @OneToMany(mappedBy = "solventProperty", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SolventComponents> solventComponents = new ArrayList<>();


    public SolventProperties() {}

    public SolventProperties(Experiments experiment) {
        this.experiment = experiment;
    }

    public Long getSolventPropertyId() {
        return solventPropertyId;
    }

    public void setSolventPropertyId(Long solventPropertyId) {
        this.solventPropertyId = solventPropertyId;
    }

    public Experiments getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiments experiment) {
        this.experiment = experiment;
    }



    public void addComponent(SolventComponents component) {
        component.setSolventProperty(this);
        this.solventComponents.add(component);
    }

    public List<SolventComponents> getSolventComponents() {
        return solventComponents;
    }
}

