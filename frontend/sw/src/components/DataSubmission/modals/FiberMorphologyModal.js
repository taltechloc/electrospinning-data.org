import React, { useState } from "react";
import {useModalKeyboardHandlers} from "../../useModalKeyboardHandlers";

export const fiberMorphologyModal = {
    Structure: [
        { abbreviation: "P", label: "Porous", img: "/images/fiber/structure/structure_porous.png" },
        { abbreviation: "GR", label: "Granular", img: "/images/fiber/structure/structure_granular.png" },
        { abbreviation: "DR", label: "Droplet", img: "/images/fiber/structure/structure_droplet.png" },
        { abbreviation: "NP", label: "Nano-pillar", img: "/images/fiber/structure/structure_nano_pillar.png" },
    ],
    Topography: [
        { abbreviation: "RD", label: "Random", img: "/images/fiber/topography/topography_random.png" },
        { abbreviation: "AL", label: "Aligned", img: "/images/fiber/topography/topography_aligned.png" },
        { abbreviation: "NE", label: "Networked", img: "/images/fiber/topography/topography_networked.png" },
    ],
    Texture: [
        { abbreviation: "SM", label: "Smooth", img: "/images/fiber/texture/texture_smooth.png" },
        { abbreviation: "RF", label: "Rough", img: "/images/fiber/texture/texture_rough.png" },
    ],
    Shape: [
        { abbreviation: "CY", label: "Cylinder", img: "/images/fiber/shape/shape_cylinder.png" },
        { abbreviation: "RI", label: "Ribbon", img: "/images/fiber/shape/shape_ribbon.png" },
        { abbreviation: "HO", label: "Hollow", img: "/images/fiber/shape/shape_hollow.png" },
        { abbreviation: "2HO", label: "Double Hollow", img: "/images/fiber/shape/shape_double_hollow.png" },
        { abbreviation: "HE", label: "Helical", img: "/images/fiber/shape/shape_helical.png" },
        { abbreviation: "SPH", label: "Sphere", img: "/images/fiber/shape/shape_sphere.png" },
    ],
    Composition: [
        { abbreviation: "NP", label: "Nano-particle", img: "/images/fiber/composition/composition_nano_particle.png" },
        { abbreviation: "NR", label: "Nano-rod", img: "/images/fiber/composition/composition_nano_rod.png" },
        { abbreviation: "BI_CSH", label: "Core-sheath", img: "/images/fiber/composition/composition_core_sheath.png" },
        { abbreviation: "BI_SS", label: "Side-by-side", img: "/images/fiber/composition/composition_side_by_side.png" },
        { abbreviation: "BI_PW", label: "Pie-wedge", img: "/images/fiber/composition/composition_pie_wedge.png" },
        { abbreviation: "BI_IS", label: "Island-in-a-sea", img: "/images/fiber/composition/composition_island_in_a_sea.png" },

    ],
    Defects: [
        { abbreviation: "BD", label: "Bead", img: "/images/fiber/defect/defect_bead.png" },
        { abbreviation: "FR", label: "Fracture", img: "/images/fiber/defect/defect_fracture.png" },
        { abbreviation: "FU", label: "Fusion", img: "/images/fiber/defect/defect_fusion.png" },
        { abbreviation: "WR", label: "Wrinkle", img: "/images/fiber/defect/defect_wrinkle.png" },
        { abbreviation: "IC", label: "Interconnectivity", img: "/images/fiber/defect/defect_interconnectivity.png" },
        { abbreviation: "NUN", label: "Non-uniform", img: "/images/fiber/defect/defect_non_uniform.png" },
        { abbreviation: "UND", label: "uneven-distribution", img: "/images/fiber/defect/defect_uneven_distribution.png" },
        { abbreviation: "CONT", label: "Contamination", img: "/images/fiber/defect/defect_contamination.png" },

    ],
};


export default function FiberMorphologyModal({ initialSelection = {}, onClose, onSave }) {
    const [selected, setSelected] = useState(initialSelection);

    const toggleSelection = (category, abbreviation) => {
        setSelected((prev) => {
            const prevSelected = prev[category] || [];
            if (prevSelected.includes(abbreviation)) {
                return {
                    ...prev,
                    [category]: prevSelected.filter((x) => x !== abbreviation),
                };
            } else {
                return {
                    ...prev,
                    [category]: [...prevSelected, abbreviation],
                };
            }
        });
    };

    useModalKeyboardHandlers({
        onClose,
        onSave: () => onSave(selected),
        dependencies: [selected],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(selected);
        onClose();
    };


    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                padding: 16,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    width: 900,          // increased width
                    maxHeight: "90vh",   // increased height
                    overflowY: "auto",
                    padding: 24,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                }}
            >
                <h2 id="modal-title" style={{ margin: 0 }}>
                    Select Fiber Morphology Types
                </h2>

                {Object.entries(fiberMorphologyModal).map(([category, types]) => (
                    <section key={category}>
                        <h3
                            style={{
                                borderBottom: "1px solid #ddd",
                                paddingBottom: 6,
                                marginBottom: 12,
                                fontWeight: "600",
                            }}
                        >
                            {category}
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                gap: 16,
                                flexWrap: "wrap",
                            }}
                        >
                            {types.map(({ abbreviation, label, img }) => {
                                const isSelected = selected[category]?.includes(abbreviation);
                                return (
                                    <label
                                        key={abbreviation}
                                        style={{
                                            border: isSelected ? "2px solid #007bff" : "1px solid #ccc",
                                            borderRadius: 6,
                                            padding: 8,
                                            width: 140,           // wider for bigger images
                                            cursor: "pointer",
                                            textAlign: "center",
                                            userSelect: "none",
                                            boxShadow: isSelected ? "0 0 8px #007bff" : "none",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected || false}
                                            onChange={() => toggleSelection(category, abbreviation)}
                                            style={{ display: "none" }}
                                        />
                                        <img
                                            src={img}
                                            alt={label}
                                            style={{ width: "100%", height: 140, objectFit: "contain", marginBottom: 8 }} // bigger images
                                        />
                                        <div style={{ fontSize: 16 }}>{label}</div> {/* bigger text */}
                                    </label>
                                );
                            })}
                        </div>
                    </section>
                ))}

                <div style={{ textAlign: "right", marginTop: 12 }}>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            marginRight: 12,
                            backgroundColor: "#eee",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontWeight: "500",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
