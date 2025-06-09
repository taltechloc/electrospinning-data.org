package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Morphology {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "morphology_id")
    private int morphologyId;


    public enum category {
        Structure,
        Topography,
        Texture,
        Shape,
        Composition,
        Defects
    }

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private category category;

    @Setter
    @Getter
    @Column(name = "label", nullable = false, unique = true, length = 100)
    private String label;

    @Setter
    @Getter
    @Column(name = "abbreviation", length = 50)
    private String abbreviation;

}
