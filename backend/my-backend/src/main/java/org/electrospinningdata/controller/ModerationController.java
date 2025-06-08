package org.electrospinningdata.controller;

import org.electrospinningdata.dto.ExperimentDataDTO;
import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.Experiments.Status;
import org.electrospinningdata.service.microServices.DataRetrievalService;
import org.electrospinningdata.service.ModerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moderation")
public class ModerationController {

    private final ModerationService moderationService;
    private final DataRetrievalService dataRetrievalJsonService;

    @Autowired
    public ModerationController(ModerationService moderationService,
                                DataRetrievalService dataRetrievalJsonService) {
        this.moderationService = moderationService;
        this.dataRetrievalJsonService = dataRetrievalJsonService;
    }

    @GetMapping("/pending_ids")
    public ResponseEntity<List<Integer>> getPendingSubmissionIds() {
        List<Integer> pendingIds = dataRetrievalJsonService.getPendingSubmissionIds();
        if (pendingIds == null || pendingIds.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pendingIds);
    }

    @GetMapping("/pending_submissions")
    public ResponseEntity<List<ExperimentDataDTO>> getAllPendingSubmissions() {
        List<Integer> pendingIds = dataRetrievalJsonService.getPendingSubmissionIds();
        if (pendingIds == null || pendingIds.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<ExperimentDataDTO> experimentDataList = dataRetrievalJsonService.getDataByExperimentIds(pendingIds);
        if (experimentDataList == null || experimentDataList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(experimentDataList);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Experiments>> getByStatus(@PathVariable Status status) {
        List<Experiments> experiments = moderationService.getAllByStatus(status);
        if (experiments == null || experiments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(experiments);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<String> approveSubmission(@PathVariable Integer id,
                                                    @RequestParam(required = false) String comment) {
        boolean success = moderationService.approveSubmission(id, comment);
        if (success) {
            return ResponseEntity.ok("Submission approved.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<String> rejectSubmission(@PathVariable Integer id,
                                                   @RequestParam(required = false) String comment) {
        boolean success = moderationService.rejectSubmission(id, comment);
        if (success) {
            return ResponseEntity.ok("Submission rejected.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/approve_all")
    public ResponseEntity<String> approveAllPendingSubmissions(@RequestParam(required = false) String comment) {
        List<Integer> pendingIds = dataRetrievalJsonService.getPendingSubmissionIds();
        if (pendingIds == null || pendingIds.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        boolean allApproved = true;
        for (Integer id : pendingIds) {
            boolean success = moderationService.approveSubmission(id, comment);
            if (!success) {
                allApproved = false;
            }
        }

        if (allApproved) {
            return ResponseEntity.ok("All pending submissions approved.");
        } else {
            return ResponseEntity.status(207).body("Some submissions could not be approved.");
        }
    }

    @PostMapping("/reject_all")
    public ResponseEntity<String> rejectAllPendingSubmissions(@RequestParam(required = false) String comment) {
        List<Integer> pendingIds = dataRetrievalJsonService.getPendingSubmissionIds();
        if (pendingIds == null || pendingIds.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        boolean allRejected = true;
        for (Integer id : pendingIds) {
            boolean success = moderationService.rejectSubmission(id, comment);
            if (!success) {
                allRejected = false;
            }
        }

        if (allRejected) {
            return ResponseEntity.ok("All pending submissions rejected.");
        } else {
            return ResponseEntity.status(207).body("Some submissions could not be rejected.");
        }
    }
}
