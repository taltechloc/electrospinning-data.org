package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "polymer_properties")
public class PolymerProperties {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "polymer_property_id")
    private Long polymerPropertyId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Setter
    @Getter
    @OneToMany(mappedBy = "polymerProperty", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PolymerComponents> polymerComponents = new ArrayList<>();


    public PolymerProperties() {}

    public PolymerProperties(Experiments experiment, String blendType) {
        this.experiment = experiment;
    }


    public void addComponent(PolymerComponents component) {
        component.setPolymerProperty(this);
        this.polymerComponents.add(component);
    }

}

