function renderUniversity() {
    return universityHTML;
}

const universityHTML = `
<div class="container">
    <div class="card hero-card">
        <h2>🏛️ University Curriculum Intelligence & Market Adaptation</h2>
        <p>Comprehensive market-driven curriculum updating guide across 4-year Bachelor's degree programs.</p>
    </div>

    <!-- Department Summary Cards -->
    <div class="sector-grid" style="margin-bottom: 28px;">
        <div class="card border-blue clickable-card" onclick="openDetailModal('university', 'cs', 'uni_1')">
            <h3>Computer Science Dept.</h3>
            <p><strong>Alignment Index:</strong> 74%</p>
            <p><strong>Primary Market Deficit:</strong> Cloud Architecture, Containerization, MLOps</p>
            <div style="margin-top: 12px; font-size: 12px; color: #059669; font-weight: bold;">🔍 Click to inspect breakdown →</div>
        </div>
        <div class="card border-purple clickable-card" onclick="openDetailModal('university', 'medicine', 'uni_2')">
            <h3>Medical Sciences Dept.</h3>
            <p><strong>Alignment Index:</strong> 81%</p>
            <p><strong>Primary Market Deficit:</strong> Digital Health, ISO/FDA Regulatory Auditing</p>
            <div style="margin-top: 12px; font-size: 12px; color: #059669; font-weight: bold;">🔍 Click to inspect breakdown →</div>
        </div>
        <div class="card border-emerald clickable-card" onclick="openDetailModal('university', 'commerce', 'uni_3')">
            <h3>Business & Commerce Dept.</h3>
            <p><strong>Alignment Index:</strong> 68%</p>
            <p><strong>Primary Market Deficit:</strong> Predictive Financial Modeling, SAP/ERP Systems</p>
            <div style="margin-top: 12px; font-size: 12px; color: #059669; font-weight: bold;">🔍 Click to inspect breakdown →</div>
        </div>
    </div>

    <!-- 4-Year Bachelor's Curriculum Update Plan -->
    <div class="card" style="border-top: 4px solid #059669;">
        <h3 style="color: #064e3b; margin-bottom: 8px;">📌 Proposed Bachelor's Curriculum Timeline (4-Year Roadmap)</h3>
        <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">
            To ensure students graduate industry-ready, universities should implement updates progressively across specific undergraduate years rather than delaying modern skills to final-year electives.
        </p>

        <div style="display: flex; flex-direction: column; gap: 16px;">
            <!-- Year 1 -->
            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px;">
                <h4 style="color: #1e3a8a; font-size: 16px;">1️⃣ First Year (Freshman): Industry-Standard Foundations</h4>
                <p style="font-size: 13.5px; color: #334155; margin-top: 6px;"><strong>When to Update:</strong> Introduce modern tooling early in lab sessions alongside theoretical fundamentals.</p>
                <ul style="margin-left: 20px; font-size: 13.5px; color: #475569; margin-top: 6px;">
                    <li><strong>Computer Science:</strong> Git/GitHub version control, Linux command line, Python/Modern C++ basics.</li>
                    <li><strong>Medicine:</strong> Electronic Health Record (EHR) basics, modern medical literature research tools.</li>
                    <li><strong>Commerce:</strong> Applied Excel & Spreadsheet Automation alongside basic Accounting and Economics.</li>
                </ul>
            </div>

            <!-- Year 2 -->
            <div style="background: #f8fafc; border-left: 4px solid #8b5cf6; padding: 16px; border-radius: 8px;">
                <h4 style="color: #4c1d95; font-size: 16px;">2️⃣ Second Year (Sophomore): Modern Core & Tooling Enhancement</h4>
                <p style="font-size: 13.5px; color: #334155; margin-top: 6px;"><strong>When to Update:</strong> Embed practical tools into core theoretical courses.</p>
                <ul style="margin-left: 20px; font-size: 13.5px; color: #475569; margin-top: 6px;">
                    <li><strong>Computer Science:</strong> REST APIs, Database ORMs, Docker containers in Data Structures & Web Design.</li>
                    <li><strong>Medicine:</strong> Biomedical Instrumentation, Signal Processing, Good Clinical Practice (GCP) introductory modules.</li>
                    <li><strong>Commerce:</strong> Financial Modeling with Excel/VBA, SQL for business data analysis, Digital Marketing analytics.</li>
                </ul>
            </div>

            <!-- Year 3 -->
            <div style="background: #f8fafc; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px;">
                <h4 style="color: #78350f; font-size: 16px;">3️⃣ Third Year (Junior): Applied Market Specialization</h4>
                <p style="font-size: 13.5px; color: #334155; margin-top: 6px;"><strong>When to Update:</strong> Add elective streams directly mapped to high-demand job roles.</p>
                <ul style="margin-left: 20px; font-size: 13.5px; color: #475569; margin-top: 6px;">
                    <li><strong>Computer Science:</strong> AWS/GCP Cloud Deployment, MLOps, CI/CD Pipelines, Microservices, Cybersecurity SIEM.</li>
                    <li><strong>Medicine:</strong> ISO 13485 Compliance, Regulatory Auditing, Computational Neuroscience, Clinical Trial Management Systems.</li>
                    <li><strong>Commerce:</strong> SAP ERP Logistics, PowerBI Data Storytelling, Predictive Econometric Forecasting, Salesforce CRM.</li>
                </ul>
            </div>

            <!-- Year 4 -->
            <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px;">
                <h4 style="color: #064e3b; font-size: 16px;">4️⃣ Fourth Year (Senior): Capstone & Industry Immersion</h4>
                <p style="font-size: 13.5px; color: #334155; margin-top: 6px;"><strong>When to Update:</strong> Replace passive thesis projects with industry-partnered capstones and certification tracks.</p>
                <ul style="margin-left: 20px; font-size: 13.5px; color: #475569; margin-top: 6px;">
                    <li><strong>All Departments:</strong> mandatory capstone project using current industry stack + active portfolio building.</li>
                    <li><strong>Industry Partnerships:</strong> Guest lectures and guest-guided workshops addressing real-world employer requirements.</li>
                </ul>
            </div>
        </div>
    </div>
</div>
`;