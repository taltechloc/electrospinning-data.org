import React from "react";

export default function SolventSummary({ solvents = [] }) {
    if (!solvents.length) {
        return <span style={{ color: "#888" }}>Click to add solvents</span>;
    }

    return (
        <div>
            {solvents.map((p, i) => {
                const hasAnyValue = p.solventName || p.weight || p.volumeRatio;

                if (!hasAnyValue) return null;

                return (
                    <div key={i} style={{ marginBottom: "1em" }}>
                        {p.solventName && (
                            <div><strong>Solvent:</strong> {p.solventName}</div>
                        )}
                        {p.weight && (
                            <div><strong>Weight:</strong> {p.weight} {p.weightUnit || "gram"}</div>
                        )}
                        {solvents.length > 1 && p.volumeRatio !== undefined && (
                            <div>
                                <strong>Volume Ratio:</strong> {p.volumeRatio} {p.volumeRatioUnit || "v/v"}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
