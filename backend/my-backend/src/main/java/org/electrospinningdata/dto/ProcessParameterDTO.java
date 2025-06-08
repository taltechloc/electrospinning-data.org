package org.electrospinningdata.dto;

public class ProcessParameterDTO {
    private Double voltage;
    private String voltageUnit;
    private Double flowRate;
    private String flowRateUnit;
    private Double tipCollectorDistance;
    private String tipCollectorDistanceUnit;
    private Double spinningDuration;
    private String spinningDurationUnit;

    // Getters and Setters
    public Double getVoltage() {
        return voltage;
    }

    public void setVoltage(Double voltage) {
        this.voltage = voltage;
    }

    public String getVoltageUnit() {
        return voltageUnit;
    }

    public void setVoltageUnit(String voltageUnit) {
        this.voltageUnit = voltageUnit;
    }

    public Double getFlowRate() {
        return flowRate;
    }

    public void setFlowRate(Double flowRate) {
        this.flowRate = flowRate;
    }

    public String getFlowRateUnit() {
        return flowRateUnit;
    }

    public void setFlowRateUnit(String flowRateUnit) {
        this.flowRateUnit = flowRateUnit;
    }

    public Double getTipCollectorDistance() {
        return tipCollectorDistance;
    }

    public void setTipCollectorDistance(Double tipCollectorDistance) {
        this.tipCollectorDistance = tipCollectorDistance;
    }

    public String getTipCollectorDistanceUnit() {
        return tipCollectorDistanceUnit;
    }

    public void setTipCollectorDistanceUnit(String tipCollectorDistanceUnit) {
        this.tipCollectorDistanceUnit = tipCollectorDistanceUnit;
    }

    public Double getSpinningDuration() {
        return spinningDuration;
    }

    public void setSpinningDuration(Double spinningDuration) {
        this.spinningDuration = spinningDuration;
    }

    public String getSpinningDurationUnit() {
        return spinningDurationUnit;
    }

    public void setSpinningDurationUnit(String spinningDurationUnit) {
        this.spinningDurationUnit = spinningDurationUnit;
    }
}
