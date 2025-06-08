package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
public class Morphology {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private category category;

    @Column(name = "label", nullable = false, unique = true, length = 100)
    private String label;

    @Column(name = "abbreviation", length = 50)
    private String abbreviation;

    // Getters and Setters

    public int getMorphologyId() {
        return morphologyId;
    }

    public void setMorphologyId(int morphologyId) {
        this.morphologyId = morphologyId;
    }

    public category getCategory() {
        return category;
    }

    public void setCategory(category category) {
        this.category = category;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }
}
