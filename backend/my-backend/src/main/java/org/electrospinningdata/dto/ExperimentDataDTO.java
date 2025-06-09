package org.electrospinningdata.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class ExperimentDataDTO {
    @Setter
    @Getter
    private Integer experimentId;
    @Setter
    @Getter
    private PolymerPropertyDTO polymerProperty;
    @Setter
    @Getter
    private NeedlePropertyDTO needleProperty;
    @Setter
    @Getter
    private SolventPropertyDTO solventProperty;
    @Setter
    @Getter
    private FiberPropertyDTO fiberProperty;
    @Setter
    @Getter
    private SolutionPropertyDTO solutionProperty;
    @Setter
    @Getter
    private AmbientParameterDTO ambientParameter;
    @Setter
    @Getter
    private ProcessParameterDTO processParameter;
    @Setter
    @Getter
    private CollectorPropertyDTO collectorProperty;
    @Setter
    @Getter
    private List<FiberImagesDTO> fiberImages;
    @Setter
    @Getter
    private String Doi;


}
