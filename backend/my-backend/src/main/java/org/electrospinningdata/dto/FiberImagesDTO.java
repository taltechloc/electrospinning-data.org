package org.electrospinningdata.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

public class FiberImagesDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String imageType;
    private Map<String, Object> imageDefinition;
    private String imageData;

    public FiberImagesDTO() {
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public Map<String, Object> getImageDefinition() {
        return imageDefinition;
    }

    public void setImageDefinition(Map<String, Object> imageDefinition) {
        this.imageDefinition = imageDefinition;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }
}
