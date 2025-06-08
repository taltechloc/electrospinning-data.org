package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
@Table(name = "solvent")
public class Solvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solvent_id")
    private Long solventId;

    @Column(name = "solvent_name", length = 100, nullable = false, unique = true)
    private String solventName;

    @Column(name = "full_name", length = 255)
    private String fullName;

    @Column(name = "cas_number", length = 50)
    private String casNumber;

    @Column(name = "abbreviation", length = 50)
    private String abbreviation;

    public Solvent() {}

    public Solvent(String solventName, String fullName, String casNumber, String abbreviation) {
        this.solventName = solventName;
        this.fullName = fullName;
        this.casNumber = casNumber;
        this.abbreviation = abbreviation;
    }

    public Long getSolventId() {
        return solventId;
    }

    public void setSolventId(Long solventId) {
        this.solventId = solventId;
    }

    public String getSolventName() {
        return solventName;
    }

    public void setSolventName(String solventName) {
        this.solventName = solventName;
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
