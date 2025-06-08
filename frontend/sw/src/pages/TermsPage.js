import React from 'react';
import '../styles/legal.css';

const TermsPage = () => (
    <div className="legal-container">
        <h1>Terms and Conditions</h1>
        <p>By accessing, using, or contributing to this open-source electrospinning dataset platform, you agree to the following terms and conditions:</p>

        <section>
            <h2>1. Open Source Use</h2>
            <ul>
                <li><strong>Free Use:</strong> The datasets and platform are provided under an open-source license, meaning they are free to use, modify, and distribute for academic, research, and non-commercial purposes.</li>
                <li><strong>Attribution:</strong> When using or redistributing the datasets, proper attribution must be given to the authors and the platform. Please cite this platform and its associated research in your publications or derivatives.</li>
            </ul>
        </section>

        <section>
            <h2>2. Data License</h2>
            <ul>
                <li><strong>CC0 License (or equivalent):</strong> All datasets on this platform are released under a <strong>CC0 Public Domain Dedication</strong> (or equivalent open license). This means you may use, share, and modify the data without any restrictions, as long as proper attribution is provided.</li>
                <li><strong>Non-Commercial Use:</strong> While the data is freely available, it must not be used for commercial purposes unless explicitly authorized by the platform developers.</li>
            </ul>
        </section>

        <section>
            <h2>3. Moderation of Datasets</h2>
            <ul>
                <li><strong>Moderation Process:</strong> All datasets submitted to the platform will undergo a moderation process to ensure that they meet our quality standards, comply with platform guidelines, and adhere to ethical research practices.</li>
                <li><strong>Approval for Publication:</strong> Datasets will be reviewed and approved before they are made publicly available on the platform. This process ensures that the data meets the requirements for open sharing and academic use.</li>
                <li><strong>Responsibility:</strong> While the platform provides an open and collaborative environment, contributors are responsible for ensuring their datasets meet the necessary ethical and legal guidelines before submission.</li>
            </ul>
        </section>

        <section>
            <h2>4. Open Contributions</h2>
            <ul>
                <li><strong>Community Contributions:</strong> This platform thrives on community-driven contributions. By submitting datasets, you grant others the right to use, share, and build upon your contributions under the same open terms.</li>
                <li><strong>Data Ownership:</strong> You retain ownership of any datasets you contribute, but agree to release them for free use under the platform's open-source license.</li>
                <li><strong>Contributions to Code:</strong> The platform’s source code is also open-source. By contributing to the platform's codebase, you agree to license your contributions under the same terms as the project's main repository (e.g., MIT License or similar).</li>
            </ul>
        </section>

        <section>
            <h2>5. Data Quality and No Warranty</h2>
            <ul>
                <li><strong>Dataset Integrity:</strong> Datasets are contributed by the community and undergo a moderation process. However, we do not guarantee the accuracy, completeness, or fitness for any specific purpose of the datasets.</li>
                <li><strong>No Warranty:</strong> All datasets are provided "as is" without warranties of any kind. Use them at your own risk.</li>
            </ul>
        </section>

        <section>
            <h2>6. Ethical Use</h2>
            <ul>
                <li><strong>Responsible Use:</strong> You agree to use the datasets and platform in an ethical and responsible manner. Misuse of the datasets for harmful, illegal, or unethical activities is strictly prohibited.</li>
                <li><strong>Compliance with Laws:</strong> Users must comply with all relevant laws and regulations when using the platform and datasets, including any applicable data privacy laws.</li>
            </ul>
        </section>

        <section>
            <h2>7. Limitation of Liability</h2>
            <ul>
                <li><strong>No Liability:</strong> The platform developers and contributors are not liable for any damages, losses, or issues arising from the use or misuse of the datasets or the platform. Use the platform and data at your own discretion and risk.</li>
            </ul>
        </section>

        <section>
            <h2>8. Contact and Permissions</h2>
            <p>If you have any questions about these terms, the platform, or data usage, please contact us at <a href="mailto:mehrab.mahdian@taltech.ee">mehrab.mahdian@taltech.ee</a>.</p>
        </section>
    </div>
);

export default TermsPage;
