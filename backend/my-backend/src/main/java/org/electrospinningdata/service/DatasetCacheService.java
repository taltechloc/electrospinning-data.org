package org.electrospinningdata.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.electrospinningdata.dto.ExperimentDataDTO;
import org.electrospinningdata.repository.ExperimentRepository;
import org.electrospinningdata.service.microServices.DataRetrievalService;
import org.electrospinningdata.service.microServices.ExperimentExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class DatasetCacheService {

    private static final Path EXCEL_CACHE_PATH = Paths.get("/var/cache/electrospin/dataset.xlsx");
    private static final Path JSON_CACHE_PATH = Paths.get("/var/cache/electrospin/dataset.json");

    @Autowired
    private DataRetrievalService dataRetrievalService;

    @Autowired
    private ExperimentRepository experimentRepository;

    @Autowired
    private ExperimentExcelService experimentExcelService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    // --- Get cached Excel file bytes ---
    public byte[] getExcelFromCache() throws IOException {
        if (!Files.exists(EXCEL_CACHE_PATH)) {
            return null;
        }
        return Files.readAllBytes(EXCEL_CACHE_PATH);
    }

    // --- Get cached JSON file bytes ---
    public byte[] getJsonFromCache() throws IOException {
        if (!Files.exists(JSON_CACHE_PATH)) {
            return null;
        }
        return Files.readAllBytes(JSON_CACHE_PATH);
    }

    // --- Generate Excel file and save to cache ---
    public String generateExcelToCache() throws IOException {
        List<Integer> experimentIds = experimentRepository.findAllApprovedExperimentIds();
        if (experimentIds == null || experimentIds.isEmpty()) {
            return null;
        }

        List<ExperimentDataDTO> dataList = dataRetrievalService.getDataByExperimentIds(experimentIds);
        byte[] excelBytes = experimentExcelService.generateExcelFromExperimentData(dataList);

        Files.createDirectories(EXCEL_CACHE_PATH.getParent());
        Files.write(EXCEL_CACHE_PATH, excelBytes);

        return EXCEL_CACHE_PATH.toString();
    }

    // --- Generate JSON file and save to cache ---
    public String generateJsonToCache() throws IOException {
        List<Integer> experimentIds = experimentRepository.findAllApprovedExperimentIds();
        if (experimentIds == null || experimentIds.isEmpty()) {
            return null;
        }

        List<ExperimentDataDTO> dataList = dataRetrievalService.getDataByExperimentIds(experimentIds);
        String json = objectMapper.writeValueAsString(dataList);

        Files.createDirectories(JSON_CACHE_PATH.getParent());
        Files.write(JSON_CACHE_PATH, json.getBytes());

        return json;
    }

    // --- Invalidate cache by deleting cache files ---
    public void invalidateCache() {
        try {
            if (Files.exists(EXCEL_CACHE_PATH)) {
                Files.delete(EXCEL_CACHE_PATH);
            }
            if (Files.exists(JSON_CACHE_PATH)) {
                Files.delete(JSON_CACHE_PATH);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to invalidate cache files", e);
        }
    }

    public void refreshCache() {
        try {
            invalidateCache();
            generateExcelToCache();
            generateJsonToCache();
        } catch (IOException e) {
            throw new RuntimeException("Failed to refresh cache", e);
        }
    }

}
