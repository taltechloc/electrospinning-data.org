package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


import java.util.Map;

@Entity
@Table(name = "fiber_images")
public class FiberImages {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fiber_images_id")
    private Long fiberImageId;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiments experiment;

    @Setter
    @Getter
    @Column(name = "image_type")
    private String imageType;

    @Setter
    @Getter
    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    @Setter
    @Getter
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "image_definition", columnDefinition = "json")
    private Map<String, Object> imageDefinition;

    public FiberImages() {
    }
}
