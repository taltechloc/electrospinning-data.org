package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

public class NeedlePropertyDTO {
    @Setter
    @Getter
    private Long needlePropertyId;
    @Setter
    @Getter
    private Long experimentId;
    @Setter
    @Getter
    private String needleType;
    @Setter
    @Getter
    private Map<String, Object> needleDefinition;
}
