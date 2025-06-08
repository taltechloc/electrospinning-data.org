package org.electrospinningdata.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "needle_properties")
public class NeedleProperties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "needle_property_id")
    private Long needlePropertyId;

    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Column(name = "needle_type", length = 50)
    private String needleType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "needle_definition", columnDefinition = "json")
    private Map<String, Object> needleDefinition;


    public NeedleProperties() {}

    // Getters and setters

    public Long getNeedlePropertyId() {
        return needlePropertyId;
    }

    public void setNeedlePropertyId(Long needlePropertyId) {
        this.needlePropertyId = needlePropertyId;
    }

    public Experiments getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiments experiment) {
        this.experiment = experiment;
    }

    public String getNeedleType() {
        return needleType;
    }

    public void setNeedleType(String needleType) {
        this.needleType = needleType;
    }

    public Map<String, Object> getNeedleDefinition() {
        return needleDefinition;
    }

    public void setCollectorDefinition(Map<String, Object> needleDefinition) {
        this.needleDefinition = needleDefinition;
    }
}

