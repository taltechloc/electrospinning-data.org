package org.electrospinningdata.controller;

import org.electrospinningdata.service.DatasetCacheService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/cache/download")
public class DatasetDownloadController {

    private final DatasetCacheService datasetCacheService;

    public DatasetDownloadController(DatasetCacheService datasetCacheService) {
        this.datasetCacheService = datasetCacheService;
    }

    @GetMapping("/excel")
    public ResponseEntity<byte[]> downloadExcel() {
        try {
            byte[] data = datasetCacheService.getExcelFromCache();
            if (data == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=dataset.xlsx")
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(data);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/json")
    public ResponseEntity<byte[]> downloadJson() {
        try {
            byte[] data = datasetCacheService.getJsonFromCache();
            if (data == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=dataset.json")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(data);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
}
