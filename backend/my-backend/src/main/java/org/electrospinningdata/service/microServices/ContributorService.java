package org.electrospinningdata.service.microServices;

import org.electrospinningdata.dto.UserMetadataDTO;
import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.repository.ExperimentRepository;
import org.electrospinningdata.repository.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ContributorService {

    private final ExperimentRepository experimentRepo;
    private final UserInfoRepository userRepository;

    public ContributorService(ExperimentRepository experimentRepo, UserInfoRepository userRepository) {
        this.experimentRepo = experimentRepo;
        this.userRepository = userRepository;
    }

    public List<UserMetadataDTO> getApprovedContributors() {
        List<Experiments> approvedExperiments = experimentRepo.findByStatus(Experiments.Status.APPROVED);

        Set<String> userIds = approvedExperiments.stream()
                .map(Experiments::getUserId)
                .collect(Collectors.toSet());

        List<UserMetadataDTO> contributors = new ArrayList<>();

        for (String userId : userIds) {
            userRepository.findByUserId(userId).ifPresent(userInfo -> {
                if (Boolean.TRUE.equals(userInfo.getShowPublicly())) {
                    UserMetadataDTO dto = new UserMetadataDTO();

                    dto.setName(userInfo.getName());
                    dto.setAffiliation(userInfo.getAffiliation());
                    dto.setCountry(userInfo.getCountry());
                    dto.setLab(userInfo.getLab());
                    dto.setOrcid(userInfo.getOrcid());
                    dto.setDoi(userInfo.getDoi());
                    dto.setDeviceManufacturer(userInfo.getDeviceManufacturer());
                    dto.setDeviceModel(userInfo.getDeviceModel());
                    dto.setCustomDevice(userInfo.getCustomDevice());

                    contributors.add(dto);
                }
            });
        }
        return contributors;
    }

}
