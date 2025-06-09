package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "solvent_properties")
public class SolventProperties {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solvent_property_id")
    private Long solventPropertyId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Setter
    @Getter
    @OneToMany(mappedBy = "solventProperty", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SolventComponents> solventComponents = new ArrayList<>();


    public SolventProperties() {}

    public SolventProperties(Experiments experiment) {
        this.experiment = experiment;
    }


    public void addComponent(SolventComponents component) {
        component.setSolventProperty(this);
        this.solventComponents.add(component);
    }
}

