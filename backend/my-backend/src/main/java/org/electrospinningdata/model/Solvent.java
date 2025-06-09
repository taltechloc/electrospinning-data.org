package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "solvent")
public class Solvent {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solvent_id")
    private Long solventId;

    @Setter
    @Getter
    @Column(name = "solvent_name", length = 100, nullable = false, unique = true)
    private String solventName;

    @Setter
    @Getter
    @Column(name = "full_name", length = 255)
    private String fullName;

    @Setter
    @Getter
    @Column(name = "cas_number", length = 50)
    private String casNumber;

    @Setter
    @Getter
    @Column(name = "abbreviation", length = 50)
    private String abbreviation;

    public Solvent() {}

    public Solvent(String solventName, String fullName, String casNumber, String abbreviation) {
        this.solventName = solventName;
        this.fullName = fullName;
        this.casNumber = casNumber;
        this.abbreviation = abbreviation;
    }
}
