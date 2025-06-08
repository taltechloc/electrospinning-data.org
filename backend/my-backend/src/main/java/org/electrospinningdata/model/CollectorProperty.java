package org.electrospinningdata.model;

import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Column(name = "collector_type")
    private String collectorType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "collector_definition", columnDefinition = "json")
    private Map<String, Object> collectorDefinition;

    // Constructors
    public CollectorProperty() {}


    public Experiments getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiments experiment) {
        this.experiment = experiment;
    }

    public String getCollectorType() {
        return collectorType;
    }

    public void setCollectorType(String collectorType) {
        this.collectorType = collectorType;
    }

    public Map<String, Object> getCollectorDefinition() {
        return collectorDefinition;
    }

    public void setCollectorDefinition(Map<String, Object> collectorDefinition) {
        this.collectorDefinition = collectorDefinition;
    }
}
