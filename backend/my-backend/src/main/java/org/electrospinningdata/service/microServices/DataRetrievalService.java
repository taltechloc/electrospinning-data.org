package org.electrospinningdata.service.microServices;

import org.electrospinningdata.dto.*;
import org.electrospinningdata.model.*;
import org.electrospinningdata.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class DataRetrievalService {

    @Autowired
    private ExperimentRepository experimentRepository;
    @Autowired
    private NeedlePropertiesRepository needlePropertiesRepository;
    @Autowired
    private AmbientParametersRepository ambientParametersRepository;
    @Autowired
    private FiberPropertiesRepository fiberPropertiesRepository;
    @Autowired
    private PolymerPropertiesRepository polymerPropertiesRepository;
    @Autowired
    private ProcessParametersRepository processParametersRepository;
    @Autowired
    private SolutionPropertiesRepository solutionPropertiesRepository;
    @Autowired
    private SolventPropertiesRepository solventPropertiesRepository;
    @Autowired
    private CollectorPropertyRepository collectorPropertyRepository;
    @Autowired
    private FiberMorphologyRepository fiberMorphologyRepository;
    @Autowired
    private FiberImagesRepository fiberImagesRepository;
    @Autowired
    private ResearchMetadataRepository researchMetadataRepository;

    public List<ExperimentDataDTO> getDataByExperimentIds(List<Integer> experimentIds) {
        List<ExperimentDataDTO> results = new ArrayList<>();

        for (Integer experimentId : experimentIds) {
            Optional<Experiments> experimentOpt = experimentRepository.findById(experimentId);
            if (experimentOpt.isEmpty()) {
                continue;
            }
            Experiments experiment = experimentOpt.get();

            ExperimentDataDTO experimentDataDTO = new ExperimentDataDTO();
            experimentDataDTO.setExperimentId(experiment.getExperimentId());
            experimentDataDTO.setResearchMetadata(getResearchMetadataDTO(experiment));
            experimentDataDTO.setPolymerProperty(getPolymerPropertyDTO(experiment));
            experimentDataDTO.setSolventProperty(getSolventPropertyDTO(experiment));
            experimentDataDTO.setSolutionProperty(getSolutionPropertyDTO(experiment));
            experimentDataDTO.setCollectorProperty(getCollectorPropertyDTO(experiment));
            experimentDataDTO.setNeedleProperty(getNeedlePropertyDTO(experiment));
            experimentDataDTO.setAmbientParameter(getAmbientParameterDTO(experiment));
            experimentDataDTO.setProcessParameter(getProcessParameterDTO(experiment));
            experimentDataDTO.setFiberProperty(getFiberPropertyDTO(experiment));
            addFiberImagesToDTO(experiment, experimentDataDTO);

            results.add(experimentDataDTO);
        }
        return results;
    }


    private void addFiberImagesToDTO(Experiments experiment, ExperimentDataDTO experimentDataDTO) {
        if (experiment == null || experimentDataDTO == null) return;

        List<FiberImages> fiberImagesList = fiberImagesRepository.findByExperiment(experiment);
        if (fiberImagesList == null || fiberImagesList.isEmpty()) return;

        List<FiberImagesDTO> fiberImagesDTOs = new ArrayList<>();
        for (FiberImages fiberImage : fiberImagesList) {
            if (fiberImage == null) continue;

            FiberImagesDTO fiberImagesDTO = new FiberImagesDTO();
            fiberImagesDTO.setImageType(fiberImage.getImageType());
            fiberImagesDTO.setImageDefinition(fiberImage.getImageDefinition());

            if (fiberImage.getImageData() != null) {
                String base64Image = Base64.getEncoder().encodeToString(fiberImage.getImageData());
                fiberImagesDTO.setImageData(base64Image);
            }

            fiberImagesDTOs.add(fiberImagesDTO);
        }

        experimentDataDTO.setFiberImages(fiberImagesDTOs);
    }


    private ResearchMetadataDTO getResearchMetadataDTO(Experiments experiment) {
        ResearchMetadata researchMetadata = researchMetadataRepository.findByResearchId(experiment.getResearchId());
        if (researchMetadata == null) return null;

        ResearchMetadataDTO dto = new ResearchMetadataDTO();
        dto.setPublicationTitle(researchMetadata.getPublicationTitle());
        dto.setDoi(researchMetadata.getDoi());
        dto.setCustomDevice(researchMetadata.getCustomDevice());
        dto.setDeviceManufacturer(researchMetadata.getDeviceManufacturer());
        dto.setDeviceModel(researchMetadata.getDeviceModel());

        return dto;
    }

    private NeedlePropertyDTO getNeedlePropertyDTO(Experiments experiment) {
        NeedleProperties needleProperties = needlePropertiesRepository.findByExperiment(experiment);
        if (needleProperties == null) return null;

        NeedlePropertyDTO dto = new NeedlePropertyDTO();
        dto.setNeedleType(needleProperties.getNeedleType());
        dto.setNeedleDefinition(needleProperties.getNeedleDefinition());
        return dto;
    }

    private AmbientParameterDTO getAmbientParameterDTO(Experiments experiment) {
        AmbientParameters ambientParameters = ambientParametersRepository.findByExperiments(experiment);
        if (ambientParameters == null) return null;

        AmbientParameterDTO dto = new AmbientParameterDTO();
        dto.setTemperature(ambientParameters.getTemperature());
        dto.setHumidity(ambientParameters.getHumidity());

        if (ambientParameters.getTemperatureUnit() != null) {
            dto.setTemperatureUnit(ambientParameters.getTemperatureUnit().getUnit());
        }
        if (ambientParameters.getHumidityUnit() != null) {
            dto.setHumidityUnit(ambientParameters.getHumidityUnit().getUnit());
        }
        return dto;
    }

    private FiberPropertyDTO getFiberPropertyDTO(Experiments experiment) {
        FiberProperties fiberProperties = fiberPropertiesRepository.findByExperiment(experiment);
        if (fiberProperties == null) return null;

        FiberPropertyDTO dto = new FiberPropertyDTO();
        dto.setFiberDiameter(fiberProperties.getFiberDiameter());
        dto.setFiberDiameterVariation(fiberProperties.getFiberDiameterVariation());
        dto.setProductWeight(fiberProperties.getProductWeight());
        dto.setQualityGrade(fiberProperties.getQualityGrade());

        if (fiberProperties.getFiberDiameterUnit() != null) {
            dto.setFiberDiameterUnit(fiberProperties.getFiberDiameterUnit().getUnit());
        }
        if (fiberProperties.getFiberDiameterVariationUnit() != null) {
            dto.setFiberDiameterVariationUnit(fiberProperties.getFiberDiameterVariationUnit().getUnit());
        }
        if (fiberProperties.getProductWeightUnit() != null) {
            dto.setProductWeightUnit(fiberProperties.getProductWeightUnit().getUnit());
        }

        List<FiberMorphology> morphologies = fiberMorphologyRepository.findByFiberProperty(fiberProperties);
        List<FiberMorphologyDTO> morphologyDTOs = new ArrayList<>();
        for (FiberMorphology morphology : morphologies) {
            FiberMorphologyDTO morphDto = new FiberMorphologyDTO();
            if (morphology.getMorphology() != null) {
                morphDto.setLabel(morphology.getMorphology().getLabel());
                morphDto.setCategory(morphology.getMorphology().getCategory().name());
            }
            morphologyDTOs.add(morphDto);
        }
        dto.setFiberMorphology(morphologyDTOs);

        return dto;
    }

    private PolymerPropertyDTO getPolymerPropertyDTO(Experiments experiment) {
        PolymerProperties polymerProperties = polymerPropertiesRepository.findByExperiment(experiment);
        if (polymerProperties == null) return null;

        PolymerPropertyDTO dto = new PolymerPropertyDTO();
        List<PolymerComponentDTO> componentDTOs = new ArrayList<>();
        if (polymerProperties.getPolymerComponents() != null) {
            for (PolymerComponents component : polymerProperties.getPolymerComponents()) {
                PolymerComponentDTO compDto = new PolymerComponentDTO();
                compDto.setPolymerName(component.getPolymer() != null ? component.getPolymer().getPolymerName() : null);
                compDto.setPolymerWeight(component.getPolymerWeight());
                compDto.setMolecularWeight(component.getMolecularWeight());
                compDto.setWeightRatio(component.getWeightRatio());


                if (component.getPolymerWeightUnit() != null) {
                    compDto.setPolymerWeightUnit(component.getPolymerWeightUnit().getUnit());
                }
                if (component.getMolecularWeightUnit() != null) {
                    compDto.setMolecularWeightUnit(component.getMolecularWeightUnit().getUnit());
                }
                if (component.getWeightRatioUnit() != null) {
                    compDto.setWeightRatioUnit(component.getWeightRatioUnit().getUnit());
                }
                componentDTOs.add(compDto);
            }
        }
        dto.setPolymerComponents(componentDTOs);
        return dto;
    }

    private ProcessParameterDTO getProcessParameterDTO(Experiments experiment) {
        ProcessParameter processParameter = processParametersRepository.findByExperiment(experiment);
        if (processParameter == null) return null;

        ProcessParameterDTO dto = new ProcessParameterDTO();
        dto.setVoltage(processParameter.getVoltage());
        dto.setFlowRate(processParameter.getFlowRate());
        dto.setTipCollectorDistance(processParameter.getTipCollectorDistance());
        dto.setSpinningDuration(processParameter.getSpinningDuration());

        if (processParameter.getVoltageUnit() != null) {
            dto.setVoltageUnit(processParameter.getVoltageUnit().getUnit());
        }
        if (processParameter.getFlowRateUnit() != null) {
            dto.setFlowRateUnit(processParameter.getFlowRateUnit().getUnit());
        }
        if (processParameter.getTipCollectorDistanceUnit() != null) {
            dto.setTipCollectorDistanceUnit(processParameter.getTipCollectorDistanceUnit().getUnit());
        }
        if (processParameter.getSpinningDurationUnit() != null) {
            dto.setSpinningDurationUnit(processParameter.getSpinningDurationUnit().getUnit());
        }
        return dto;
    }

    private SolutionPropertyDTO getSolutionPropertyDTO(Experiments experiment) {
        SolutionProperties solutionProperties = solutionPropertiesRepository.findByExperiment(experiment);
        if (solutionProperties == null) return null;

        SolutionPropertyDTO dto = new SolutionPropertyDTO();
        dto.setConcentration(solutionProperties.getConcentration());
        dto.setViscosity(solutionProperties.getViscosity());
        dto.setSurfaceTension(solutionProperties.getSurfaceTension());
        dto.setConductivity(solutionProperties.getConductivity());
        dto.setEvaporationRate(solutionProperties.getEvaporationRate());
        dto.setPH(solutionProperties.getPH());

        if (solutionProperties.getConductivityUnit() != null) {
            dto.setConductivityUnit(solutionProperties.getConductivityUnit().getUnit());
        }
        if (solutionProperties.getConcentrationUnit() != null) {
            dto.setConcentrationUnit(solutionProperties.getConcentrationUnit().getUnit());
        }
        if (solutionProperties.getViscosityUnit() != null) {
            dto.setViscosityUnit(solutionProperties.getViscosityUnit().getUnit());
        }
        if (solutionProperties.getSurfaceTensionUnit() != null) {
            dto.setSurfaceTensionUnit(solutionProperties.getSurfaceTensionUnit().getUnit());
        }
        if (solutionProperties.getEvaporationRateUnit() != null) {
            dto.setEvaporationRateUnit(solutionProperties.getEvaporationRateUnit().getUnit());
        }
        return dto;
    }

    private SolventPropertyDTO getSolventPropertyDTO(Experiments experiment) {
        SolventProperties solventProperties = solventPropertiesRepository.findByExperiment(experiment);
        if (solventProperties == null) return null;

        SolventPropertyDTO dto = new SolventPropertyDTO();
        List<SolventComponentDTO> componentDTOs = new ArrayList<>();
        if (solventProperties.getSolventComponents() != null) {
            for (SolventComponents component : solventProperties.getSolventComponents()) {
                SolventComponentDTO compDto = new SolventComponentDTO();
                compDto.setSolventName(component.getSolvent() != null ? component.getSolvent().getSolventName() : null);
                compDto.setWeight(component.getWeight());
                compDto.setVolumeRatio(component.getVolumeRatio());


                if (component.getWeightUnit() != null) {
                    compDto.setWeightUnit(component.getWeightUnit().getUnit());
                }
                if (component.getVolumeRatioUnit() != null) {
                    compDto.setVolumeRatioUnit(component.getVolumeRatioUnit().getUnit());
                }
                componentDTOs.add(compDto);
            }
        }
        dto.setSolventComponents(componentDTOs);
        return dto;
    }

    private CollectorPropertyDTO getCollectorPropertyDTO(Experiments experiment) {
        CollectorProperty collectorProperty = collectorPropertyRepository.findByExperiment(experiment);
        if (collectorProperty == null) return null;

        CollectorPropertyDTO dto = new CollectorPropertyDTO();
        dto.setCollectorType(collectorProperty.getCollectorType());
        dto.setCollectorDefinition(collectorProperty.getCollectorDefinition());
        return dto;
    }

    public List<Integer> getPendingSubmissionIds() {
        return experimentRepository.findPendingExperimentIds();
    }
}
