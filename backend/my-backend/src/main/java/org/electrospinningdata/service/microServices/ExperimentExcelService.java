package org.electrospinningdata.service.microServices;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.electrospinningdata.dto.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ExperimentExcelService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public byte[] generateExcelFromExperimentData(List<ExperimentDataDTO> dataList) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Experiments");

        String[] columns = {
                "doi", "experiment_id",
                "is_polymer_blend", "polymer(s)", "polymer_components",
                "is_solvent_blend", "solvent(s)", "solvent_components",
                "solution_concentration", "solution_concentration_unit",
                "solution_viscosity", "solution_viscosity_unit",
                "solution_surface_tension", "solution_surface_tension_unit",
                "solution_conductivity", "solution_conductivity_unit",
                "solution_evaporation_rate", "solution_evaporation_rate_unit",
                "needle_type", "needle_definition",
                "collector_type", "collector_definition",
                "voltage", "voltage_unit",
                "flow_rate", "flow_rate_unit",
                "tip_collector_distance", "tip_collector_distance_unit",
                "spinning_duration", "spinning_duration_unit",
                "temperature", "temperature_unit",
                "humidity", "humidity_unit",
                "was_formation_stable",
                "fiber_diameter", "fiber_diameter_unit",
                "fiber_diameter_variation", "fiber_diameter_variation_unit",
                "morphology", "publication_title", "is_custom_device", "device_manufacturer", "device_model"
        };

        Row header = sheet.createRow(0);
        for (int i = 0; i < columns.length; i++) {
            header.createCell(i).setCellValue(columns[i]);
        }

        int rowNum = 1;
        for (ExperimentDataDTO dto : dataList) {
            Row row = sheet.createRow(rowNum++);

            setStringCell(row, 0, dto.getResearchMetadata().getDoi()); // DOI
            setNumericCell(row, 1, dto.getExperimentId());

            // Polymer blend
            List<PolymerComponentDTO> polymers = safeList(dto.getPolymerProperty(), PolymerPropertyDTO::getPolymerComponents);
            setBooleanCell(row, 2, polymers.size() > 1);
            setStringCell(row, 3, joinNames(polymers, PolymerComponentDTO::getPolymerName));
            setJsonCell(row, 4, polymers);

            // Solvent blend
            List<SolventComponentDTO> solvents = safeList(dto.getSolventProperty(), SolventPropertyDTO::getSolventComponents);
            setBooleanCell(row, 5, solvents.size() > 1);
            setStringCell(row, 6, joinNames(solvents, SolventComponentDTO::getSolventName));
            setJsonCell(row, 7, solvents);

            // Solution properties + units
            setDoubleCell(row, 8, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getConcentration));
            setStringCell(row, 9, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getConcentrationUnit));
            setDoubleCell(row, 10, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getViscosity));
            setStringCell(row, 11, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getViscosityUnit));
            setDoubleCell(row, 12, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getSurfaceTension));
            setStringCell(row, 13, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getSurfaceTensionUnit));
            setDoubleCell(row, 14, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getConductivity));
            setStringCell(row, 15, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getConductivityUnit));
            setDoubleCell(row, 16, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getEvaporationRate));
            setStringCell(row, 17, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getEvaporationRateUnit));

            // Needle
            setStringCell(row, 18, safeValue(dto.getNeedleProperty(), NeedlePropertyDTO::getNeedleType));
            setJsonCell(row, 19, safeValue(dto.getNeedleProperty(), NeedlePropertyDTO::getNeedleDefinition));


            // Collector
            setStringCell(row, 20, safeValue(dto.getCollectorProperty(), CollectorPropertyDTO::getCollectorType));
            setJsonCell(row, 21, safeValue(dto.getCollectorProperty(), CollectorPropertyDTO::getCollectorDefinition));

            // Process Parameters + units
            setDoubleCell(row, 22, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getVoltage));
            setStringCell(row, 23, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getVoltageUnit));
            setDoubleCell(row, 24, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getFlowRate));
            setStringCell(row, 25, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getFlowRateUnit));
            setDoubleCell(row, 26, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getTipCollectorDistance));
            setStringCell(row, 27, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getTipCollectorDistanceUnit));
            setDoubleCell(row, 28, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getSpinningDuration));
            setStringCell(row, 29, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getSpinningDurationUnit));

            // Ambient Parameters + units
            setDoubleCell(row, 30, safeValue(dto.getAmbientParameter(), AmbientParameterDTO::getTemperature));
            setStringCell(row, 31, safeValue(dto.getAmbientParameter(), AmbientParameterDTO::getTemperatureUnit));
            setDoubleCell(row, 32, safeValue(dto.getAmbientParameter(), AmbientParameterDTO::getHumidity));
            setStringCell(row, 33, safeValue(dto.getAmbientParameter(), AmbientParameterDTO::getHumidityUnit));

            // Fiber Properties + units
            setBooleanCell(row, 34, dto.getFiberProperty().getIsFormationStable());
            setDoubleCell(row, 35, safeValue(dto.getFiberProperty(), FiberPropertyDTO::getFiberDiameter));
            setStringCell(row, 36, safeValue(dto.getFiberProperty(), FiberPropertyDTO::getFiberDiameterUnit));
            setDoubleCell(row, 37, safeValue(dto.getFiberProperty(), FiberPropertyDTO::getFiberDiameterVariation));
            setStringCell(row, 38, safeValue(dto.getFiberProperty(), FiberPropertyDTO::getFiberDiameterVariationUnit));

            setJsonCell(row, 39, safeValue(dto.getFiberProperty(), FiberPropertyDTO::getFiberMorphology));

            setStringCell(row, 40, dto.getResearchMetadata().getPublicationTitle());
            setStringCell(row, 41, dto.getResearchMetadata().getCustomDevice());
            setStringCell(row, 42, dto.getResearchMetadata().getDeviceManufacturer());
            setStringCell(row, 43, dto.getResearchMetadata().getDeviceModel());
        }

        for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        workbook.close();
        return bos.toByteArray();
    }

    // Utility methods

    private void setDoubleCell(Row row, int col, Double value) {
        if (value != null) row.createCell(col).setCellValue(value);
    }

    private void setNumericCell(Row row, int col, Number value) {
        if (value != null) row.createCell(col).setCellValue(value.doubleValue());
    }

    private void setStringCell(Row row, int col, String value) {
        if (value != null && !value.isBlank()) row.createCell(col).setCellValue(value);
    }

    private void setBooleanCell(Row row, int col, boolean value) {
        row.createCell(col).setCellValue(value ? 1 : 0);
    }

    private void setJsonCell(Row row, int col, Object value) {
        try {
            if (value != null) {
                row.createCell(col).setCellValue(objectMapper.writeValueAsString(value));
            }
        } catch (Exception e) {
            row.createCell(col).setCellValue("JSON_ERROR");
        }
    }

    private <T, R> R safeValue(T obj, Function<T, R> getter) {
        return obj != null ? getter.apply(obj) : null;
    }

    private <P, T> List<T> safeList(P parent, Function<P, List<T>> getter) {
        if (parent != null) {
            List<T> list = getter.apply(parent);
            return list != null ? list : Collections.emptyList();
        }
        return Collections.emptyList();
    }

    private <T> String joinNames(List<T> list, Function<T, String> mapper) {
        return list.stream().map(mapper).collect(Collectors.joining("-"));
    }
}
