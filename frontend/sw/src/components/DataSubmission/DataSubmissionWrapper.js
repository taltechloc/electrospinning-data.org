
import React, { useState } from "react";
import UserMetadataForm from "./UserMetadataForm";
import ElectrospinningTable from "./ElectrospinningTable";
import { sendDataToBackend } from "../../services/dataService";
import ResearchMetadataForm from "./ResearchMetadataForm";
import { Helmet } from 'react-helmet';

export default function DataSubmissionWrapper() {
    const [step, setStep] = useState(1);
    const [userMetadata, setUserMetadata] = useState(null);
    const [researchMetadata, setResearchMetadata] = useState(null);
    const [experimentData, setExperimentData] = useState(null);

    const handleUserMetadataNext = (data) => {
        setUserMetadata(data);
        setStep(2);
    };

    const handleResearchMetadataNext = (data) => {
        setResearchMetadata(data);
        setStep(3);
    };

    const handleExperimentDataSubmit = async (dataFromTable) => {
        setExperimentData(dataFromTable);

        const payload = {
            userMetadata,
            researchMetadata,
            experimentData: dataFromTable,
        };

        console.log("Sending combined payload:", payload);

        try {
            const responseData = await sendDataToBackend(payload);
            console.log("Response data:", responseData);

            // If plain text, you can show it directly or do other logic
            alert(`Success: ${responseData}`);
        } catch (e) {
            console.error("Error caught in handleExperimentDataSubmit:", e);
            alert("Failed to send data.");
        }
    };


    return (
        <>
            <Helmet>
                <link rel="canonical" href="https://electrospinning-data.org/electrospinningTable" />
            </Helmet>

            <div>
            {step === 1 && <UserMetadataForm onNext={handleUserMetadataNext} />}
            {step === 2 && (
                <ResearchMetadataForm
                    onNext={handleResearchMetadataNext}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && (
                <ElectrospinningTable
                    onSubmit={handleExperimentDataSubmit}
                />
            )}
        </div>
        </>

    );
}
