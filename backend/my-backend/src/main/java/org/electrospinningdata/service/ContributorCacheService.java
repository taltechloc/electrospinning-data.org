package org.electrospinningdata.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.electrospinningdata.dto.UserMetadataDTO;
import org.electrospinningdata.service.microServices.ContributorService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class ContributorCacheService {

    private static final String CACHE_PATH = "/var/cache/electrospin/contributors.json";

    private final ContributorService contributorService;
    private final ObjectMapper objectMapper;

    public ContributorCacheService(ContributorService contributorService, ObjectMapper objectMapper) {
        this.contributorService = contributorService;
        this.objectMapper = objectMapper;
    }

    public void generateContributorsToCache() throws IOException {
        List<UserMetadataDTO> contributors = contributorService.getApprovedContributors();
        if (contributors == null || contributors.isEmpty()) {
            return;
        }

        Path path = Paths.get(CACHE_PATH);
        Files.createDirectories(path.getParent());

        byte[] jsonBytes = objectMapper.writeValueAsBytes(contributors);
        Files.write(path, jsonBytes, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

    }

    public byte[] getContributorsFromCache() throws IOException {
        Path path = Paths.get(CACHE_PATH);
        if (!Files.exists(path)) {
            return null;
        }
        return Files.readAllBytes(path);
    }

    public void invalidateContributorsCache() throws IOException {
        Path path = Paths.get(CACHE_PATH);
        Files.deleteIfExists(path);
    }

    public void refreshContributorsCache() throws IOException {
        invalidateContributorsCache();
        generateContributorsToCache();
    }
}
