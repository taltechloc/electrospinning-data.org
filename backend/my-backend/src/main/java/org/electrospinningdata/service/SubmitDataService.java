package org.electrospinningdata.service;

import org.electrospinningdata.dto.*;
import org.electrospinningdata.model.*;
import org.electrospinningdata.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SubmitDataService {

    @Autowired
    private UserInfoRepository userRepository;

    @Autowired
    private ExperimentRepository experimentRepository;

    @Autowired
    private NeedlePropertiesRepository needlePropertiesRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private DataSubmissionRepository dataSubmissionRepository;

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
    private PolymerRepository polymerRepository;

    @Autowired
    private SolventRepository solventRepository;

    @Autowired
    private FiberMorphologyRepository fiberMorphologyRepository;

    @Autowired
    private MorphologyRepository morphologyRepository;

    @Autowired
    private FiberImagesRepository fiberImagesRepository;

    public String submitData(SubmitDataDTO submitDataDTO) {
        if (submitDataDTO == null || submitDataDTO.getUserMetadata() == null) {
            throw new IllegalArgumentException("SubmitDataDTO or userMetadata cannot be null");
        }

        UserInfo userInfo = createUser(submitDataDTO.getUserMetadata());

        DataSubmission dataSubmission = new DataSubmission();
        dataSubmission.setUserInfo(userInfo);
        dataSubmissionRepository.save(dataSubmission);

        List<ExperimentDataDTO> experimentDataList = submitDataDTO.getExperimentData();
        if (experimentDataList != null) {
            for (ExperimentDataDTO experimentData : experimentDataList) {
                if (experimentData == null) continue;

                Experiments experiment = createExperiment(userInfo.getUserId(), experimentData);

                if (experiment != null) {
                    experiment.setSubmission(dataSubmission);
                    experimentRepository.save(experiment);

                    savePolymerProperties(experiment, experimentData);
                    saveSolventProperties(experiment, experimentData);
                    saveSolutionProperties(experiment, experimentData);
                    saveNeedleProperties(experiment, experimentData);
                    saveCollectorProperty(experiment, experimentData);
                    saveAmbientParameters(experiment, experimentData);
                    saveProcessParameters(experiment, experimentData);
                    saveFiberProperties(experiment, experimentData);
                    saveFiberImages(experiment, experimentData);
                }
            }
        }

        return "Data submitted successfully";
    }

    private UserInfo createUser(UserMetadataDTO userMetadata) {
        if (userMetadata == null) return null;

        Optional<UserInfo> existingUserOpt = Optional.empty();
        if (userMetadata.getEmail() != null) {
            existingUserOpt = userRepository.findByEmail(userMetadata.getEmail());
        }

        if (existingUserOpt.isPresent()) {
            return existingUserOpt.get();
        }

        String userId = UUID.randomUUID().toString();

        UserInfo userInfo = new UserInfo();
        userInfo.setUserId(userId);
        if (userMetadata.getName() != null) userInfo.setName(userMetadata.getName());
        if (userMetadata.getEmail() != null) userInfo.setEmail(userMetadata.getEmail());
        if (userMetadata.getRole() != null) userInfo.setRole(userMetadata.getRole());
        if (userMetadata.getLab() != null) userInfo.setLab(userMetadata.getLab());
        if (userMetadata.getAffiliation() != null) userInfo.setAffiliation(userMetadata.getAffiliation());
        if (userMetadata.getCountry() != null) userInfo.setCountry(userMetadata.getCountry());
        if (userMetadata.getOrcid() != null) userInfo.setOrcid(userMetadata.getOrcid());
        if (userMetadata.getDoi() != null) userInfo.setDoi(userMetadata.getDoi());
        if (userMetadata.getDeviceManufacturer() != null) userInfo.setDeviceManufacturer(userMetadata.getDeviceManufacturer());
        if (userMetadata.getDeviceModel() != null) userInfo.setDeviceModel(userMetadata.getDeviceModel());
        if (userMetadata.getCustomDevice() != null) userInfo.setCustomDevice(userMetadata.getCustomDevice());
        if (userMetadata.getShowPublicly() != null) userInfo.setShowPublicly(userMetadata.getShowPublicly());
        if (userMetadata.getConsentTerms() != null) userInfo.setConsentTerms(userMetadata.getConsentTerms());

        userRepository.save(userInfo);
        return userInfo;
    }

    private Experiments createExperiment(String userId, ExperimentDataDTO experimentData) {
        if (experimentData == null) return null;
        Experiments experiment = new Experiments();
        if (userId != null) experiment.setUserId(userId);

        return experimentRepository.save(experiment);
    }

    public void saveFiberImages(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null || experimentData.getFiberImages() == null) return;

        for (FiberImagesDTO fiberImageDTO : experimentData.getFiberImages()) {
            if (fiberImageDTO == null) continue;

            FiberImages fiberImage = new FiberImages();
            fiberImage.setExperiment(experiment);
            if (fiberImageDTO.getImageType() != null) fiberImage.setImageType(fiberImageDTO.getImageType());
            if (fiberImageDTO.getImageDefinition() != null) fiberImage.setImageDefinition(fiberImageDTO.getImageDefinition());

            if (fiberImageDTO.getImageData() != null) {
                try {
                    byte[] binaryImage = Base64.getDecoder().decode(fiberImageDTO.getImageData());
                    fiberImage.setImageData(binaryImage);
                } catch (IllegalArgumentException e) {
                    // Log or handle bad Base64 data if needed
                }
            }

            fiberImagesRepository.save(fiberImage);
        }
    }

    private void saveNeedleProperties(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null) return;

        NeedlePropertyDTO needlePropertyDTO = experimentData.getNeedleProperty();
        if (needlePropertyDTO == null) return;

        NeedleProperties needleProperties = new NeedleProperties();
        needleProperties.setExperiment(experiment);

        if (needlePropertyDTO.getNeedleType() != null) {
            needleProperties.setNeedleType(needlePropertyDTO.getNeedleType());
        }

        if (needlePropertyDTO.getNeedleDefinition() != null) {
            needleProperties.setCollectorDefinition(needlePropertyDTO.getNeedleDefinition());
        }

        needlePropertiesRepository.save(needleProperties);
    }

    private void saveAmbientParameters(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null) return;

        AmbientParameterDTO ambientParameterDTO = experimentData.getAmbientParameter();
        if (ambientParameterDTO == null) return;

        AmbientParameters ambientParameters = new AmbientParameters();
        ambientParameters.setExperiments(experiment);

        if (ambientParameterDTO.getTemperature() != null) {
            ambientParameters.setTemperature(ambientParameterDTO.getTemperature());
        }
        if (ambientParameterDTO.getHumidity() != null) {
            ambientParameters.setHumidity(ambientParameterDTO.getHumidity());
        }

        if (ambientParameterDTO.getTemperatureUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(ambientParameterDTO.getTemperatureUnit());
            if (unitOpt != null) ambientParameters.setTemperatureUnit(unitOpt);
        }

        if (ambientParameterDTO.getHumidityUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(ambientParameterDTO.getHumidityUnit());
            if (unitOpt != null) ambientParameters.setHumidityUnit(unitOpt);
        }

        ambientParametersRepository.save(ambientParameters);
    }

    private void saveFiberProperties(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null) return;

        FiberPropertyDTO fiberPropertyDTO = experimentData.getFiberProperty();
        if (fiberPropertyDTO == null) return;

        FiberProperties fiberProperties = new FiberProperties();
        fiberProperties.setExperiment(experiment);

        if (fiberPropertyDTO.getIsFormationStable() != null) {
            fiberProperties.setIsFormationStable(fiberPropertyDTO.getIsFormationStable());
        }

        if (fiberPropertyDTO.getFiberDiameter() != null) {
            fiberProperties.setFiberDiameter(fiberPropertyDTO.getFiberDiameter());
        }

        if (fiberPropertyDTO.getFiberDiameterVariation() != null) {
            fiberProperties.setFiberDiameterVariation(fiberPropertyDTO.getFiberDiameterVariation());
        }

        if (fiberPropertyDTO.getFiberDiameterUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(fiberPropertyDTO.getFiberDiameterUnit());
            if (unitOpt != null) fiberProperties.setFiberDiameterUnit(unitOpt);
        }

        if (fiberPropertyDTO.getFiberDiameterVariationUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(fiberPropertyDTO.getFiberDiameterVariationUnit());
            if (unitOpt != null) fiberProperties.setFiberDiameterVariationUnit(unitOpt);
        }

        if (fiberPropertyDTO.getProductWeight() != null) {
            fiberProperties.setProductWeight(fiberPropertyDTO.getProductWeight());
            fiberProperties.setQualityGrade(100.0);
        }

        if (fiberPropertyDTO.getProductWeightUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(fiberPropertyDTO.getProductWeightUnit());
            if (unitOpt != null) fiberProperties.setProductWeightUnit(unitOpt);
        }

        if (fiberPropertyDTO.getFiberMorphology() != null) {
            for (FiberMorphologyDTO fiberMorphologyDTO : fiberPropertyDTO.getFiberMorphology()) {
                if (fiberMorphologyDTO == null) continue;

                FiberMorphology fiberMorphology = new FiberMorphology();
                fiberMorphology.setFiberProperty(fiberProperties);

                if (fiberMorphologyDTO.getLabel() != null && fiberMorphologyDTO.getCategory() != null) {
                    try {
                        Morphology.category categoryEnum = Morphology.category.valueOf(fiberMorphologyDTO.getCategory());
                        Morphology morphology = morphologyRepository.findByLabelAndCategory(fiberMorphologyDTO.getLabel(), categoryEnum);
                        if (morphology != null) {
                            fiberMorphology.setMorphology(morphology);
                        }
                    } catch (IllegalArgumentException ignored) {
                        // Invalid category enum, handle if needed
                    }
                }

                fiberProperties.addMorphology(fiberMorphology);
            }
        }

        fiberPropertiesRepository.save(fiberProperties);
    }

    private void savePolymerProperties(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null) return;

        PolymerPropertyDTO polymerPropertyDTO = experimentData.getPolymerProperty();
        if (polymerPropertyDTO == null) return;

        PolymerProperties polymerProperties = new PolymerProperties();
        polymerProperties.setExperiment(experiment);

        if (polymerPropertyDTO.getPolymerComponents() != null) {
            for (PolymerComponentDTO polymerComponentDTO : polymerPropertyDTO.getPolymerComponents()) {
                if (polymerComponentDTO == null) continue;

                PolymerComponents polymerComponent = new PolymerComponents();

                Polymer polymer = null;
                if (polymerComponentDTO.getPolymerName() != null) {
                    polymer = polymerRepository.findByPolymerName(polymerComponentDTO.getPolymerName()).orElse(null);
                }

                polymerComponent.setPolymer(polymer);

                if (polymerComponentDTO.getPolymerWeight() != null) {
                    polymerComponent.setPolymerWeight(polymerComponentDTO.getPolymerWeight());
                }
                if (polymerComponentDTO.getMolecularWeight() != null) {
                    polymerComponent.setMolecularWeight(polymerComponentDTO.getMolecularWeight());
                }

                if (polymerComponentDTO.getWeightRatio() != null) {
                    polymerComponent.setWeightRatio(polymerComponentDTO.getWeightRatio());
                }
                if (polymerComponentDTO.getPolymerWeightUnit() != null) {
                    Unit unit = unitRepository.findByUnit(polymerComponentDTO.getPolymerWeightUnit());
                    if (unit != null) polymerComponent.setPolymerWeightUnit(unit);
                }
                if (polymerComponentDTO.getMolecularWeightUnit() != null) {
                    Unit unit = unitRepository.findByUnit(polymerComponentDTO.getMolecularWeightUnit());
                    if (unit != null) polymerComponent.setMolecularWeightUnit(unit);
                }

                if (polymerComponentDTO.getWeightRatioUnit() != null) {
                    Unit unit = unitRepository.findByUnit(polymerComponentDTO.getWeightRatioUnit());
                    if (unit != null) polymerComponent.setWeightRatioUnit(unit);
                }

                polymerProperties.addComponent(polymerComponent);
            }
        }
        polymerPropertiesRepository.save(polymerProperties);
    }

    private void saveProcessParameters(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null) return;

        ProcessParameterDTO processParameterDTO = experimentData.getProcessParameter();
        if (processParameterDTO == null) return;

        ProcessParameter processParameter = new ProcessParameter();
        processParameter.setExperiment(experiment);

        if (processParameterDTO.getVoltage() != null) {
            processParameter.setVoltage(processParameterDTO.getVoltage());
        }
        if (processParameterDTO.getFlowRate() != null) {
            processParameter.setFlowRate(processParameterDTO.getFlowRate());
        }
        if (processParameterDTO.getTipCollectorDistance() != null) {
            processParameter.setTipCollectorDistance(processParameterDTO.getTipCollectorDistance());
        }
        if (processParameterDTO.getSpinningDuration() != null) {
            processParameter.setSpinningDuration(processParameterDTO.getSpinningDuration());
        }

        if (processParameterDTO.getVoltageUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(processParameterDTO.getVoltageUnit());
            if (unitOpt != null) processParameter.setVoltageUnit(unitOpt);
        }
        if (processParameterDTO.getFlowRateUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(processParameterDTO.getFlowRateUnit());
            if (unitOpt != null) processParameter.setFlowRateUnit(unitOpt);
        }
        if (processParameterDTO.getTipCollectorDistanceUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(processParameterDTO.getTipCollectorDistanceUnit());
            if (unitOpt != null) processParameter.setTipCollectorDistanceUnit(unitOpt);
        }
        if (processParameterDTO.getSpinningDurationUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(processParameterDTO.getSpinningDurationUnit());
            if (unitOpt != null) processParameter.setSpinningDurationUnit(unitOpt);
        }

        processParametersRepository.save(processParameter);
    }

    private void saveSolutionProperties(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null) return;

        SolutionPropertyDTO solutionPropertyDTO = experimentData.getSolutionProperty();
        if (solutionPropertyDTO == null) return;

        SolutionProperties solutionProperties = new SolutionProperties();
        solutionProperties.setExperiment(experiment);

        if (solutionPropertyDTO.getConcentration() != null) {
            solutionProperties.setConcentration(solutionPropertyDTO.getConcentration());
        }
        if (solutionPropertyDTO.getViscosity() != null) {
            solutionProperties.setViscosity(solutionPropertyDTO.getViscosity());
        }
        if (solutionPropertyDTO.getSurfaceTension() != null) {
            solutionProperties.setSurfaceTension(solutionPropertyDTO.getSurfaceTension());
        }
        if (solutionPropertyDTO.getConductivity() != null) {
            solutionProperties.setConductivity(solutionPropertyDTO.getConductivity());
        }
        if (solutionPropertyDTO.getEvaporationRate() != null) {
            solutionProperties.setEvaporationRate(solutionPropertyDTO.getEvaporationRate());
        }
        if (solutionPropertyDTO.getPH() != null) {
            solutionProperties.setPH(solutionPropertyDTO.getPH());
        }

        if (solutionPropertyDTO.getConductivityUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(solutionPropertyDTO.getConductivityUnit());
            if (unitOpt != null) solutionProperties.setConductivityUnit(unitOpt);
        }
        if (solutionPropertyDTO.getConcentrationUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(solutionPropertyDTO.getConcentrationUnit());
            if (unitOpt != null) solutionProperties.setConcentrationUnit(unitOpt);
        }
        if (solutionPropertyDTO.getViscosityUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(solutionPropertyDTO.getViscosityUnit());
            if (unitOpt != null) solutionProperties.setViscosityUnit(unitOpt);
        }
        if (solutionPropertyDTO.getSurfaceTensionUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(solutionPropertyDTO.getSurfaceTensionUnit());
            if (unitOpt != null) solutionProperties.setSurfaceTensionUnit(unitOpt);
        }
        if (solutionPropertyDTO.getEvaporationRateUnit() != null) {
            Unit unitOpt = unitRepository.findByUnit(solutionPropertyDTO.getEvaporationRateUnit());
            if (unitOpt != null) solutionProperties.setEvaporationRateUnit(unitOpt);
        }

        solutionPropertiesRepository.save(solutionProperties);
    }

    private void saveSolventProperties(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null) return;

        SolventPropertyDTO solventPropertyDTO = experimentData.getSolventProperty();
        if (solventPropertyDTO == null) return;

        SolventProperties solventProperties = new SolventProperties();
        solventProperties.setExperiment(experiment);

        if (solventPropertyDTO.getSolventComponents() != null) {
            for (SolventComponentDTO solventComponentDTO : solventPropertyDTO.getSolventComponents()) {
                if (solventComponentDTO == null) continue;

                SolventComponents solventComponent = new SolventComponents();

                if (solventComponentDTO.getSolventName() != null) {
                    Optional<Solvent> solventOpt = solventRepository.findBySolventName(solventComponentDTO.getSolventName());
                    solventOpt.ifPresent(solventComponent::setSolvent);
                }

                if (solventComponentDTO.getWeight() != null) {
                    solventComponent.setWeight(solventComponentDTO.getWeight());
                }

                if (solventComponentDTO.getVolumeRatio() != null) {
                    solventComponent.setVolumeRatio(solventComponentDTO.getVolumeRatio());
                }

                if (solventComponentDTO.getWeightUnit() != null) {
                    Unit unitOpt = unitRepository.findByUnit(solventComponentDTO.getWeightUnit());
                    if (unitOpt != null) solventComponent.setWeightUnit(unitOpt);
                }

                if (solventComponentDTO.getVolumeRatioUnit() != null) {
                    Unit unitOpt = unitRepository.findByUnit(solventComponentDTO.getVolumeRatioUnit());
                    if (unitOpt != null) solventComponent.setVolumeRatioUnit(unitOpt);
                }

                solventProperties.addComponent(solventComponent);
            }
        }

        solventPropertiesRepository.save(solventProperties);
    }

    private void saveCollectorProperty(Experiments experiment, ExperimentDataDTO experimentData) {
        if (experiment == null || experimentData == null) return;

        CollectorPropertyDTO collectorPropertiesDTO = experimentData.getCollectorProperty();
        if (collectorPropertiesDTO == null) return;

        CollectorProperty collectorProperty = new CollectorProperty();
        collectorProperty.setExperiment(experiment);

        if (collectorPropertiesDTO.getCollectorType() != null) {
            collectorProperty.setCollectorType(collectorPropertiesDTO.getCollectorType());
        }

        if (collectorPropertiesDTO.getCollectorDefinition() != null) {
            collectorProperty.setCollectorDefinition(collectorPropertiesDTO.getCollectorDefinition());
        }

        collectorPropertyRepository.save(collectorProperty);
    }
}
