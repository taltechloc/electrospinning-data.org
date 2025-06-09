package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class ProcessParameter {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "process_parameter_id")
    private int processParameterId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "experiment_id", referencedColumnName = "experiment_id")
    private Experiments experiment;

    @Setter
    @Getter
    private double voltage;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "voltage_unit_id", referencedColumnName = "unit_id")
    private Unit voltageUnit;

    @Setter
    @Getter
    private double flowRate;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "flow_rate_unit_id", referencedColumnName = "unit_id")
    private Unit flowRateUnit;

    @Setter
    @Getter
    private double tipCollectorDistance;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "tip_collector_distance_unit_id", referencedColumnName = "unit_id")
    private Unit tipCollectorDistanceUnit;

    @Setter
    @Getter
    private double spinningDuration;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "spinning_duration_unit_id", referencedColumnName = "unit_id")
    private Unit spinningDurationUnit;

}
