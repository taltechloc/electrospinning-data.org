import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useModalKeyboardHandlers } from "../../useModalKeyboardHandlers";
import {
    overlayStyle,
    formStyle,
    polymerContainerStyle,
    removeButtonStyle,
    labelStyle,
    inputStyle,
    addButtonStyle,
    cancelButtonStyle,
    saveButtonStyle,
} from "../../../styles/modals/polymerModalStyle";

const polymerNames = [
    "PCL", "PLA", "PVP", "PAN", "PEO", "PU", "PS", "PVDF", "PEG", "PMMA", "PVA", "CS",
    "GELATIN", "PANI", "PVAC", "PAA", "PHEMA", "PES", "PBT", "PBI", "PAAC", "PPSU",
    "PCT", "PUA", "SIO2", "PLGA", "GRAPHENE", "NYLON", "TIO2", "HPC", "EC", "TPU",
    "SILK", "COLLAGEN", "HA", "EUDRAGIT", "PET", "PDLLA", "ZEIN", "ALG", "PSF", "PPL",
    "KEFIRAN", "AG", "PAM14", "HP_BETA_CD", "CH", "Y_PGA", "CA", "KNN", "KB", "P407",
    "SF", "PPCL", "SA", "PGA", "PA6", "AROMATIC_PI", "PEO_4000", "PEO_600", "NYLON_6_6",
    "NYLON_6", "PSA", "PHPV"
];
const polymerOptions = polymerNames.map(name => ({ value: name, label: name }));

