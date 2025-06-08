import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import styles from '../../styles/preview/PreviewDatasetPageStyles';
import {fetchAllDatasetJson} from '../../services/datasetService';

const PAGE_SIZE = 10;

export default function PreviewDatasetPage() {
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterPolymer, setFilterPolymer] = useState('');
    const [filterNeedleType, setFilterNeedleType] = useState('');
    const [filterCollectorType, setFilterCollectorType] = useState('');
    const [filterSolvent, setFilterSolvent] = useState('');  // New solvent filter state
    const observer = useRef();

    // Filtered data based on polymer, needle type, collector type, AND solvent filters
    const filteredData = allData.filter(item => {
        const polymerMatch = item.polymerProperty?.polymerComponents?.some(p =>
            p.polymerName.toLowerCase().includes(filterPolymer.toLowerCase())
        );

        const needleMatch = item.needleProperty?.needleType
            ?.toLowerCase()
            .includes(filterNeedleType.toLowerCase());

        const collectorMatch = item.collectorProperty?.collectorType
            ?.toLowerCase()
            .includes(filterCollectorType.toLowerCase());

        const solventMatch = item.solventProperty?.solventComponents?.some(s =>
            s.solventName.toLowerCase().includes(filterSolvent.toLowerCase())
        );

        const polymerFilterActive = filterPolymer.trim() !== '';
        const needleFilterActive = filterNeedleType.trim() !== '';
        const collectorFilterActive = filterCollectorType.trim() !== '';
        const solventFilterActive = filterSolvent.trim() !== '';

        // Combine filters; only include filters that are active
        if (polymerFilterActive && needleFilterActive && collectorFilterActive && solventFilterActive) {
            return polymerMatch && needleMatch && collectorMatch && solventMatch;
        }
        if (polymerFilterActive && needleFilterActive && collectorFilterActive) {
            return polymerMatch && needleMatch && collectorMatch;
        }
        if (polymerFilterActive && needleFilterActive && solventFilterActive) {
            return polymerMatch && needleMatch && solventMatch;
        }
        if (polymerFilterActive && collectorFilterActive && solventFilterActive) {
            return polymerMatch && collectorMatch && solventMatch;
        }
        if (needleFilterActive && collectorFilterActive && solventFilterActive) {
            return needleMatch && collectorMatch && solventMatch;
        }
        if (polymerFilterActive && needleFilterActive) {
            return polymerMatch && needleMatch;
        }
        if (polymerFilterActive && collectorFilterActive) {
            return polymerMatch && collectorMatch;
        }
        if (polymerFilterActive && solventFilterActive) {
            return polymerMatch && solventMatch;
        }
        if (needleFilterActive && collectorFilterActive) {
            return needleMatch && collectorMatch;
        }
        if (needleFilterActive && solventFilterActive) {
            return needleMatch && solventMatch;
        }
        if (collectorFilterActive && solventFilterActive) {
            return collectorMatch && solventMatch;
        }
        if (polymerFilterActive) {
            return polymerMatch;
        }
        if (needleFilterActive) {
            return needleMatch;
        }
        if (collectorFilterActive) {
            return collectorMatch;
        }
        if (solventFilterActive) {
            return solventMatch;
        }
        return true; // no filter active, show all
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const result = await fetchAllDatasetJson(); // call service here
                setAllData(result);
                setData(result.slice(0, PAGE_SIZE));
                setHasMore(result.length > PAGE_SIZE);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
            setLoading(false);
        };

        loadData();
    }, []);


    useEffect(() => {
        setData(filteredData.slice(0, PAGE_SIZE));
        setHasMore(filteredData.length > PAGE_SIZE);
    }, [filterPolymer, filterNeedleType, filterCollectorType, filterSolvent, allData]); // Added solvent filter

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;
        const next = filteredData.slice(data.length, data.length + PAGE_SIZE);
        setData(prev => [...prev, ...next]);
        setHasMore(filteredData.length > data.length + PAGE_SIZE);
    }, [loading, hasMore, data, filteredData]);

    const lastRowRef = useCallback(
        node => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore, loadMore]
    );

    return (
        <div style={styles.page}>
            <h2 style={styles.heading}>Preview Dataset</h2>

            {/* Filters */}
            <div style={styles.filters}>
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel} htmlFor="polymerFilter">Polymer</label>
                    <input
                        id="polymerFilter"
                        type="text"
                        value={filterPolymer}
                        onChange={(e) => setFilterPolymer(e.target.value)}
                        placeholder="e.g., PCL"
                        style={styles.inputField}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel} htmlFor="solventFilter">Solvent</label>
                    <input
                        id="solventFilter"
                        type="text"
                        value={filterSolvent}
                        onChange={(e) => setFilterSolvent(e.target.value)}
                        placeholder="e.g., DMF"
                        style={styles.inputField}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel} htmlFor="needleFilter">Needle Type</label>
                    <input
                        id="needleFilter"
                        type="text"
                        value={filterNeedleType}
                        onChange={(e) => setFilterNeedleType(e.target.value)}
                        placeholder="e.g., Single Needle"
                        style={styles.inputField}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel} htmlFor="collectorFilter">Collector Type</label>
                    <input
                        id="collectorFilter"
                        type="text"
                        value={filterCollectorType}
                        onChange={(e) => setFilterCollectorType(e.target.value)}
                        placeholder="e.g., Flat"
                        style={styles.inputField}
                    />
                </div>

            </div>


            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th>##</th>
                        <th>Polymers</th>
                        <th>Solvents</th>
                        <th>Concentration</th>
                        <th>Collector Type</th>
                        <th>Collector RPM (if applicable)</th>
                        <th>Needle Type</th>
                        <th>Needle Property</th>
                        <th>Voltage</th>
                        <th>Flow Rate</th>
                        <th>Stable Formation</th>
                        <th>Fiber Diameter</th>
                        <th>Fiber Diameter STDEV</th>
                        <th>Product Weight</th>
                        <th>Experiment Quality Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            ref={index === data.length - 1 ? lastRowRef : null}
                        >
                            <td>{index + 1}</td>
                            <td>
                                {item.polymerProperty?.polymerComponents?.map(p =>
                                    `${p.polymerName}`
                                ).join(', ')}
                            </td>
                            <td>
                                {item.solventProperty?.solventComponents?.map(s =>
                                    `${s.solventName}`
                                ).join(', ')}
                            </td>
                            <td>{item.solutionProperty?.concentration} {item.solutionProperty?.concentrationUnit}</td>
                            <td>{item.collectorProperty?.collectorType}</td>
                            <td>{item.collectorProperty?.collectorDefinition?.rotationSpeed}</td>
                            <td>{item.needleProperty?.needleType}</td>
                            <td>{item.needleProperty?.needleDefinition?.diameter} {item.needleProperty?.needleDefinition?.diameterUnit}</td>
                            <td>{item.processParameter?.voltage} {item.processParameter?.voltageUnit}</td>
                            <td>{item.processParameter?.flowRate} {item.processParameter?.flowRateUnit}</td>
                            <td>{item.fiberProperty?.isFormationStable ? 'Yes' : 'No'}</td>
                            <td>{item.fiberProperty?.fiberDiameter} {item.fiberProperty?.fiberDiameterUnit}</td>
                            <td>{item.fiberProperty?.fiberDiameterVariation} {item.fiberProperty?.fiberDiameterVariationUnit}</td>
                            <td>{item.fiberProperty?.productWeight} {item.fiberProperty?.productWeightUnit}</td>
                            <td>{item.fiberProperty?.qualityGrade}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {loading && <p style={styles.status}>Loading...</p>}
            {!hasMore && !loading && <p style={styles.status}>You've reached the end of the dataset.</p>}
        </div>
    );
}
