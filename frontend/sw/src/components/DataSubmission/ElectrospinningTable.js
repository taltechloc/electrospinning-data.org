import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import SolventModal from "./modals/SolventModal";
import SolventSummary from "./summaries/SolventSummary";
import PolymerModal from "./modals/PolymerModal";
import PolymerSummary from "./summaries/PolymerSummary";
import CollectorModal from "./modals/CollectorModal";
import CollectorSummary from "./summaries/CollectorSummary";
import NeedleModal from "./modals/NeedleModal";
import NeedleSummary from "./summaries/NeedleSummary";
import SolutionModal from "./modals/SolutionModal";
import SolutionSummary from "./summaries/SolutionSummary";
import FiberMorphologyModal from "./modals/FiberMorphologyModal";
import {
    tableStyle,
    thStyle,
    tdStyle,
    clickableCellStyle,
    inputStyle,
    addRowBtnStyle,
    removeBtnStyle,
    copyBtnStyle,
    tableTitleStyle,
    rowCountStyle,
    fontBold14,
    rowCountBoxStyle,
    submitDivBtnStyle,
    submitBtnStyle,
    cancelBtnStyle,
} from '../../styles/tableStyles';

import initialRows from "./electrospinningData";
import { fiberMorphologyModal } from './modals/FiberMorphologyModal';
import button from "bootstrap/js/src/button";
import {buttonClasses} from "@mui/material";
import FiberMorphologySummary from "./summaries/FiberMorphologySummary";
import UploadImageModal from "./modals/UploadImageModal";
import FiberImagesSummary from "./summaries/FiberImageSummary";


export default function ElectrospinningTable({ onSubmit }) {
    const [rows, setRows] = useState(initialRows);

    const [modalRowId, setModalRowId] = useState(null);
    const [modalType, setModalType] = useState(null);

    // General update for a key on a row
    const updateRow = (id, key, value) => {
        setRows(rows.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
    };
// Update processParameter keys (e.g. voltage, flowRate, etc.)
    const updateProcessParam = (id, key, value) => {
        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    processParameter: {
                        ...row.processParameter,
                        [key]: value === "" ? null : Number(value),
                    },
                }
                : row
        ));
    };

// Update ambientParameter keys (temperature, humidity)
    const updateAmbientParam = (id, key, value) => {
        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    ambientParameter: {
                        ...row.ambientParameter,
                        [key]: value === "" ? null : Number(value),
                    },
                }
                : row
        ));
    };

    const updateFiberProperties = (id, key, value) => {
        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    fiberProperty: {
                        ...row.fiberProperty,
                        [key]: key === "isFormationStable"
                            ? (value === "" ? null : value)  // Keep boolean or null
                            : (value === "" ? null : Number(value)), // Convert numeric values
                    },
                }
                : row
        ));
    };


// Save polymer data from PolymerModal
    const savePolymerData = (id, polymerComponents) => {
        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    polymerProperty: {
                        ...row.polymerProperty,
                        polymerComponents,
                    },
                }
                : row
        ));
        closeModal();
    };

// Save solvent data from SolventModal
    const saveSolventData = (id, solventComponents) => {
        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    solventProperty: {
                        ...row.solventProperty,
                        solventComponents,
                    },
                }
                : row
        ));
        closeModal();
    };

    const saveNeedleData = (id, needleProperty) => {
        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    needleProperty,  // update the whole needleProperty object
                }
                : row
        ));
        closeModal();
    };


// Save solution data from SolutionModal
    const saveSolutionData = (id, solutionProperty) => {
        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    solutionProperty,
                }
                : row
        ));
        closeModal();
    };

// Save collector data from CollectorModal
    const saveCollectorData = (id, collectorProperty) => {
        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    collectorProperty,
                }
                : row
        ));
        closeModal();
    };
    const convertSelectionToFiberMorphologyArray = (selected) => {
        if (!selected) return [];

        return Object.entries(selected).flatMap(([category, abbreviations]) => {
            return abbreviations.map((abbreviation) => {
                const item = fiberMorphologyModal[category]?.find((entry) => entry.abbreviation === abbreviation);
                return {
                    category,
                    abbreviation,
                    label: item?.label || "",
                };
            });
        });
    };


