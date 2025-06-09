package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class SolventPropertyDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Setter
    @Getter
    private List<SolventComponentDTO> solventComponents;
}
