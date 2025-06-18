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
                "doi", "experiment_id", "is_polymer_blend", "polymer(s)", "polymer_components",
                "is_solvent_blend", "solvent(s)", "solvent_components",
                "solution_concentration", "solution_viscosity", "solution_surface_tension",
                "solution_conductivity", "solution_evaporation_rate",
                "needle_type", "needle_diameter",
                "collector_type", "collector_width", "collector_height", "collector_rotation_speed",
                "voltage", "flow_rate", "tip_collector_distance", "spinning_duration",
                "temperature", "humidity", "fiber_diameter", "fiber_diameter_variation",
                "morphology"
        };

        Row header = sheet.createRow(0);
        for (int i = 0; i < columns.length; i++) {
            header.createCell(i).setCellValue(columns[i]);
        }

        int rowNum = 1;
        for (ExperimentDataDTO dto : dataList) {
            Row row = sheet.createRow(rowNum++);

            setStringCell(row, 0, dto.getDoi()); // DOI in column 0
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

            // Solution properties
            setDoubleCell(row, 8, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getConcentration));
            setDoubleCell(row, 9, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getSolutionViscosity));
            setDoubleCell(row, 10, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getSurfaceTension));
            setDoubleCell(row, 11, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getSolutionConductivity));
            setDoubleCell(row, 12, safeValue(dto.getSolutionProperty(), SolutionPropertyDTO::getEvaporationRate));

            // Needle
            setStringCell(row, 13, safeValue(dto.getNeedleProperty(), NeedlePropertyDTO::getNeedleType));

            // Collector
            setStringCell(row, 14, safeValue(dto.getCollectorProperty(), CollectorPropertyDTO::getCollectorType));

            // Process Parameters
            setDoubleCell(row, 18, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getVoltage));
            setDoubleCell(row, 19, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getFlowRate));
            setDoubleCell(row, 20, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getTipCollectorDistance));
            setDoubleCell(row, 21, safeValue(dto.getProcessParameter(), ProcessParameterDTO::getSpinningDuration));

            // Ambient Parameters
            setDoubleCell(row, 22, safeValue(dto.getAmbientParameter(), AmbientParameterDTO::getTemperature));
            setDoubleCell(row, 23, safeValue(dto.getAmbientParameter(), AmbientParameterDTO::getHumidity));

            // Fiber Properties
            setDoubleCell(row, 24, safeValue(dto.getFiberProperty(), FiberPropertyDTO::getFiberDiameter));
            setDoubleCell(row, 25, safeValue(dto.getFiberProperty(), FiberPropertyDTO::getFiberDiameterVariation));
            setJsonCell(row, 26, safeValue(dto.getFiberProperty(), FiberPropertyDTO::getFiberMorphology));
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

    private <T, R> R safeValue(T obj, java.util.function.Function<T, R> getter) {
        return obj != null ? getter.apply(obj) : null;
    }

    private <P, T> List<T> safeList(P parent, Function<P, List<T>> getter) {
        if (parent != null) {
            List<T> list = getter.apply(parent);
            return list != null ? list : Collections.emptyList();
        }
        return Collections.emptyList();
    }


    private <T> String joinNames(List<T> list, java.util.function.Function<T, String> mapper) {
        return list.stream().map(mapper).collect(Collectors.joining("-"));
    }
}
