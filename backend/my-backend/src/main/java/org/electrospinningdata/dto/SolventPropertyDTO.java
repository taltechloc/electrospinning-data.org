package org.electrospinningdata.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class SolventPropertyDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private List<SolventComponentDTO> solventComponents;

    public List<SolventComponentDTO> getSolventComponents() {
        return solventComponents;
    }


    public void setSolventComponents(List<SolventComponentDTO> solventComponentDTOs) {
        this.solventComponents=solventComponentDTOs;
    }
}
