import React from "react";

export default function NeedleSummary({ needleProperty }) {
    if (
        needleProperty &&
        Object.keys(needleProperty).length === 0 &&
        needleProperty.constructor === Object
    ) {
        return <span style={{ color: "#888" }}>Click to add Needle</span>;
    }

    const { needleType, needleDefinition = {} } = needleProperty;

    const renderField = (label, value, unit = "") => {
        if (value === null || value === "" || typeof value === "undefined") return null;
        return (
            <div key={label}>
                <strong>{label}:</strong> {value} {unit}
            </div>
        );
    };

    return (
        <div>
            {renderField("Type", needleType)}

            {/* Type-specific fields */}
            {needleType === "Single Needle" &&
                renderField("Diameter", needleDefinition.diameter, needleDefinition.diameterUnit)}

            {needleType === "Coaxial" && (
                <>
                    {renderField("Inner Diameter", needleDefinition.innerDiameter)}
                    {renderField("Outer Diameter", needleDefinition.outerDiameter)}
                </>
            )}

            {needleType === "Triaxial" && (
                <>
                    {renderField("Inner Diameter", needleDefinition.innerDiameter)}
                    {renderField("Middle Diameter", needleDefinition.middleDiameter)}
                    {renderField("Outer Diameter", needleDefinition.outerDiameter)}
                </>
            )}

            {needleType === "Needle Array" && (
                <>
                    {renderField("Number of Needles", needleDefinition.numNeedles)}
                    {renderField("Needle Spacing", needleDefinition.needleSpacing, "mm")}
                    {renderField("Needle Type in Array", needleDefinition.needleType)}
                    {/* Render relevant inner type fields if available */}
                    {needleDefinition.needleType === "Single Needle" &&
                        renderField("Inner Needle Diameter", needleDefinition.diameter, needleDefinition.diameterUnit)}
                    {needleDefinition.needleType === "coaxial" && (
                        <>
                            {renderField("Inner Needle Inner Diameter", needleDefinition.innerDiameter)}
                            {renderField("Inner Needle Outer Diameter", needleDefinition.outerDiameter)}
                        </>
                    )}
                </>
            )}

            {needleType === "Needleless" &&
                renderField("Surface Type", needleDefinition.surfaceType)}

            {renderField("Material", needleDefinition.material)}
        </div>
    );
}
