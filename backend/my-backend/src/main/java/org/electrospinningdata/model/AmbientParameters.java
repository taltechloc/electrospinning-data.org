package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ambient_parameters")
public class AmbientParameters {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Automatically generates an ID for the entity
    @Column(name = "id")
    private Long id;  // Add an ID field as the primary key

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiments;

    @Setter
    @Getter
    @Column(name = "temperature")
    private Double temperature;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "temperature_unit_id")
    private Unit temperatureUnit;

    @Setter
    @Getter
    @Column(name = "humidity")
    private Double humidity;


    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "humidity_unit_id")
    private Unit humidityUnit;

    public AmbientParameters() {
    }

    public AmbientParameters(Experiments experimentId, Double temperature, Unit temperatureUnit,
                             Double humidity, Unit humidityUnit) {
        this.experiments = experimentId;
        this.temperature = temperature;
        this.temperatureUnit = temperatureUnit;
        this.humidity = humidity;
        this.humidityUnit = humidityUnit;
    }

}
