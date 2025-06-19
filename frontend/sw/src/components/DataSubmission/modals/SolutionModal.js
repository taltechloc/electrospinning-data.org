import React, { useState } from "react";
import { useModalKeyboardHandlers } from "../../useModalKeyboardHandlers";
import {
    overlayStyle,
    formStyle,
    labelStyle,
    inputStyle,
    selectStyle,
    buttonRowStyle,
    cancelButtonStyle,
    saveButtonStyle,
} from "../../../styles/modals/SolutionModalStyle";

// const concentrationUnits = ["%", "wt%", "vol%", "mg/mL", "g/mL", "g/L"];
const concentrationUnits = ["wt%"];
// const viscosityUnits = ["cP", "mPa·s"];
const viscosityUnits = ["cP"];
// const surfaceTensionUnits = ["mN/m", "dyne/cm"];
const surfaceTensionUnits = ["mN/m"];
// const conductivityUnits = ["mS/cm", "µS/cm"];
const conductivityUnits = ["mS/cm"];
// const evaporationRateUnits = ["mg/cm²/hr", "mg/cm²/min"];
const evaporationRateUnits = ["mg/cm²/hr"];

function createEmptySolution() {
    return {
        concentration: null,       // null instead of ""
        concentrationUnit: "wt%",
        viscosity: null,
        viscosityUnit: "cP",
        surfaceTension: null,
        surfaceTensionUnit: "mN/m",
        conductivity: null,
        conductivityUnit: "mS/cm",
        evaporationRate: null,
        evaporationRateUnit: "mg/cm2/hr",
        PH: null,
    };
}

export default function SolutionModal({ solution, onClose, onSave }) {
    // Ensure that incoming solution values are numbers or null
    const initialSolutionData = solution
        ? {
            ...solution,
            concentration: solution.concentration !== "" ? Number(solution.concentration) : null,
            viscosity: solution.viscosity !== "" ? Number(solution.viscosity) : null,
            surfaceTension: solution.surfaceTension !== "" ? Number(solution.surfaceTension) : null,
            conductivity: solution.conductivity !== "" ? Number(solution.conductivity) : null,
            evaporationRate: solution.evaporationRate !== "" ? Number(solution.evaporationRate) : null,
            PH: solution.PH !== "" ? Number(solution.PH) : null,
        }
        : createEmptySolution();

    const [solutionData, setSolutionData] = useState(initialSolutionData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // For number inputs convert value to number or null (if empty)
        const newValue =
            type === "number"
                ? value === ""
                    ? null
                    : Number(value)
                : value;

        setSolutionData((prev) => ({ ...prev, [name]: newValue }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (solutionData.concentration === null || solutionData.concentration <= 0) {
            newErrors.concentration = "Concentration must be a positive number";
        }

        if (
            solutionData.PH !== null &&
            (isNaN(solutionData.PH) || solutionData.PH < 0 || solutionData.PH > 14)
        ) {
            newErrors.PH = "PH must be between 0 and 14";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(solutionData);
            onClose();
        }
    };

    useModalKeyboardHandlers({
        onClose,
        onSave: () => onSave(solutionData),
        dependencies: [solutionData],
    });

    const renderField = (label, name, unitKey, unitOptions, required = false) => (
        <label style={labelStyle}>
            <span>
                {label}
                {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
            </span>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <input
                    type="number"
                    step="any"
                    name={name}
                    value={solutionData[name]}
                    onChange={handleChange}
                    required={required}
                    style={{ ...inputStyle, flex: 1 }}
                    placeholder={`Enter ${label.toLowerCase()}`}
                />
                <select
                    name={unitKey}
                    value={solutionData[unitKey]}
                    onChange={handleChange}
                    style={{ ...selectStyle, width: 100 }}
                >
                    {unitOptions.map((unit) => (
                        <option key={unit} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>
            {errors[name] && <div style={{ color: "red", marginTop: 4 }}>{errors[name]}</div>}
        </label>
    );

    return (
        <div style={overlayStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h3 style={{ margin: 0, fontWeight: "600", fontSize: 20 }}>Solution Properties</h3>

                {renderField("Concentration", "concentration", "concentrationUnit", concentrationUnits, true)}
                {renderField("Viscosity", "viscosity", "viscosityUnit", viscosityUnits)}
                {renderField("Surface Tension", "surfaceTension", "surfaceTensionUnit", surfaceTensionUnits)}
                {renderField("Conductivity", "conductivity", "conductivityUnit", conductivityUnits)}
                {renderField("Evaporation Rate", "evaporationRate", "evaporationRateUnit", evaporationRateUnits)}

                {/* pH Field */}
                <label style={labelStyle}>
                    <span>PH:</span>
                    <input
                        type="number"
                        step="any"
                        min="0"
                        max="14"
                        name="PH"
                        value={solutionData.PH}
                        onChange={handleChange}
                        style={{ ...inputStyle, marginTop: 6 }}
                        placeholder="Enter pH"
                    />
                    {errors.PH && <div style={{ color: "red", marginTop: 4 }}>{errors.PH}</div>}
                </label>

                <div style={buttonRowStyle}>
                    <button type="button" onClick={onClose} style={cancelButtonStyle}>
                        Cancel
                    </button>
                    <button type="submit" style={saveButtonStyle}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
