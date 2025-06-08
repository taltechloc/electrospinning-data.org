import React from "react";

export default function FiberMorphologySummary({ fiberMorphology = [] }) {
    if (!fiberMorphology.length)        return <span style={{ color: "#888" }}>Click to add fiber morphology</span>;


    // Group by category for nicer display
    const grouped = fiberMorphology.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item.label);
        return acc;
    }, {});

    return (
        <div>
            {Object.entries(grouped).map(([category, labels]) => (
                <div key={category} style={{ marginBottom: 8 }}>
                    <strong>{category}:</strong> {labels.join(", ")}
                </div>
            ))}
        </div>
    );
}
