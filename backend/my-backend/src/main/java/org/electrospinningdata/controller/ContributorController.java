package org.electrospinningdata.controller;

import org.electrospinningdata.service.ContributorCacheService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/contributors")
public class ContributorController {

    private final ContributorCacheService contributorCacheService;

    public ContributorController(ContributorCacheService contributorCacheService) {
        this.contributorCacheService = contributorCacheService;
    }

    @GetMapping("/list")
    public ResponseEntity<byte[]> getContributorsList() {
        try {
            byte[] data = contributorCacheService.getContributorsFromCache();
            if (data == null) {
                return ResponseEntity.status(404).body(null);
            }
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=contributors.json")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(data);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/cache/refresh")
    public ResponseEntity<String> refreshContributorsCache() {
        try {
            contributorCacheService.refreshContributorsCache();
            return ResponseEntity.ok("Contributors cache refreshed.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to refresh cache: " + e.getMessage());
        }
    }
}
