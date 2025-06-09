package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "collector_properties")
public class CollectorProperty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collector_id")
    private Long collectorId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Setter
    @Getter
    @Column(name = "collector_type")
    private String collectorType;

    @Setter
    @Getter
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "collector_definition", columnDefinition = "json")
    private Map<String, Object> collectorDefinition;

    // Constructors
    public CollectorProperty() {}


}
