package org.electrospinningdata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
public class UserInfo {

    @Setter
    @Getter
    @Id
    @Column(name = "user_id", columnDefinition = "CHAR(36)")
    private String userId;

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
    private String doi;

    @Setter
    @Getter
    private String deviceManufacturer;

    @Setter
    @Getter
    protected String deviceModel;

    @Setter
    @Getter
    @Column(name = "custom_device")
    private Boolean customDevice;

    @Setter
    @Getter
    @Column(name = "show_publicly")
    private Boolean showPublicly;

    @Setter
    @Getter
    @Column(name = "consent_terms")
    private Boolean consentTerms;
}
