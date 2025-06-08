import React from "react";

export default function PolymerSummary({ polymers = [] }) {
    if (!polymers.length) {
        return <span style={{ color: "#888" }}>Click to add polymers</span>;
    }

    return (
        <div>
            {polymers.map((p, i) => {
                const hasAnyValue = p.polymerName || p.polymerWeight || p.molecularWeight || p.weightRatio;

                if (!hasAnyValue) return null;

                return (
                    <div key={i} style={{ marginBottom: "1em" }}>
                        {p.polymerName && (
                            <div><strong>Polymer:</strong> {p.polymerName}</div>
                        )}
                        {p.polymerWeight !== null && p.polymerWeight !== "" && (
                            <div><strong>Weight:</strong> {p.polymerWeight} {p.polymerWeightUnit || "gram"}</div>
                        )}
                        {p.molecularWeight !== null && p.molecularWeight !== "" && (
                            <div><strong>Molecular Weight:</strong> {p.molecularWeight} {p.molecularWeightUnit || "kDa"}</div>
                        )}
                        {p.weightRatio !== null && p.weightRatio !== "" && (
                            <div><strong>Weight Ratio:</strong> {p.weightRatio} {p.weightRatioUnit || "wt%"}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
