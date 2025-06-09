package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "needle_properties")
public class NeedleProperties {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "needle_property_id")
    private Long needlePropertyId;

    @Setter
    @Getter
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Setter
    @Getter
    @Column(name = "needle_type", length = 50)
    private String needleType;

    @Setter
    @Getter
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "needle_definition", columnDefinition = "json")
    private Map<String, Object> needleDefinition;


    public NeedleProperties() {}

}

