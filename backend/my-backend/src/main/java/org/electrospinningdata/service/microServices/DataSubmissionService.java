package org.electrospinningdata.service.microServices;

import org.electrospinningdata.repository.ExperimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataSubmissionService {

    @Autowired
    private ExperimentRepository experimentRepository;

    public List<Integer> getApprovedExperimentIds() {
        return experimentRepository.findAllApprovedExperimentIds();
    }
}
