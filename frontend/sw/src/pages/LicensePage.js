import React from 'react';
import '../styles/legal.css';

const LicensePage = () => (
    <div className="legal-container">
        <h1>License Agreement</h1>
        <p>
            The datasets provided on this platform are licensed under the{" "}
            <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong> License.
        </p>

        <section>
            <h2>What You Can Do</h2>
            <p>With this license, you are free to:</p>
            <ul>
                <li><strong>Share:</strong> You can copy, redistribute, and use the datasets in any medium or format for any purpose, including personal and academic research.</li>
                <li><strong>Adapt:</strong> You may remix, transform, and build upon the datasets. This includes creating derivative works and using them for commercial purposes if needed.</li>
            </ul>
        </section>

        <section>
            <h2>Conditions for Use</h2>
            <p>When using the datasets, you must adhere to the following terms:</p>
            <ul>
                <li><strong>Attribution:</strong> You must provide appropriate credit. This includes clearly identifying the source of the dataset, including a link to the license, and indicating if any changes were made to the original data.</li>
                <li><strong>No Additional Restrictions:</strong> You may not apply legal or technological measures that would prevent others from using the datasets as allowed by this license. For instance, you cannot impose your own licensing terms that restrict others from remixing or redistributing the material under the same CC BY 4.0 license.</li>
            </ul>
        </section>

        <section>
            <h2>Full License Text</h2>
            <p>
                For detailed information about the full terms and conditions of the Creative Commons Attribution 4.0 International License, please refer to the full license text available{" "}
                <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>.
            </p>
        </section>

        <section>
            <h2>Why This License?</h2>
            <p>
                The Creative Commons Attribution 4.0 International License (CC BY 4.0) allows for maximum freedom to use, modify, and share the datasets, while ensuring that proper credit is given to the original creators. This is in line with our commitment to open, collaborative research in the field of electrospinning.
            </p>
        </section>
    </div>
);

export default LicensePage;
