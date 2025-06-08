import React, { useState, useRef, useEffect } from "react";
import {
    overlayStyle,
    formStyle,
    labelStyle,
    inputStyle,
    cancelButtonStyle,
    saveButtonStyle,
    uploadButtonStyle,
    sectionStyle,
    previewContainerStyle,
    previewImageStyle,
    previewRemoveButtonStyle,
    addNewButtonStyle,
} from "../../../styles/modals/UploadImageModalStyles";

const imageTypes = ["SEM", "FESEM", "Cross-sectional SEM", "Microscopy", "Simple Image"];

const extraFieldsByType = {
    SEM: [
        { name: "Scale", label: "Scale", type: "number", placeholder: "e.g. 500" },
        { name: "Magnification", label: "Magnification", type: "number", placeholder: "e.g. 1000" },
    ],
    FESEM: [
        { name: "Scale", label: "Scale", type: "number", placeholder: "e.g. 500" },
        { name: "Magnification", label: "Magnification", type: "number", placeholder: "e.g. 1000" },
    ],
    "Cross-sectional SEM": [
        { name: "Scale", label: "Scale", type: "number", placeholder: "e.g. 500" },
        { name: "Magnification", label: "Magnification", type: "number", placeholder: "e.g. 1000" },
    ],
    Microscopy: [
        { name: "magnification", label: "Magnification", type: "text", placeholder: "e.g. 40x" },
        { name: "staining", label: "Staining Method", type: "text", placeholder: "e.g. H&E" },
    ],
    "Simple Image": [
        { name: "description", label: "Description", type: "text", placeholder: "Optional description" },
    ],
};

function base64ToBlob(base64, contentType = "image/png") {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)], { type: contentType });
}

function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsArrayBuffer(file);
    });
}

