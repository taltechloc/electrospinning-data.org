import React, { useState } from "react";
import { useModalKeyboardHandlers } from "../../useModalKeyboardHandlers";
import {
    overlayStyle,
    modalStyle,
    headerStyle,
    labelStyle,
    inlineLabelStyle,
    inputStyle,
    selectStyle,
    errorTextStyle,
    buttonCancelStyle,
    buttonSaveStyle,
} from "../../../styles/modals/CollectorModalStyle";

import { DropDown } from "../../DropDown";
const collectorTypes = [
    { label: "-- Select Type --", value: "" },
    { label: "Flat", value: "Flat" },
    { label: "Rotating Drum", value: "Rotating Drum" },
    { label: "Rotating Mandrel", value: "Rotating Mandrel" },
    { label: "Parallel Electrodes", value: "Parallel Electrodes" },
    { label: "Wire", value: "Wire" },
    { label: "Liquid Bath", value: "Liquid Bath" },
    { label: "Electrostatic Field", value: "Electrostatic Field" },
];

const materials = [
    { label: "Aluminum" },
    { label: "Stainless Steel" },
    { label: "Copper" },
    { label: "Brass" },
    { label: "Nickel" },
    { label: "Tungsten" },
    { label: "Carbon-Coated Surface" },
    { label: "Glass" },
    { label: "Glass (ITO Coated)" },
    { label: "Plastic (Non-Conductive)" },
    { label: "Polypropylene" },
    { label: "PET Film" },
    { label: "Teflon-Coated Metal" },
    { label: "Silicone Tubing" },
    { label: "Copper Wire" },
    { label: "Stainless Steel Wire" },
    { label: "Nickel Wire" },
    { label: "Tungsten Wire" },
    { label: "Neodymium Magnet" },
    { label: "Acrylic (for housing or insulation)" }
];


const defaultCollector = {
    collectorType: "",
    collectorDefinition: {}
};



