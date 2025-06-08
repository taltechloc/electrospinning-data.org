package org.electrospinningdata.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ambient_parameters")
public class AmbientParameters {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Automatically generates an ID for the entity
    @Column(name = "id")
    private Long id;  // Add an ID field as the primary key


    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiments;

    @Column(name = "temperature")
    private Double temperature;

    @ManyToOne
    @JoinColumn(name = "temperature_unit_id")
    private Unit temperatureUnit;

    @Column(name = "humidity")
    private Double humidity;

    @ManyToOne
    @JoinColumn(name = "humidity_unit_id")
    private Unit humidityUnit;

    public AmbientParameters() {}

    public AmbientParameters(Experiments experimentId, Double temperature, Unit temperatureUnit,
                             Double humidity, Unit humidityUnit) {
        this.experiments = experimentId;
        this.temperature = temperature;
        this.temperatureUnit = temperatureUnit;
        this.humidity = humidity;
        this.humidityUnit = humidityUnit;
    }

    public Experiments getExperiments() {
        return experiments;
    }

    public void setExperiments(Experiments experiments) {
        this.experiments = experiments;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Unit getTemperatureUnit() {
        return temperatureUnit;
    }

    public void setTemperatureUnit(Unit temperatureUnit) {
        this.temperatureUnit = temperatureUnit;
    }

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }

    public Unit getHumidityUnit() {
        return humidityUnit;
    }

    public void setHumidityUnit(Unit humidityUnit) {
        this.humidityUnit = humidityUnit;
    }
}
