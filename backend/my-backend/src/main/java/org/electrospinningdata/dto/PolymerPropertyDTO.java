package org.electrospinningdata.dto;

import java.util.List;

public class PolymerPropertyDTO {
    private List<PolymerComponentDTO> polymerComponents;

    public List<PolymerComponentDTO> getPolymerComponents() {
        return polymerComponents;
    }

    public void setPolymerComponents(List<PolymerComponentDTO> polymerComponents) {
        this.polymerComponents = polymerComponents;
    }

}
