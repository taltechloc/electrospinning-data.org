package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "research_metadata")
public class ResearchMetadata {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "research_id")
    private Integer researchId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @Setter @Getter
    private UserInfo userId;

    @Column(name = "publication_title")
    @Setter @Getter
    private String publicationTitle;

    @Setter @Getter
    private String doi;

    @Column(name = "device_manufacturer")
    @Setter @Getter
    private String deviceManufacturer;

    @Column(name = "device_model")
    @Setter @Getter
    private String deviceModel;

    @Column(name = "custom_device")
    @Setter @Getter
    private String customDevice;

}
