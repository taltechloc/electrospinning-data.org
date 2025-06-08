import React from "react";

export default function FiberImagesSummary({ fiberImages = [] }) {
    if (!fiberImages.length) {
        return <span style={{ color: "#888" }}>Click to add images</span>;
    }
    return <span>{fiberImages.length} image{fiberImages.length > 1 ? "s" : ""} uploaded, click to edit.</span>;
}
