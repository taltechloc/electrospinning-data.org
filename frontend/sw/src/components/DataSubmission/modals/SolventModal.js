import React, { useEffect, useState } from "react";
import { useModalKeyboardHandlers } from "../../useModalKeyboardHandlers";
import {
    overlayStyle,
    formStyle,
    headerStyle,
    solventContainerStyle,
    removeButtonStyle,
    solventTitleStyle,
    labelStyle,
    inputStyle,
    addButtonStyle,
    buttonsContainerStyle,
    cancelButtonStyle,
    saveButtonStyle,
} from "../../../styles/modals/SolventModalStyle";
import { DropDown } from "../../DropDown";

const solventNames = [
    "DMF", "DMSO", "THF", "Acetone", "Chloroform", "MeOH", "Ethanol", "Water",
    "DMAc", "HFIP", "FA", "TFA", "NMP", "AcOH",
];

export default function SolventModal({ solventList, onClose, onSave }) {
    const createEmptySolvent = () => ({
        solventName: "",
        weight: "",
        weightUnit: "gram",
        volumeRatio: "", // empty string for controlled input
        volumeRatioUnit: "v/v",
    });

    const [solvents, setSolvents] = useState(
        Array.isArray(solventList) && solventList.length > 0
            ? solventList.map(s => ({ ...s, volumeRatio: s.volumeRatio ?? "" }))
            : [createEmptySolvent()]
    );
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const initialized =
            Array.isArray(solventList) && solventList.length > 0
                ? solventList.map(s => ({ ...s, volumeRatio: s.volumeRatio ?? "" }))
                : [createEmptySolvent()];
        setSolvents(initialized);
        setErrors([]);
    }, [solventList]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setSolvents(prev => {
            const updated = [...prev];
            updated[index][name] = value;
            return updated;
        });

        setErrors(prev => {
            const updatedErrors = [...prev];
            if (updatedErrors[index]) updatedErrors[index][name] = null;
            return updatedErrors;
        });
    };

    const handleAddSolvent = () => {
        setSolvents(prev => [...prev, createEmptySolvent()]);
        setErrors(prev => [...prev, {}]);
    };

    const handleRemoveSolvent = (index) => {
        setSolvents(prev => {
            const updated = prev.filter((_, i) => i !== index);
            return updated.length ? updated : [createEmptySolvent()];
        });
        setErrors(prev => {
            const updatedErrors = prev.filter((_, i) => i !== index);
            return updatedErrors.length ? updatedErrors : [{}];
        });
    };

    const validate = () => {
        const newErrors = [];
        const multipleSolvents = solvents.length > 1;
        let totalVolumeRatio = 0;
        let volumeRatioError = false;

        solvents.forEach((s, i) => {
            const err = {};

            if (!s.solventName) err.solventName = "Solvent is required";

            // Weight is optional, no validation needed

            if (multipleSolvents) {
                if (s.volumeRatio === "" || isNaN(s.volumeRatio)) {
                    err.volumeRatio = "Volume ratio is required";
                    volumeRatioError = true;
                } else if (Number(s.volumeRatio) <= 0) {
                    err.volumeRatio = "Volume ratio must be a positive number";
                    volumeRatioError = true;
                } else {
                    totalVolumeRatio += Number(s.volumeRatio);
                }
            }

            newErrors.push(err);
        });

        if (multipleSolvents && !volumeRatioError && totalVolumeRatio === 0) {
            solvents.forEach((_, i) => {
                newErrors[i].volumeRatio = "Total ratio must be greater than 0";
            });
        }

        setErrors(newErrors);
        return !newErrors.some(e => Object.keys(e).length > 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const normalizedSolvents = solvents.map(s => ({
            ...s,
            volumeRatio: solvents.length === 1 ? 100 : Number(s.volumeRatio),
        }));

        onSave(normalizedSolvents);
        onClose();
    };

    useModalKeyboardHandlers({
        onClose,
        onSave: () => onSave(solvents),
        dependencies: [solvents],
    });

    return (
        <div style={overlayStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h3 style={headerStyle}>Solvent Details</h3>

                {solvents.map((solvent, index) => (
                    <div key={index} style={solventContainerStyle}>
                        <button
                            type="button"
                            onClick={() => handleRemoveSolvent(index)}
                            style={removeButtonStyle}
                            title="Remove Solvent"
                            aria-label={`Remove Solvent #${index + 1}`}
                        >
                            ×
                        </button>

                        <strong style={solventTitleStyle}>Solvent #{index + 1}</strong>

                        <label style={labelStyle}>
              <span>
                Solvent:<span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
                            <DropDown
                                name="solventName"
                                value={solvent.solventName}
                                onChange={(e) => handleChange(index, e)}
                                options={solventNames}
                                style={inputStyle}
                                required
                                placeholder="Select solvent"
                            />
                            {errors[index]?.solventName && (
                                <div style={{ color: "red", marginTop: 4 }}>
                                    {errors[index].solventName}
                                </div>
                            )}
                        </label>

                        <label style={labelStyle}>
                            <span>Weight</span>
                            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                                <input
                                    type="number"
                                    step="any"
                                    name="weight"
                                    value={solvent.weight}
                                    onChange={(e) => handleChange(index, e)}
                                    style={{ ...inputStyle, flex: 1 }}
                                    placeholder="e.g. 10"
                                    min="0"
                                />
                                <span style={{ marginLeft: 8 }}>gram</span>
                            </div>
                            {errors[index]?.weight && (
                                <div style={{ color: "red", marginTop: 4 }}>
                                    {errors[index].weight}
                                </div>
                            )}
                        </label>

                        {solvents.length > 1 ? (
                            <label style={labelStyle}>
                <span>
                  Volume Ratio Parts
                  <span style={{ color: "red", marginLeft: 4 }}>*</span>
                </span>
                                <input
                                    type="number"
                                    step="any"
                                    min="0.0001"
                                    name="volumeRatio"
                                    value={solvent.volumeRatio ?? ""}
                                    onChange={(e) => handleChange(index, e)}
                                    style={inputStyle}
                                    placeholder="e.g. 1"
                                    required
                                />
                                {errors[index]?.volumeRatio && (
                                    <div style={{ color: "red", marginTop: 4 }}>
                                        {errors[index].volumeRatio}
                                    </div>
                                )}

                            </label>
                        ) : (
                            <div style={{ marginTop: 8 }}>
                            </div>
                        )}
                    </div>
                ))}

                <button type="button" onClick={handleAddSolvent} style={addButtonStyle}>
                    + Add Another Solvent
                </button>

                <div style={buttonsContainerStyle}>
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