export default function UploadImageModal({ initialImages = [], onClose, onSave }) {
    const fileInputRefs = useRef({});

    // Reset uploads state whenever initialImages prop changes (modal reopen with data)
    useEffect(() => {
        const normalizedInitial = imageTypes.flatMap((type) =>
            (initialImages[type] || []).map((item) => {
                let file;
                let extraFields = {};
                if (typeof item === "string") {
                    file = base64ToBlob(item);
                } else if (item?.imageData) {
                    file = base64ToBlob(item.imageData);
                    extraFields = item.imageDefinition || {};
                }
                return { id: crypto.randomUUID(), type, file, extraFields };
            })
        );

        setUploads(
            normalizedInitial.length ? normalizedInitial : [{ id: crypto.randomUUID(), type: "", file: null, extraFields: {} }]
        );
    }, [initialImages]);

    const [uploads, setUploads] = useState(() => {
        const normalizedInitial = imageTypes.flatMap((type) =>
            (initialImages[type] || []).map((item) => {
                let file;
                let extraFields = {};
                if (typeof item === "string") {
                    file = base64ToBlob(item);
                } else if (item?.imageData) {
                    file = base64ToBlob(item.imageData);
                    extraFields = item.imageDefinition || {};
                }
                return { id: crypto.randomUUID(), type, file, extraFields };
            })
        );
        return normalizedInitial.length ? normalizedInitial : [{ id: crypto.randomUUID(), type: "", file: null, extraFields: {} }];
    });

    const [previews, setPreviews] = useState({});

    useEffect(() => {
        // Revoke old previews
        Object.values(previews).forEach(URL.revokeObjectURL);

        const newPreviews = {};
        uploads.forEach(({ id, file }) => {
            if (file) {
                try {
                    newPreviews[id] = URL.createObjectURL(file);
                } catch (e) {
                    console.error("Failed to create object URL", e);
                }
            }
        });

        setPreviews(newPreviews);

        return () => {
            Object.values(newPreviews).forEach(URL.revokeObjectURL);
        };
    }, [uploads]);

    const handleTypeChange = (id, newType) => {
        setUploads((prev) =>
            prev.map((upload) =>
                upload.id === id
                    ? {
                        ...upload,
                        type: newType,
                        extraFields:
                            extraFieldsByType[newType]?.reduce((acc, field) => {
                                acc[field.name] = upload.extraFields?.[field.name] || "";
                                return acc;
                            }, {}) || {},
                    }
                    : upload
            )
        );
    };

    const handleFileChange = (id, e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploads((prev) => prev.map((upload) => (upload.id === id ? { ...upload, file } : upload)));
        e.target.value = null;
    };

    const handleExtraFieldChange = (id, fieldName, value) => {
        setUploads((prev) =>
            prev.map((upload) =>
                upload.id === id ? { ...upload, extraFields: { ...upload.extraFields, [fieldName]: value } } : upload
            )
        );
    };

    const handleRemoveUpload = (id) => setUploads((prev) => prev.filter((upload) => upload.id !== id));
    const handleAddNew = () =>
        setUploads((prev) => [...prev, { id: crypto.randomUUID(), type: "", file: null, extraFields: {} }]);

    const imageToBase64 = async (file) => {
        const buffer = await readFileAsArrayBuffer(file);
        return arrayBufferToBase64(buffer);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uploads.some(({ type, file }) => !type || !file)) {
            alert("Please select type and upload an image for all entries.");
            return;
        }

        try {
            const fiberImages = await Promise.all(
                uploads.map(async ({ type, file, extraFields }) => ({
                    imageType: type,
                    imageDefinition: extraFields,
                    imageData: await imageToBase64(file),
                }))
            );

            onSave({ fiberImages });
            onClose();
        } catch (error) {
            alert("Error processing images");
            console.error(error);
        }
    };

    return (
        <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="uploadImagesTitle">
            <form onSubmit={handleSubmit} style={formStyle}>
                <h3 id="uploadImagesTitle" style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>
                    Upload Images
                </h3>

                {uploads.map(({ id, type, file, extraFields }, idx) => (
                    <section key={id} style={sectionStyle(idx)}>
                        <label style={labelStyle} htmlFor={`type-select-${id}`}>
                            Select Image Type:
                            <select
                                id={`type-select-${id}`}
                                value={type}
                                onChange={(e) => handleTypeChange(id, e.target.value)}
                                style={{ ...inputStyle, marginTop: 6 }}
                                required
                            >
                                <option value="" disabled>
                                    -- Select type --
                                </option>
                                {imageTypes.map((t) => (
                                    <option key={t} value={t} disabled={uploads.some((u) => u.type === t && u.id !== id)}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {type && extraFieldsByType[type] && (
                            <div style={{ marginTop: 12 }}>
                                {extraFieldsByType[type].map(({ name, label, type: inputType, placeholder }) => (
                                    <label key={name} style={{ display: "block", marginBottom: 8 }}>
                                        {label}:
                                        <input
                                            type={inputType}
                                            value={extraFields?.[name] || ""}
                                            placeholder={placeholder}
                                            onChange={(e) => handleExtraFieldChange(id, name, e.target.value)}
                                            style={{ ...inputStyle, marginTop: 4 }}
                                        />
                                    </label>
                                ))}
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(id, e)}
                            ref={(el) => (fileInputRefs.current[id] = el)}
                            style={{ display: "none" }}
                        />

                        <button type="button" onClick={() => fileInputRefs.current[id]?.click()} style={uploadButtonStyle}>
                            {file ? "Change Image" : "Upload Image"}
                        </button>

                        {file && previews[id] && (
                            <div style={previewContainerStyle}>
                                <img src={previews[id]} alt={file.name || "uploaded image"} style={previewImageStyle} />
                                <button type="button" onClick={() => handleRemoveUpload(id)} style={previewRemoveButtonStyle}>
                                    ×
                                </button>
                            </div>
                        )}
                    </section>
                ))}

                <button type="button" onClick={handleAddNew} style={addNewButtonStyle} disabled={uploads.length >= imageTypes.length}>
                    Add New Image
                </button>

                <div style={{ marginTop: 20, textAlign: "right" }}>
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
