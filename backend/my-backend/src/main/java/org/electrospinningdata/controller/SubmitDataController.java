package org.electrospinningdata.controller;


import org.electrospinningdata.dto.SubmitDataDTO;
import org.electrospinningdata.service.SubmitDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/data")
public class SubmitDataController {

    private static final Logger logger = LoggerFactory.getLogger(SubmitDataController.class);
    private final SubmitDataService dataService;

    public SubmitDataController(SubmitDataService dataService) {
        this.dataService = dataService;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitData(@RequestBody SubmitDataDTO submitDataDTO) {
        logger.info("Received data submission request.");
        String response = dataService.submitData(submitDataDTO);
        return ResponseEntity.ok(response);
    }
}
