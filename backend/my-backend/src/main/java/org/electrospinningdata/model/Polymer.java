package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
public class Polymer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "polymer_id")
    private int polymerId;

    @Column(name = "polymer_name", nullable = false, unique = true)
    private String polymerName;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "cas_number", unique = true)
    private String casNumber;

    @Column(name = "abbreviation")
    private String abbreviation;

    // Getters and Setters

    public int getPolymerId() {
        return polymerId;
    }

    public void setPolymerId(int polymerId) {
        this.polymerId = polymerId;
    }

    public String getPolymerName() {
        return polymerName;
    }

    public void setPolymerName(String polymerName) {
        this.polymerName = polymerName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getCasNumber() {
        return casNumber;
    }

    public void setCasNumber(String casNumber) {
        this.casNumber = casNumber;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }
}
