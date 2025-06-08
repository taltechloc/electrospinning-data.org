import React from "react";

export default function SolutionSummary({ solutionProperty }) {
    if (!solutionProperty) {
        return <span style={{ color: "#888" }}>Click to add Solution</span>;
    }

    // Define a friendly label map if desired (optional)
    const labelMap = {
        concentration: "Concentration",
        viscosity: "Viscosity",
        surfaceTension: "Surface Tension",
        conductivity: "Conductivity",
        evaporationRate: "Evaporation Rate",
        PH: "pH",
    };

    // Filter out fields that are null/empty or unit-only
    const entries = Object.entries(solutionProperty).filter(
        ([key, value]) =>
            !key.toLowerCase().endsWith("unit") &&
            value !== null &&
            value !== ""
    );

    if (entries.length === 0) {
        return <span style={{ color: "#888" }}>No solution data</span>;
    }

    return (
        <>
            {entries.map(([key, value]) => {
                const unitKey = `${key}Unit`;
                const unit = key === "PH" ? "" : (solutionProperty[unitKey] || "");
                const label = labelMap[key] || key;

                return (
                    <div key={key}>
                        <strong>{label}:</strong> {value} {unit}
                    </div>
                );
            })}
        </>
    );
}
