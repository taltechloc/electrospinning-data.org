package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class PolymerPropertyDTO {
    @Setter
    @Getter
    private List<PolymerComponentDTO> polymerComponents;
}
