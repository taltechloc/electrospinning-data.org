package org.electrospinningdata.service;

import jakarta.transaction.Transactional;
import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.Experiments.Status;
import org.electrospinningdata.repository.ExperimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModerationService {

    private final ExperimentRepository experimentRepository;


    @Autowired
    public ModerationService(ExperimentRepository experimentRepository) {
        this.experimentRepository = experimentRepository;
    }

    public List<Experiments> getAllPendingSubmissions() {
        return experimentRepository.findByStatus(Status.PENDING);
    }

    public List<Experiments> getAllByStatus(Status status) {
        return experimentRepository.findByStatus(status);
    }

    public Optional<Experiments> getById(Integer id) {
        return experimentRepository.findById(id);
    }

    @Transactional
    public boolean approveSubmission(Integer id, String moderatorComment) {
        Optional<Experiments> optionalData = experimentRepository.findById(id);
        if (optionalData.isPresent()) {
            Experiments data = optionalData.get();
            data.setStatus(Experiments.Status.APPROVED);
            experimentRepository.save(data);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean rejectSubmission(Integer id, String moderatorComment) {
        Optional<Experiments> optionalData = experimentRepository.findById(id);
        if (optionalData.isPresent()) {
            Experiments data = optionalData.get();
            data.setStatus(Status.REJECTED);
            experimentRepository.save(data);
            return true;
        }
        return false;
    }


    @Transactional
    public boolean approveAllPendingSubmissions(String moderatorComment) {
        List<Experiments> pendingSubmissions = experimentRepository.findByStatus(Status.PENDING);
        boolean allApproved = true;
        for (Experiments exp : pendingSubmissions) {
            boolean success = approveSubmission(exp.getExperimentId(), moderatorComment);
            if (!success) {
                allApproved = false;
            }
        }
        return allApproved;
    }

    @Transactional
    public boolean rejectAllPendingSubmissions(String moderatorComment) {
        List<Experiments> pendingSubmissions = experimentRepository.findByStatus(Status.PENDING);
        boolean allRejected = true;
        for (Experiments exp : pendingSubmissions) {
            boolean success = rejectSubmission(exp.getExperimentId(), moderatorComment);
            if (!success) {
                allRejected = false;
            }
        }
        return allRejected;
    }
}
