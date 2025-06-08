package org.electrospinningdata.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


import java.util.Map;

@Entity
@Table(name = "fiber_images")
public class FiberImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fiber_images_id")
    private Long fiberImageId;

    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Column(name = "image_type")
    private String imageType;

    // For raw binary image data (the actual image bytes)
    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    // For image metadata stored as JSON (e.g., zoom, accVoltage, etc.)
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "image_definition", columnDefinition = "json")
    private Map<String, Object> imageDefinition;

    public FiberImages() {
    }

    public Long getFiberImageId() {
        return fiberImageId;
    }

    public void setFiberImageId(Long fiberImageId) {
        this.fiberImageId = fiberImageId;
    }

    public Experiments getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiments experiment) {
        this.experiment = experiment;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public Map<String, Object> getImageDefinition() {
        return imageDefinition;
    }

    public void setImageDefinition(Map<String, Object> imageDefinition) {
        this.imageDefinition = imageDefinition;
    }
}
