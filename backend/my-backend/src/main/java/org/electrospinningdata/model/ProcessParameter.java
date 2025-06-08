package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
public class ProcessParameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "process_parameter_id")
    private int processParameterId;

    @ManyToOne
    @JoinColumn(name = "experiment_id", referencedColumnName = "experiment_id")
    private Experiments experiment;

    private double voltage;

    @ManyToOne
    @JoinColumn(name = "voltage_unit_id", referencedColumnName = "unit_id")
    private Unit voltageUnit;

    private double flowRate;

    @ManyToOne
    @JoinColumn(name = "flow_rate_unit_id", referencedColumnName = "unit_id")
    private Unit flowRateUnit;

    private double tipCollectorDistance;

    @ManyToOne
    @JoinColumn(name = "tip_collector_distance_unit_id", referencedColumnName = "unit_id")
    private Unit tipCollectorDistanceUnit;

    private double spinningDuration;

    @ManyToOne
    @JoinColumn(name = "spinning_duration_unit_id", referencedColumnName = "unit_id")
    private Unit spinningDurationUnit;

    // Getters and Setters
    public int getProcessParameterId() {
        return processParameterId;
    }

    public void setProcessParameterId(int processParameterId) {
        this.processParameterId = processParameterId;
    }

    public Experiments getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiments experiment) {
        this.experiment = experiment;
    }

    public double getVoltage() {
        return voltage;
    }

    public void setVoltage(double voltage) {
        this.voltage = voltage;
    }

    public Unit getVoltageUnit() {
        return voltageUnit;
    }

    public void setVoltageUnit(Unit voltageUnit) {
        this.voltageUnit = voltageUnit;
    }

    public double getFlowRate() {
        return flowRate;
    }

    public void setFlowRate(double flowRate) {
        this.flowRate = flowRate;
    }

    public Unit getFlowRateUnit() {
        return flowRateUnit;
    }

    public void setFlowRateUnit(Unit flowRateUnit) {
        this.flowRateUnit = flowRateUnit;
    }

    public double getTipCollectorDistance() {
        return tipCollectorDistance;
    }

    public void setTipCollectorDistance(double tipCollectorDistance) {
        this.tipCollectorDistance = tipCollectorDistance;
    }

    public Unit getTipCollectorDistanceUnit() {
        return tipCollectorDistanceUnit;
    }

    public void setTipCollectorDistanceUnit(Unit tipCollectorDistanceUnit) {
        this.tipCollectorDistanceUnit = tipCollectorDistanceUnit;
    }

    public double getSpinningDuration() {
        return spinningDuration;
    }

    public void setSpinningDuration(double spinningDuration) {
        this.spinningDuration = spinningDuration;
    }

    public Unit getSpinningDurationUnit() {
        return spinningDurationUnit;
    }

    public void setSpinningDurationUnit(Unit spinningDurationUnit) {
        this.spinningDurationUnit = spinningDurationUnit;
    }
}
