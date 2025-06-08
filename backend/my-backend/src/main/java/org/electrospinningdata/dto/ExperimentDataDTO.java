package org.electrospinningdata.dto;

import java.util.List;

public class ExperimentDataDTO {
    private Integer experimentId;
    private PolymerPropertyDTO polymerProperty;
    private NeedlePropertyDTO needleProperty;
    private SolventPropertyDTO solventProperty;
    private FiberPropertyDTO fiberProperty;
    private SolutionPropertyDTO solutionProperty;
    private AmbientParameterDTO ambientParameter;
    private ProcessParameterDTO processParameter;
    private CollectorPropertyDTO collectorProperty;
    private List<FiberImagesDTO> fiberImages;


    public Integer getExperimentId() {
        return experimentId;
    }

    public void setExperimentId(Integer experimentId) {
        this.experimentId = experimentId;
    }

    public PolymerPropertyDTO getPolymerProperty() {
        return polymerProperty;
    }

    public void setPolymerProperty(PolymerPropertyDTO polymerProperties) {
        this.polymerProperty = polymerProperties;
    }

    public NeedlePropertyDTO getNeedleProperty() {
        return needleProperty;
    }

    public void setNeedleProperty(NeedlePropertyDTO needleProperties) {
        this.needleProperty = needleProperties;
    }

    public SolventPropertyDTO getSolventProperty() {
        return solventProperty;
    }

    public void setSolventProperty(SolventPropertyDTO solventProperties) {
        this.solventProperty = solventProperties;
    }

    public FiberPropertyDTO getFiberProperty() {
        return fiberProperty;
    }

    public void setFiberProperty(FiberPropertyDTO fiberProperties) {
        this.fiberProperty = fiberProperties;
    }

    public SolutionPropertyDTO getSolutionProperty() {
        return solutionProperty;
    }

    public void setSolutionProperty(SolutionPropertyDTO solutionProperties) {
        this.solutionProperty = solutionProperties;
    }

    public AmbientParameterDTO getAmbientParameter() {
        return ambientParameter;
    }

    public void setAmbientParameter(AmbientParameterDTO ambientParameters) {
        this.ambientParameter = ambientParameters;
    }

    public ProcessParameterDTO getProcessParameter() {
        return processParameter;
    }

    public void setProcessParameter(ProcessParameterDTO processParameters) {
        this.processParameter = processParameters;
    }


    public CollectorPropertyDTO getCollectorProperty() {
        return collectorProperty;
    }

    public void setCollectorProperty(CollectorPropertyDTO collectorProperty) {
        this.collectorProperty = collectorProperty;
    }
    public List<FiberImagesDTO> getFiberImages() {
        return fiberImages;
    }

    public void setFiberImages(List<FiberImagesDTO> fiberImages) {
        this.fiberImages = fiberImages;
    }
}
