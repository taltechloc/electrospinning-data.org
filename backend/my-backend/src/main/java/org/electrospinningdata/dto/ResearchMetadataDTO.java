package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;


public class ResearchMetadataDTO {

    @Setter @Getter
    private String researchId;

    @Setter @Getter
    private String userId;

    @Setter @Getter
    private String publicationTitle;

    @Setter @Getter
    private String doi;

    @Setter @Getter
    private String deviceManufacturer;

    @Setter @Getter
    private String deviceModel;

    @Setter @Getter
    private String customDevice;

}