export default function CollectorModal({ collector = {}, onClose, onSave }) {
    const [localCollector, setLocalCollector] = useState({
        ...defaultCollector,
        ...collector,
        collectorDefinition: {
            ...defaultCollector.collectorDefinition,
            ...(collector?.collectorDefinition || {}),
        },
    });


    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (name === "collectorType") {
            setLocalCollector((prev) => ({
                ...prev,
                collectorType: value,
                collectorDefinition: {},
            }));
            setErrors({});
            return;
        }
        setLocalCollector((prev) => ({
            ...prev,
            collectorDefinition: {
                ...prev.collectorDefinition,
                [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
            },
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };
    const validate = () => {
        const newErrors = {};

        if (!localCollector.collectorType  || localCollector.collectorType==="-- Select Type --" ) {
            newErrors.collectorType = "Collector type is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSave = () => {
        if (validate()) {
            const { collectorType, collectorDefinition } = localCollector;

            const convertNumber = (val) => (val === "" ? null : Number(val));

            let cleanedDefinition = {
                material: collectorDefinition.material || "",
            };

            switch (collectorType) {
                case "Flat":
                    cleanedDefinition = {
                        ...cleanedDefinition,
                        height: convertNumber(collectorDefinition.height),
                        width: convertNumber(collectorDefinition.width),
                    };
                    break;

                case "Rotating Drum":
                case "Rotating Mandrel":
                    cleanedDefinition = {
                        ...cleanedDefinition,
                        diameter: convertNumber(collectorDefinition.diameter),
                        length: convertNumber(collectorDefinition.length),
                        rotationSpeed: convertNumber(collectorDefinition.rotationSpeed),
                    };
                    break;

                case "Parallel Electrodes":
                    cleanedDefinition = {
                        ...cleanedDefinition,
                        electrodeGap: convertNumber(collectorDefinition.electrodeGap),
                    };
                    break;

                case "Wire":
                    cleanedDefinition = {
                        ...cleanedDefinition,
                        wireDiameter: convertNumber(collectorDefinition.wireDiameter),
                        wireLength: convertNumber(collectorDefinition.wireLength),
                    };
                    break;

                case "Liquid Bath":
                    cleanedDefinition = {
                        ...cleanedDefinition,
                        bathDepth: convertNumber(collectorDefinition.bathDepth),
                        bathDiameter: convertNumber(collectorDefinition.bathDiameter),
                    };
                    break;

                case "Electrostatic Field":
                    cleanedDefinition = {
                        ...cleanedDefinition,
                        fieldStrength: convertNumber(collectorDefinition.fieldStrength),
                        plateDistance: convertNumber(collectorDefinition.plateDistance),
                    };
                    break;
            }

            onSave({
                collectorType,
                collectorDefinition: cleanedDefinition,
            });
            onClose();
        }
    };

    useModalKeyboardHandlers({
        onClose,
        onSave: handleSave,
        dependencies: [localCollector],
    });

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h3 style={headerStyle}>Edit Collector Properties</h3>

                {/* Collector Type */}
                <label style={labelStyle}>
                    Collector Type:
                    <DropDown
                        name="collectorType"
                        value={localCollector.collectorType}
                        onChange={handleChange}
                        options={collectorTypes}
                        style={{ ...selectStyle, width: "100%", marginTop: 6 }}
                        placeholder="Select Type"
                        required
                    />
                    {errors.collectorType && <div style={errorTextStyle}>{errors.collectorType}</div>}
                </label>
                {/* FLAT Collector */}
                {localCollector.collectorType === "Flat" && (
                    <>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 60 }}>Height:</span>
                            <input
                                name="height"
                                value={localCollector.collectorDefinition.height ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Height"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>cm</span>
                        </label>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 60 }}>Width:</span>
                            <input
                                name="width"
                                value={localCollector.collectorDefinition.width ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Width"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>cm</span>
                        </label>
                    </>
                )}

                {/* ROTATING Drum or Mandrel */}
                {["Rotating Drum", "Rotating Mandrel"].includes(localCollector.collectorType) && (
                    <>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 80 }}>Diameter:</span>
                            <input
                                name="diameter"
                                value={localCollector.collectorDefinition.diameter ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Diameter"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>cm</span>
                        </label>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 60 }}>Length:</span>
                            <input
                                name="length"
                                value={localCollector.collectorDefinition.length ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Length"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>cm</span>
                        </label>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 120 }}>Rotation Speed:</span>
                            <input
                                name="rotationSpeed"
                                value={localCollector.collectorDefinition.rotationSpeed ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Speed"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>rpm</span>
                        </label>
                    </>
                )}

                {/* PARALLEL ELECTRODES */}
                {localCollector.collectorType === "Parallel Electrodes" && (
                    <label style={inlineLabelStyle}>
                        <span style={{ minWidth: 110 }}>Electrode Gap:</span>
                        <input
                            name="electrodeGap"
                            value={localCollector.collectorDefinition.electrodeGap ?? ""}
                            onChange={handleChange}
                            type="number"
                            placeholder="Gap"
                            style={{ ...inputStyle, flexGrow: 1 }}
                        />
                        <span style={{ marginLeft: 8 }}>cm</span>
                    </label>
                )}

                {/* WIRE */}
                {localCollector.collectorType === "Wire" && (
                    <>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 100 }}>Wire Diameter:</span>
                            <input
                                name="wireDiameter"
                                value={localCollector.collectorDefinition.wireDiameter ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Diameter"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>mm</span>
                        </label>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 100 }}>Wire Length:</span>
                            <input
                                name="wireLength"
                                value={localCollector.collectorDefinition.wireLength ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Length"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>cm</span>
                        </label>
                    </>
                )}

                {/* LIQUID BATH */}
                {localCollector.collectorType === "Liquid Bath" && (
                    <>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 90 }}>Bath Depth:</span>
                            <input
                                name="bathDepth"
                                value={localCollector.collectorDefinition.bathDepth ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Depth"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>cm</span>
                        </label>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 90 }}>Bath Diameter:</span>
                            <input
                                name="bathDiameter"
                                value={localCollector.collectorDefinition.bathDiameter ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Diameter"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>cm</span>
                        </label>
                    </>
                )}

                {/* ELECTROSTATIC FIELD */}
                {localCollector.collectorType === "Electrostatic Field" && (
                    <>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 100 }}>Field Strength:</span>
                            <input
                                name="fieldStrength"
                                value={localCollector.collectorDefinition.fieldStrength ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Field Strength"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>kV/m</span>
                        </label>
                        <label style={inlineLabelStyle}>
                            <span style={{ minWidth: 110 }}>Plate Distance:</span>
                            <input
                                name="plateDistance"
                                value={localCollector.collectorDefinition.plateDistance ?? ""}
                                onChange={handleChange}
                                type="number"
                                placeholder="Distance"
                                style={{ ...inputStyle, flexGrow: 1 }}
                            />
                            <span style={{ marginLeft: 8 }}>cm</span>
                        </label>
                    </>
                )}

                {/* Material */}
                <label style={labelStyle}>
                    Material:
                    <DropDown
                        name="material"
                        value={localCollector.collectorDefinition?.material ?? ""}
                        onChange={handleChange}
                        options={materials}
                        style={{ ...selectStyle, width: "100%", marginTop: 6 }}
                        placeholder="Select Material"
                    />
                </label>

                {/* Buttons */}
                <div style={{ marginTop: 20, textAlign: "right" }}>
                    <button onClick={onClose} style={buttonCancelStyle}>
                        Cancel
                    </button>
                    <button onClick={handleSave} style={buttonSaveStyle}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