// Save fiber morphology from FiberMorphologyModal

    const saveFiberMorphologyData = (id, selected) => {
        const fiberMorphologyArray = convertSelectionToFiberMorphologyArray(selected);

        setRows(rows.map(row =>
            row.id === id
                ? {
                    ...row,
                    fiberProperty: {
                        ...row.fiberProperty,
                        fiberMorphology: fiberMorphologyArray,
                    },
                }
                : row
        ));
        closeModal();
    };



    const addRow = () => {
        const newId = rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;
        const newRow = JSON.parse(JSON.stringify(initialRows[0]));
        newRow.id = newId;

        setRows([...rows, newRow]);
    };

    const removeRow = (id) => {
        setRows(rows.filter((r) => r.id !== id));
    };

    // Close modal helper
    const closeModal = () => {
        setModalRowId(null);
        setModalType(null);
    };


    const navigate = useNavigate();

    const validateRows = () => {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNumber = i + 1;

            if (!row.polymerProperty?.polymerComponents?.length) {
                toast.error(`Row ${rowNumber}: Polymers cannot be empty.`);
                return false;
            }

            // Check solventComponents (required)
            if (!row.solventProperty?.solventComponents?.length) {
                toast.error(`Row ${rowNumber}: Solvents cannot be empty.`);
                return false;
            }

            // Check solutionProperty (required)
            if (!row.solutionProperty || Object.keys(row.solutionProperty).length === 0) {
                toast.error(`Row ${rowNumber}: Solution details are required.`);
                return false;
            }

            // Check CollectorProperty (required)
            if (!row.collectorProperty.collectorType || Object.keys(row.collectorProperty).length === 0) {
                toast.error(`Row ${rowNumber}: Collector details are required.`);
                return false;
            }

            // Check needleComponents (required)
            if (!row.needleProperty || !row.needleProperty || Object.keys(row.needleProperty).length === 0) {
                toast.error(`Row ${rowNumber}: Needle details are required.`);
                return false;
            }

            const pp = row.processParameter;
            if (
                pp?.voltage == null || pp?.flowRate == null || pp?.tipCollectorDistance == null
            ) {
                toast.error(`Row ${rowNumber}: All process parameters must be filled.`);
                return false;
            }
            if (typeof row.fiberProperty?.isFormationStable !== 'boolean') {
                toast.error(`Row ${rowNumber}: "Is formation stable" must be selected.`);
                return false;
            }
        }

        return true;
    };

    const handleSubmit = () => {
        if (validateRows()) {
            if (onSubmit) {
                onSubmit(rows);
            } else {
                console.warn("No onSubmit prop passed to ElectrospinningTable");
            }
        }
    };

    function transformSavedData(savedArray) {
        if (!Array.isArray(savedArray)) return {};
        return savedArray.reduce((acc, { category, abbreviation }) => {
            if (!acc[category]) acc[category] = [];
            acc[category].push(abbreviation);
            return acc;
        }, {});
    }
    const copyRowToNext = (currentRowId) => {
        setRows((prevRows) => {
            const index = prevRows.findIndex(r => r.id === currentRowId);
            if (index === -1) return prevRows;

            const currentRow = prevRows[index];

            const newRow = {
                id: prevRows.length ? Math.max(...prevRows.map(r => r.id)) + 1 : 1,
                polymerProperty: currentRow.polymerProperty,
                solventProperty: currentRow.solventProperty,
                solutionProperty: currentRow.solutionProperty,
                collectorProperty: currentRow.collectorProperty,
                needleProperty: currentRow.needleProperty,

            };

            const updatedRows = [...prevRows];
            updatedRows.splice(index + 1, 0, newRow);

            return updatedRows;
        });
    };


    const row = rows.find((r) => r.id === modalRowId);
    const fiberMorphologyData = row && row.fiberProperty ? row.fiberProperty.fiberMorphology : undefined;
    const initialSelection = transformSavedData(fiberMorphologyData) || {};

    function groupImagesByType(fiberImages) {
        if (!fiberImages || !Array.isArray(fiberImages)) return {};
        return fiberImages.reduce((acc, img) => {
            const type = img.imageType || "Unknown";
            if (!acc[type]) acc[type] = [];
            acc[type].push(img);
            return acc;
        }, {});
    }

    return (

        <div>

            <h2
                style={tableTitleStyle}
                className="title">
                Data Submission Table
            </h2>

            <button style={addRowBtnStyle} onClick={addRow}>
                + Add Row
            </button>
            <div
                style={rowCountStyle}
            >
                <label
                    htmlFor="row-count"
                    style={fontBold14}
                >
                    Number of Rows:
                </label>
                <input
                    type="number"
                    id="row-count"
                    value={rows.length}
                    min="1"
                    onChange={(e) => {
                        const count = parseInt(e.target.value, 10);
                        const newCount = Math.max(count, 1);

                        const currentRows = [...rows];

                        while (currentRows.length < newCount) {
                            const newId = currentRows.length
                                ? Math.max(...currentRows.map((r) => r.id)) + 1
                                : 1;
                            const newRow = JSON.parse(JSON.stringify(initialRows[0]));
                            newRow.id = newId;
                            currentRows.push(newRow);
                        }

                        setRows(currentRows.slice(0, newCount));
                    }}
                    style={rowCountBoxStyle}
                />
            </div>


            <table border={1} style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>Actions</th>
                    <th style={thStyle}>Polymers <span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Solvents <span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Solution <span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Collector <span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Needle <span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Voltage (kV) <span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Flow Rate (ml/h) <span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Tip-to-collector Distance (cm) <span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Spinning Duration (min)</th>
                    <th style={thStyle}>Temperature (°C)</th>
                    <th style={thStyle}>Humidity (%) </th>
                    <th style={thStyle}>Is Formation Stable (yes/no)<span style={{color: 'red'}}>*</span></th>
                    <th style={thStyle}>Fiber Diameter (nm)</th>
                    <th style={thStyle}>Fiber STDEV Diameter (nm)</th>
                    <th style={thStyle}>Product Weight (ug)</th>
                    <th style={thStyle}>Morphology</th>
                    <th style={thStyle}>Image</th>
                </tr>
                </thead>

                <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                        <td style={tdStyle}>
                            <button
                                style={removeBtnStyle}
                                onClick={() => removeRow(row.id)}
                                title="Remove this row"
                            >
                                Remove
                            </button>

                            <button
                                style={copyBtnStyle}
                                onClick={() => copyRowToNext(row.id)}
                                title="Copy this row to next"
                            >
                                Copy Next
                            </button>
                        </td>

                        <td
                            style={{ ...tdStyle, ...clickableCellStyle }}
                            onClick={() => {
                                setModalRowId(row.id);
                                setModalType("polymer");
                            }}
                            title="Click to edit Polymers"
                        >
                            <PolymerSummary polymers={row.polymerProperty?.polymerComponents || []} />
                        </td>

                        <td
                            style={{ ...tdStyle, ...clickableCellStyle }}
                            onClick={() => {
                                setModalRowId(row.id);
                                setModalType("solvent");
                            }}
                            title="Click to edit Solvents"
                        >
                            <SolventSummary solvents={row.solventProperty?.solventComponents || []} />
                        </td>

                        <td
                            style={{ ...tdStyle, ...clickableCellStyle }}
                            onClick={() => {
                                setModalRowId(row.id);
                                setModalType("solution");
                            }}
                            title="Click to edit Solution"
                        >
                            <SolutionSummary solutionProperty={row.solutionProperty} />
                        </td>

                        <td
                            style={{ ...tdStyle, ...clickableCellStyle }}
                            onClick={() => {
                                setModalRowId(row.id);
                                setModalType("collector");
                            }}
                            title="Click to edit Collector"
                        >
                            <CollectorSummary collector={row.collectorProperty} />
                        </td>

                        <td
                            style={{ ...tdStyle, ...clickableCellStyle }}
                            onClick={() => {
                                setModalRowId(row.id);
                                setModalType("needle");
                            }}
                            title="Click to edit Needle"
                        >
                            <NeedleSummary needleProperty={row.needleProperty} />
                        </td>

                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"  // This prevents negative numbers in most browsers
                                style={inputStyle}
                                value={row.processParameter?.voltage || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateProcessParam(row.id, "voltage", value);
                                    }
                                }}
                            />
                        </td>

                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={row.processParameter?.flowRate || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateProcessParam(row.id, "flowRate", value);
                                    }
                                }}
                            />
                        </td>

                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={row.processParameter?.tipCollectorDistance || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateProcessParam(row.id, "tipCollectorDistance", value);
                                    }
                                }}
                            />
                        </td>

                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={row.processParameter?.spinningDuration || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateProcessParam(row.id, "spinningDuration", value);
                                    }
                                }}
                            />
                        </td>

                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={row.ambientParameter?.temperature || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateAmbientParam(row.id, "temperature", value);
                                    }
                                }}
                            />
                        </td>

                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={row.ambientParameter?.humidity || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateAmbientParam(row.id, "humidity", value);
                                    }
                                }}
                            />
                        </td>


                        <td style={tdStyle}>
                            <select
                                style={inputStyle}
                                value={
                                    row.fiberProperty?.isFormationStable === true
                                        ? "yes"
                                        : row.fiberProperty?.isFormationStable === false
                                            ? "no"
                                            : ""  // no selection by default
                                }
                                onChange={(e) => {
                                    const val = e.target.value;
                                    updateFiberProperties(
                                        row.id,
                                        "isFormationStable",
                                        val === "yes" ? true : val === "no" ? false : null
                                    );
                                }}
                            >
                                <option value="" disabled>
                                    -- Select --
                                </option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </td>


                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={row.fiberProperty?.fiberDiameter || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateFiberProperties(row.id, "fiberDiameter", value);
                                    }
                                }}
                            />
                        </td>

                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={row.fiberProperty?.fiberDiameterVariation || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateFiberProperties(row.id, "fiberDiameterVariation", value);
                                    }
                                }}
                            />
                        </td>

                        <td style={tdStyle}>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={row.fiberProperty?.productWeight || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) {
                                        updateFiberProperties(row.id, "productWeight", value);
                                    }
                                }}
                            />
                        </td>


                        <td
                            style={{ ...tdStyle, ...clickableCellStyle }}
                            onClick={() => {
                                setModalRowId(row.id);
                                setModalType("fiberMorphology");
                            }}
                            title="Click to edit Fiber Morphology"
                        >
                            <FiberMorphologySummary fiberMorphology={row.fiberProperty?.fiberMorphology || []} />

                        </td>

                        <td
                            style={{ ...tdStyle, ...clickableCellStyle }}
                            onClick={() => {
                                setModalRowId(row.id);
                                setModalType("uploadImage");
                            }}
                            title="Click to upload Images"
                        >
                            <FiberImagesSummary fiberImages={rows.find(r => r.id === modalRowId)?.fiberImages || []} />
                        </td>


                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modals */}
            {modalType === "polymer" && modalRowId && (
                <PolymerModal
                    key={modalRowId}  // Add this key!
                    isOpen={true}
                    onClose={closeModal}
                    polymerList={rows.find((r) => r.id === modalRowId)?.polymerProperty.polymerComponents || []}
                    onSave={(data) => savePolymerData(modalRowId, data)}
                />
            )}

            {modalType === "solvent" && modalRowId && (
                <SolventModal
                    isOpen={true}
                    onClose={closeModal}
                    solventList={rows.find((r) => r.id === modalRowId)?.solventProperty.solventComponents || []}
                    onSave={(data) => saveSolventData(modalRowId, data)}
                />
            )}
            {modalType === "solution" && modalRowId && (
                <SolutionModal
                    isOpen={true}
                    onClose={closeModal}
                    solution={rows.find((r) => r.id === modalRowId)?.solutionProperty}
                    onSave={(data) => saveSolutionData(modalRowId, data)}
                />
            )}
            {modalType === "collector" && modalRowId && (
                <CollectorModal
                    isOpen={true}
                    onClose={closeModal}
                    collector={rows.find((r) => r.id === modalRowId)?.collectorProperty}
                    onSave={(data) => saveCollectorData(modalRowId, data)}
                />
            )}
            {modalType === "needle" && modalRowId && (
                <NeedleModal
                    isOpen={true}
                    onClose={closeModal}
                    needleData={rows.find((r) => r.id === modalRowId)?.needleProperty || {}}
                    onSave={(data) => saveNeedleData(modalRowId, data)}
                />
            )}
            {modalType === "fiberMorphology" && modalRowId && (() => {
                const selectedRow = rows?.find(r => r.id === modalRowId);
                if (!selectedRow) return null;

                return (
                    <FiberMorphologyModal
                        isOpen={true}
                        onClose={closeModal}
                        initialSelection={transformSavedData(selectedRow.fiberProperty?.fiberMorphology || [])}
                        onSave={(data) => saveFiberMorphologyData(modalRowId, data)}
                    />
                );
            })()}


            {modalType === "uploadImage" && modalRowId && (
                <UploadImageModal
                    isOpen={true}
                    onClose={() => setModalType(null)}
                    initialImages={groupImagesByType(rows.find(r => r.id === modalRowId)?.fiberImages) || {}}
                    onSave={({ fiberImages }) => {
                        setRows((prevRows) =>
                            prevRows.map((r) =>
                                r.id === modalRowId
                                    ? { ...r, fiberImages }  // save flat array here
                                    : r
                            )
                        );
                        setModalType(null);
                    }}
                />

            )}


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Your existing Submit and Cancel buttons */}
            <div style={submitDivBtnStyle}>
                <button
                    style={submitBtnStyle}
                    onClick={() => {
                        setRows(initialRows);
                        navigate('/');
                    }}
                >
                    Cancel
                </button>
                <button
                    style={cancelBtnStyle}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );

}
