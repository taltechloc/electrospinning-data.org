package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

public class UserMetadataDTO {
    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private String email;
    @Setter
    @Getter
    private String role;
    @Setter
    @Getter
    private String lab;
    @Setter
    @Getter
    private String affiliation;
    @Setter
    @Getter
    private String country;
    @Setter
    @Getter
    private String orcid;
    @Setter
    @Getter
    private Boolean showPublicly;
    @Setter
    @Getter
    private Boolean consentTerms;
}
