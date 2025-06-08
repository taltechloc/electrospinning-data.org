import React, { useState } from "react";
import { useModalKeyboardHandlers } from "../../useModalKeyboardHandlers";
import {
    overlayStyle,
    formStyle,
    labelStyle,
    inputStyle,
    selectStyle,
    cancelButtonStyle,
    saveButtonStyle,
    headingStyle,
} from "../../../styles/modals/NeedleModalStyle";

import { DropDown } from "../../DropDown";


const needleTypes = [
    { label: "-- Select Type --" },
    { label: "Single Needle" },
    { label: "Coaxial" },
    { label: "Triaxial" },
    { label: "Needle Array" },
    { label: "Needleless" },
];

const diameterUnits = [
    { label: "G", value: "G" },
    { label: "mm", value: "mm" },
    { label: "cm", value: "cm" },
    { label: "in", value: "in" },
];

const materials = [
    { label: "-- None --", value: "" },
    { label: "Stainless Steel", value: "Stainless Steel" },
    { label: "Titanium", value: "Titanium" },
    { label: "Plastic", value: "Plastic" },
    { label: "Aluminum", value: "Aluminum" },
    { label: "Carbon Fiber", value: "Carbon Fiber" },
];

export default function NeedleModal({ needleData, onClose, onSave }) {
    const [needle, setNeedle] = useState(() => {
        const defaultState = {
            needleType: "",
            diameter: "",
            diameterUnit: "G",
            innerDiameter: "",
            outerDiameter: "",
            middleDiameter: "",
            numNeedles: "",
            needleSpacing: "",
            surfaceType: "", // for needleless
            material: "",
        };

        if (!needleData) return defaultState;

        const { needleType = "", needleDefinition = {} } = needleData;

        return {
            ...defaultState,
            needleType,
            ...needleDefinition,
        };
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setNeedle((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null }));
    }
    function validate() {
        const newErrors = {};
        const {
            needleType,
            diameter,
            innerDiameter,
            outerDiameter,
            middleDiameter,
            numNeedles,
            needleSpacing,
            surfaceType,
            innerNeedleType,
        } = needle;

        if (!needleType) {
            newErrors.needleType = "Needle type is required";
        }

        const validatePositive = (field, label) => {
            if (!needle[field] || isNaN(needle[field]) || Number(needle[field]) <= 0) {
                newErrors[field] = `${label} must be a positive number`;
            }
        };

        switch (needleType) {
            case "Single Needle":
                validatePositive("diameter", "Diameter");
                break;

            case "Coaxial":
                validatePositive("innerDiameter", "Inner diameter");
                validatePositive("outerDiameter", "Outer diameter");
                break;

            case "Triaxial":
                validatePositive("innerDiameter", "Inner diameter");
                validatePositive("middleDiameter", "Middle diameter");
                validatePositive("outerDiameter", "Outer diameter");
                break;

            case "Needle Array":
                validatePositive("numNeedles", "Number of needles");
                validatePositive("needleSpacing", "Needle spacing");

                if (!innerNeedleType) {
                    newErrors.innerNeedleType = "Needle type in array is required";
                } else {
                    switch (innerNeedleType) {
                        case "Single Needle":
                            validatePositive("diameter", "Diameter");
                            break;
                        case "Coaxial":
                            validatePositive("innerDiameter", "Inner diameter");
                            validatePositive("outerDiameter", "Outer diameter");
                            break;
                        case "Triaxial":
                            validatePositive("innerDiameter", "Inner diameter");
                            validatePositive("middleDiameter", "Middle diameter");
                            validatePositive("outerDiameter", "Outer diameter");
                            break;
                    }
                }
                break;

            case "Needleless":
                if (!surfaceType) {
                    newErrors.surfaceType = "Surface type is required";
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    function handleSave(e) {
        e.preventDefault();
        if (!validate()) return;

        const {
            needleType,
            diameter,
            diameterUnit,
            innerDiameter,
            outerDiameter,
            middleDiameter,
            numNeedles,
            needleSpacing,
            surfaceType,
            material,
        } = needle;

        let needleDefinition = {};

        switch (needleType) {
            case "Single Needle":
                needleDefinition = {
                    diameter: Number(diameter),
                    diameterUnit,
                    material,
                };
                break;
            case "Coaxial":
                needleDefinition = {
                    innerDiameter: Number(innerDiameter),
                    outerDiameter: Number(outerDiameter),
                    material,
                };
                break;
            case "Triaxial":
                needleDefinition = {
                    innerDiameter: Number(innerDiameter),
                    middleDiameter: Number(middleDiameter),
                    outerDiameter: Number(outerDiameter),
                    material,
                };
                break;
            case "Needle Array":
                needleDefinition = {
                    numNeedles: Number(needle.numNeedles),
                    needleSpacing: Number(needle.needleSpacing),
                    needleType: needle.innerNeedleType,
                    diameter: needle.diameter ? Number(needle.diameter) : undefined,
                    diameterUnit: needle.diameterUnit,
                    innerDiameter: needle.innerDiameter ? Number(needle.innerDiameter) : undefined,
                    outerDiameter: needle.outerDiameter ? Number(needle.outerDiameter) : undefined,
                    material,
                };
                break;
            case "Needleless":
                needleDefinition = {
                    surfaceType,
                    material,
                };
                break;
        }

        onSave({ needleType, needleDefinition });
        onClose();
    }

    useModalKeyboardHandlers({
        onClose,
        onSave: () => onSave(needle),
        dependencies: [needle],
    });

    return (
        <div style={overlayStyle}>
            <form onSubmit={handleSave} style={formStyle}>
                <h3 style={headingStyle}>Needle Details</h3>

                {/* Needle Type */}
                <label style={labelStyle}>
                    Type<span style={{ color: "red", marginLeft: 4 }}>*</span>
                    <DropDown
                        name="needleType"
                        value={needle.needleType}
                        onChange={handleChange}
                        options={needleTypes}
                        required
                        style={selectStyle}
                    />
                    {errors.needleType && <div style={{ color: "red" }}>{errors.needleType}</div>}
                </label>

                {/* Conditional Inputs */}
                {needle.needleType === "Single Needle" && (
                    <label style={labelStyle}>
                        Diameter<span style={{ color: "red", marginLeft: 4 }}>*</span>
                        <input
                            type="number"
                            step="any"
                            name="diameter"
                            value={needle.diameter}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g. 18"
                        />
                        {errors.diameter && <div style={{ color: "red" }}>{errors.diameter}</div>}
                    </label>
                )}

                {needle.needleType === "Coaxial" && (
                    <>
                        <label style={labelStyle}>
                            Inner Diameter<span style={{ color: "red" }}>*</span>
                            <input
                                type="number"
                                step="any"
                                name="innerDiameter"
                                value={needle.innerDiameter}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            {errors.innerDiameter && <div style={{ color: "red" }}>{errors.innerDiameter}</div>}
                        </label>
                        <label style={labelStyle}>
                            Outer Diameter<span style={{ color: "red" }}>*</span>
                            <input
                                type="number"
                                step="any"
                                name="outerDiameter"
                                value={needle.outerDiameter}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            {errors.outerDiameter && <div style={{ color: "red" }}>{errors.outerDiameter}</div>}
                        </label>
                    </>
                )}

                {needle.needleType === "Triaxial" && (
                    <>
                        <label style={labelStyle}>
                            Inner Diameter*
                            <input
                                type="number"
                                step="any"
                                name="innerDiameter"
                                value={needle.innerDiameter}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            {errors.innerDiameter && <div style={{ color: "red" }}>{errors.innerDiameter}</div>}
                        </label>
                        <label style={labelStyle}>
                            Middle Diameter*
                            <input
                                type="number"
                                step="any"
                                name="middleDiameter"
                                value={needle.middleDiameter}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            {errors.middleDiameter && <div style={{ color: "red" }}>{errors.middleDiameter}</div>}
                        </label>
                        <label style={labelStyle}>
                            Outer Diameter*
                            <input
                                type="number"
                                step="any"
                                name="outerDiameter"
                                value={needle.outerDiameter}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            {errors.outerDiameter && <div style={{ color: "red" }}>{errors.outerDiameter}</div>}
                        </label>
                    </>
                )}
                {needle.needleType === "Needle Array" && (
                    <>
                        {/* Array Parameters */}
                        <label style={labelStyle}>
                            Number of Needles<span style={{ color: "red" }}>*</span>
                            <input
                                type="number"
                                step="1"
                                name="numNeedles"
                                value={needle.numNeedles}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            {errors.numNeedles && <div style={{ color: "red" }}>{errors.numNeedles}</div>}
                        </label>

                        <label style={labelStyle}>
                            Needle Spacing (mm)<span style={{ color: "red" }}>*</span>
                            <input
                                type="number"
                                step="any"
                                name="needleSpacing"
                                value={needle.needleSpacing}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            {errors.needleSpacing && <div style={{ color: "red" }}>{errors.needleSpacing}</div>}
                        </label>

                        {/* Inner Needle Type */}
                        <label style={labelStyle}>
                            Needle Type in Array<span style={{ color: "red" }}>*</span>
                            <DropDown
                                name="innerNeedleType"
                                value={needle.innerNeedleType || ""}
                                onChange={handleChange}
                                options={[
                                    { label: "-- Select Type --", value: "" },
                                    { label: "Single Needle", value: "Single Needle" },
                                    { label: "coaxial", value: "coaxial" },
                                ]}
                                style={selectStyle}
                            />
                            {errors.innerNeedleType && <div style={{ color: "red" }}>{errors.innerNeedleType}</div>}
                        </label>

                        {/* Conditionally Render Based on Selected Inner Needle Type */}
                        {needle.innerNeedleType === "Single Needle" && (
                            <label style={labelStyle}>
                                Diameter<span style={{ color: "red" }}>*</span>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <input
                                        type="number"
                                        step="any"
                                        name="diameter"
                                        value={needle.diameter}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, flex: 1 }}
                                        placeholder="e.g. 22"
                                    />
                                    <DropDown
                                        name="diameterUnit"
                                        value={needle.diameterUnit}
                                        onChange={handleChange}
                                        options={diameterUnits}
                                        style={{ flex: 0.5 }}
                                    />
                                </div>
                                {errors.diameter && <div style={{ color: "red" }}>{errors.diameter}</div>}
                            </label>
                        )}

                        {needle.innerNeedleType === "coaxial" && (
                            <>
                                <label style={labelStyle}>
                                    Inner Diameter<span style={{ color: "red" }}>*</span>
                                    <input
                                        type="number"
                                        step="any"
                                        name="innerDiameter"
                                        value={needle.innerDiameter}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                    {errors.innerDiameter && <div style={{ color: "red" }}>{errors.innerDiameter}</div>}
                                </label>

                                <label style={labelStyle}>
                                    Outer Diameter<span style={{ color: "red" }}>*</span>
                                    <input
                                        type="number"
                                        step="any"
                                        name="outerDiameter"
                                        value={needle.outerDiameter}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                    {errors.outerDiameter && <div style={{ color: "red" }}>{errors.outerDiameter}</div>}
                                </label>
                            </>
                        )}
                    </>
                )}


                {needle.needleType === "Needleless" && (
                    <label style={labelStyle}>
                        Surface Type*
                        <input
                            type="text"
                            name="surfaceType"
                            value={needle.surfaceType}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g. disc, wire, plate"
                        />
                        {errors.surfaceType && <div style={{ color: "red" }}>{errors.surfaceType}</div>}
                    </label>
                )}

                {/* Material */}
                <label style={labelStyle}>
                    Material:
                    <DropDown
                        name="material"
                        value={needle.material}
                        onChange={handleChange}
                        options={materials}
                        style={selectStyle}
                    />
                </label>

                <div style={{ marginTop: 12, textAlign: "right" }}>
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