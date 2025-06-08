package org.electrospinningdata.controller;

import org.electrospinningdata.service.DatasetCacheService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/export/cache")
public class DatasetCacheController {

    private final DatasetCacheService datasetCacheService;

    public DatasetCacheController(DatasetCacheService datasetCacheService) {
        this.datasetCacheService = datasetCacheService;
    }

    @PostMapping("/generate-excel")
    public ResponseEntity<String> generateExcel() {
        try {
            String path = datasetCacheService.generateExcelToCache();
            if (path == null) {
                return ResponseEntity.status(500).body("No data to generate Excel.");
            }
            return ResponseEntity.ok("Excel file generated successfully at: " + path);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to generate Excel file: " + e.getMessage());
        }
    }

    @PostMapping("/generate-json")
    public ResponseEntity<String> generateJson() {
        try {
            String path = datasetCacheService.generateJsonToCache();
            if (path == null) {
                return ResponseEntity.status(500).body("No data to generate JSON.");
            }
            return ResponseEntity.ok("JSON file generated successfully at: " + path);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to generate JSON file: " + e.getMessage());
        }
    }

    @PostMapping("/invalidate-cache")
    public ResponseEntity<String> invalidateCache() {
        try {
            datasetCacheService.invalidateCache();
            return ResponseEntity.ok("Dataset cache invalidated.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to invalidate cache: " + e.getMessage());
        }
    }

    @PostMapping("/refresh-cache")
    public ResponseEntity<String> refreshCache() {
        try {
            datasetCacheService.refreshCache();
            return ResponseEntity.ok("Dataset cache refreshed.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to refresh cache: " + e.getMessage());
        }
    }
}
