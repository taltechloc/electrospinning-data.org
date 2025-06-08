import React from "react";

export default function CollectorSummary({ collector }) {
    if (!collector || !collector.collectorType) {
        return <span style={{ color: "#888" }}>Click to add Collector</span>;
    }

    const { collectorType, collectorDefinition = {} } = collector;

    const isValidValue = (val) => {
        if (val === null || val === undefined || val === "") return false;
        if (typeof val === "number" && isNaN(val)) return false;
        return true;
    };

    const labelWithUnits = {
        height: "Height (cm)",
        width: "Width (cm)",
        diameter: "Diameter (cm)",
        length: "Length (cm)",
        rotationSpeed: "Rotation Speed (rpm)",
        electrodeGap: "Electrode Gap (cm)",
        wireDiameter: "Wire Diameter (mm)",
        wireLength: "Wire Length (cm)",
        bathDepth: "Bath Depth (cm)",
        bathDiameter: "Bath Diameter (cm)",
        fieldStrength: "Field Strength (kV/m)",
        plateDistance: "Plate Distance (cm)",
        material: "Material",
    };

    const formattedEntries = Object.entries(collectorDefinition)
        .filter(([_, value]) => isValidValue(value))
        .map(([key, value]) => {
            const label = labelWithUnits[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
            return { key, label, value };
        });

    return (
        <div>
            <div style={{ marginBottom: 6 }}>
                <strong>Type:</strong> {collectorType}
            </div>
            {formattedEntries.map(({ key, label, value }) => (
                <div key={key} style={{ marginBottom: 6 }}>
                    <strong>{label}:</strong> {value.toString()}
                </div>
            ))}
        </div>
    );
}
