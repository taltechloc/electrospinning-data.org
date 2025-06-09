package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Polymer {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "polymer_id")
    private int polymerId;

    @Setter
    @Getter
    @Column(name = "polymer_name", nullable = false, unique = true)
    private String polymerName;

    @Setter
    @Getter
    @Column(name = "full_name")
    private String fullName;

    @Setter
    @Getter
    @Column(name = "cas_number", unique = true)
    private String casNumber;

    @Setter
    @Getter
    @Column(name = "abbreviation")
    private String abbreviation;

}
