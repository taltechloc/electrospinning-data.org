package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

public class FiberImagesDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Setter
    @Getter
    private String imageType;
    @Setter
    @Getter
    private Map<String, Object> imageDefinition;
    @Setter
    @Getter
    private String imageData;

    public FiberImagesDTO() {
    }

}
