package org.electrospinningdata.model;

import jakarta.persistence.*;


@Entity
public class UserInfo {

    @Id
    @Column(name = "user_id", columnDefinition = "CHAR(36)")
    private String userId;

    private String name;
    private String email;
    private String role;
    private String lab;
    private String affiliation;
    private String country;
    private String orcid;
    private String doi;
    private String deviceManufacturer;
    protected String deviceModel;

    @Column(name = "custom_device")
    private Boolean customDevice;

    @Column(name = "show_publicly")
    private Boolean showPublicly;

    @Column(name = "consent_terms")
    private Boolean consentTerms;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLab() {
        return lab;
    }

    public void setLab(String lan) {
        this.lab = lab;
    }

    public String getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getOrcid() {
        return orcid;
    }

    public void setOrcid(String orcid) {
        this.orcid = orcid;
    }

    public String getDoi() {
        return doi;
    }

    public void setDoi(String doi) {
        this.doi = doi;
    }

    public String getDeviceManufacturer() {
        return deviceManufacturer;
    }

    public void setDeviceManufacturer(String deviceManufacturer) {
        this.deviceManufacturer = deviceManufacturer;
    }

    public String getDeviceModel() {
        return deviceModel;
    }

    public void setDeviceModel(String deviceModel) {
        this.deviceModel = deviceModel;
    }

    public Boolean getCustomDevice() {
        return customDevice;
    }

    public void setCustomDevice(Boolean customDevice) {
        this.customDevice = customDevice;
    }

    public Boolean getShowPublicly() {
        return showPublicly;
    }

    public void setShowPublicly(Boolean showPublicly) {
        this.showPublicly = showPublicly;
    }

    public Boolean getConsentTerms() {
        return consentTerms;
    }

    public void setConsentTerms(Boolean consentTerms) {
        this.consentTerms = consentTerms;
    }
}