export default function PolymerModal({ polymerList, onClose, onSave }) {
    const createEmptyPolymer = () => ({
        polymerName: "",
        polymerWeight: null,
        polymerWeightUnit: "gram",
        molecularWeight: null,
        molecularWeightUnit: "kDa",
        weightRatio: null,
        weightRatioUnit: "wt%",
    });

    const [polymers, setPolymers] = useState([createEmptyPolymer()]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const initializedPolymers = Array.isArray(polymerList) && polymerList.length > 0
            ? polymerList
            : [createEmptyPolymer()];

        // If only one polymer, set default weightRatio to 100
        if (initializedPolymers.length <= 1) {
            setPolymers(initializedPolymers.map(p => ({ ...p, weightRatio: 100 })));
        } else {
            setPolymers(initializedPolymers);
        }

        setErrors([]);
    }, [polymerList]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setPolymers(prev => {
            const updated = [...prev];
            updated[index][name] = ["polymerWeight", "molecularWeight", "weightRatio"].includes(name)
                ? value === "" ? "" : parseFloat(value)
                : value;
            return updated;
        });

        setErrors(prev => {
            const updatedErrors = [...prev];
            if (updatedErrors[index]) {
                updatedErrors[index][name] = null;
            }
            return updatedErrors;
        });
    };

    const handleAddPolymer = () => {
        setPolymers(prev => [...prev, createEmptyPolymer()]);
        setErrors(prev => [...prev, {}]);
    };

    const handleRemovePolymer = (index) => {
        const updatedPolymers = polymers.filter((_, i) => i !== index);
        const updatedErrors = errors.filter((_, i) => i !== index);
        setPolymers(updatedPolymers.length ? updatedPolymers : [createEmptyPolymer()]);
        setErrors(updatedErrors.length ? updatedErrors : [{}]);
    };

    const validate = () => {
        const newErrors = [];
        const moreThanOnePolymer = polymers.length > 1;
        let totalWeightRatio = 0;
        let hasWeightRatioError = false;

        polymers.forEach((p, index) => {
            const err = {};

            if (moreThanOnePolymer) {
                if (p.weightRatio === "" || p.weightRatio === null || isNaN(p.weightRatio)) {
                    err.weightRatio = "Weight ratio is required";
                    hasWeightRatioError = true;
                } else if (p.weightRatio <= 0) {
                    err.weightRatio = "Weight ratio must be a positive number";
                    hasWeightRatioError = true;
                } else {
                    totalWeightRatio += Number(p.weightRatio);
                }
            }

            if (p.molecularWeight !== "" && p.molecularWeight !== null) {
                if (isNaN(p.molecularWeight) || p.molecularWeight <= 0) {
                    err.molecularWeight = "Molecular weight must be a positive number";
                }
            }

            newErrors.push(err);
        });

        if (moreThanOnePolymer && !hasWeightRatioError) {
            const roundedTotal = Math.round(totalWeightRatio * 100) / 100;
            if (Math.abs(roundedTotal - 100) > 0.01) {
                polymers.forEach((_, index) => {
                    newErrors[index].weightRatio = "Total weight ratio of the blend must equal 100";
                });
            }
        }

        setErrors(newErrors);
        return !newErrors.some(err => Object.keys(err).length > 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(polymers);
            onClose();
        }
    };

    useModalKeyboardHandlers({
        onClose,
        onSave: () => onSave(polymers),
        dependencies: [polymers],
    });

    return (
        <div style={overlayStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>Polymer Details</h3>

                {polymers.map((polymer, index) => (
                    <div key={index} style={polymerContainerStyle}>
                        <button
                            type="button"
                            onClick={() => handleRemovePolymer(index)}
                            style={removeButtonStyle}
                            title="Remove Polymer"
                            aria-label={`Remove Polymer #${index + 1}`}
                        >
                            ×
                        </button>

                        <strong style={{ marginBottom: 8 }}>Polymer #{index + 1}</strong>

                        <label style={labelStyle}>
                            <span>Polymer<span style={{ color: "red", marginLeft: 4 }}>*</span></span>
                            <Select
                                name="polymerName"
                                value={polymerOptions.find(p => p.value === polymer.polymerName) || null}
                                onChange={(selected) =>
                                    handleChange(index, {
                                        target: { name: "polymerName", value: selected?.value || "" }
                                    })
                                }
                                options={polymerOptions}
                                styles={{ container: base => ({ ...base, ...inputStyle }) }}
                                placeholder="Select polymer"
                                isSearchable
                            />
                        </label>

                        <label style={labelStyle}>
                            Weight:
                            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                                <input
                                    type="number"
                                    step="any"
                                    min="0.0000001"
                                    name="polymerWeight"
                                    value={polymer.polymerWeight ?? ""}
                                    onChange={(e) => handleChange(index, e)}
                                    style={{ ...inputStyle, flex: 1 }}
                                    placeholder="e.g. 5"
                                />
                                <span>gram</span>
                            </div>
                            {errors[index]?.polymerWeight && (
                                <div style={{ color: "red", marginTop: 4 }}>
                                    {errors[index].polymerWeight}
                                </div>
                            )}
                        </label>

                        <label style={labelStyle}>
                            Molecular Weight:
                            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                                <input
                                    type="number"
                                    step="any"
                                    min="0.01"
                                    name="molecularWeight"
                                    value={polymer.molecularWeight ?? ""}
                                    onChange={(e) => handleChange(index, e)}
                                    style={{ ...inputStyle, flex: 1 }}
                                    placeholder="e.g. 100000"
                                />
                                <span>kDa</span>
                            </div>
                            {errors[index]?.molecularWeight && (
                                <div style={{ color: "red", marginTop: 4 }}>
                                    {errors[index].molecularWeight}
                                </div>
                            )}
                        </label>

                        {polymers.length > 1 ? (
                            <label style={labelStyle}>
                                <span>
                                    Weight Ratio<span style={{ color: "red", marginLeft: 4 }}>*</span>
                                </span>
                                <input
                                    type="number"
                                    step="any"
                                    min="0.0000001"
                                    name="weightRatio"
                                    value={polymer.weightRatio ?? ""}
                                    onChange={(e) => handleChange(index, e)}
                                    style={inputStyle}
                                    placeholder="e.g. 25"
                                    required
                                />
                                {errors[index]?.weightRatio && (
                                    <div style={{ color: "red", marginTop: 4 }}>
                                        {errors[index].weightRatio}
                                    </div>
                                )}
                            </label>
                        ) : (
                            <div style={{ marginTop: 8 }}>
                                <strong>Weight Ratio:</strong> 100
                            </div>
                        )}
                    </div>
                ))}

                <button type="button" onClick={handleAddPolymer} style={addButtonStyle}>
                    + Add Another Polymer
                </button>

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
