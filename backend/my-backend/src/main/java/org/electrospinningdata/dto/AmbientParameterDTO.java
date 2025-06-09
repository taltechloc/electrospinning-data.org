package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

public class AmbientParameterDTO {
    @Setter
    @Getter
    private Double temperature;
    @Setter
    @Getter
    private String temperatureUnit;
    @Setter
    @Getter
    private Double humidity;
    @Setter
    @Getter
    private String humidityUnit;

}
