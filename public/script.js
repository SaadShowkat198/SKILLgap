// Global User Session State
let currentUser = null;

// ==========================================
// 1. DOMAIN & FIELD OPTIONS DEFINITION
// ==========================================
const fieldDomains = {
    cs: [
        { id: "all", name: "All CS Specializations" },
        { id: "cybersecurity", name: "Cybersecurity & Defense" },
        { id: "software_eng", name: "Software Engineering" },
        { id: "web_dev", name: "Web & Mobile Development" },
        { id: "data_ai", name: "Data Science & AI" }
    ],
    medicine: [
        { id: "all", name: "All Medical Specialties" },
        { id: "biomedical", name: "Biomedical Engineering" },
        { id: "neurology", name: "Neurology & Brain Sciences" },
        { id: "pharmacology", name: "Pharmacology & Clinical Research" },
        { id: "public_health", name: "Public Health & Epidemiology" }
    ],
    commerce: [
        { id: "all", name: "All Business Disciplines" },
        { id: "economics", name: "Economics & Market Analysis" },
        { id: "business_admin", name: "Business Administration & Management" },
        { id: "accounting", name: "Accounting & Corporate Finance" },
        { id: "marketing", name: "Digital Marketing & Strategy" }
    ]
};

// ==========================================
// 2. DATASETS FOR GRADUATE STUDENTS
// ==========================================
const studentMarketData = {
    cs: [
        { id: "cs_1", domain: "software_eng", degree: "B.Sc in Computer Science", border: "border-blue", core: "Data Structures, Java, Algorithms, SQL", gaps: ["Docker & Kubernetes", "AWS Cloud Deployment", "CI/CD Pipelines"], description: "Prepares graduates with fundamental computing concepts. High industry demand exists for modern container orchestration and automated cloud deployment workflows." },
        { id: "cs_2", domain: "software_eng", degree: "B.Sc in Software Engineering", border: "border-purple", core: "OOP, Design Patterns, Web Tech, Software Testing", gaps: ["Microservices Architecture", "GraphQL", "System Design"], description: "Focuses on software life cycle models. Industry expectations emphasize scalable distributed systems architecture." },
        { id: "cs_3", domain: "data_ai", degree: "B.Sc in Data Science & AI", border: "border-pink", core: "Linear Algebra, Statistics, Python, ML Basics", gaps: ["PyTorch / TensorFlow", "MLOps & Model Deployment", "Apache Spark"], description: "Covers statistical modeling and predictive algorithms. Transitioning models into production requires deep learning frameworks and operational MLOps." },
        { id: "cs_4", domain: "cybersecurity", degree: "B.Sc in Cyber Security", border: "border-emerald", core: "Cryptography, Network Security, Ethical Hacking", gaps: ["SIEM Tooling (Splunk)", "Cloud Threat Hunting", "Zero Trust Framework"], description: "Provides foundational defensive capabilities. Security Operations Centers require practical familiarity with telemetry analysis and enterprise Zero Trust rules." }
    ],
    medicine: [
        { id: "med_1", domain: "biomedical", degree: "B.Sc in Biomedical Engineering", border: "border-blue", core: "Biomechanics, Biomaterials, Human Physiology, Medical Imaging", gaps: ["3D Bioprinting", "FDA Device Compliance", "Regulatory Auditing"], description: "Bridges engineering concepts with healthcare delivery. Industry standards prioritize knowledge of medical device software validation and regulatory approvals." },
        { id: "med_2", domain: "neurology", degree: "B.Sc in Neurobiology & Neuroscience", border: "border-purple", core: "Neuroanatomy, Neurophysiology, Signal Processing, Bio-statistics", gaps: ["Neural Interface Tech", "Functional MRI Processing", "Computational Neuroscience"], description: "Analyzes biological nervous systems. Modern research centers demand computational EEG and advanced fMRI dataset analysis software." },
        { id: "med_3", domain: "pharmacology", degree: "B.Sc in Pharmaceutical Sciences", border: "border-pink", core: "Organic Chemistry, Pharmaceutics, Pharmacokinetics, Biochemistry", gaps: ["Clinical Trial Management Systems", "High-Throughput Screening", "Gene Editing Proteomics"], description: "Focuses on drug synthesis and formulation. Modern pharma roles expect proficiency in digital trial tracking platforms and genomic targeting tools." }
    ],
    commerce: [
        { id: "com_1", domain: "economics", degree: "B.Sc in Economics & Quantitative Analysis", border: "border-blue", core: "Microeconomics, Econometrics, Calculus, Financial Systems", gaps: ["Python for Econometrics", "PowerBI Data Storytelling", "Predictive Forecasting"], description: "Teaches quantitative resource distribution models. Enterprise analytical roles require programmatic data manipulation via Python and interactive BI dashboarding." },
        { id: "com_2", domain: "business_admin", degree: "Bachelor of Business Administration (BBA)", border: "border-purple", core: "Principles of Management, Marketing, Business Law, HR", gaps: ["Agile Product Management", "Salesforce CRM Analytics", "ERP (SAP) Logistics"], description: "Provides broad organizational knowledge. Modern enterprises seek practical certifications in enterprise resource planning (SAP) and product owner frameworks." },
        { id: "com_3", domain: "accounting", degree: "B.Sc in Accounting & Corporate Finance", border: "border-emerald", core: "Financial Accounting, Auditing, Taxation, Corporate Law", gaps: ["Financial Modeling in Excel/VBA", "IFRS 17 Standards", "Automated Auditing AI"], description: "Covers financial reporting and control frameworks. Banking and consulting institutions require advanced valuation modeling and automated audit trail software." }
    ]
};

// ==========================================
// 3. DATASETS FOR JOB SEEKERS
// ==========================================
const jobMarketData = {
    cs: [
        { id: "job_cs_1", domain: "web_dev", title: "Frontend Engineering Specialist", company: "TechCorp Global", border: "border-blue", skills: "React, TypeScript, Next.js, Tailwind CSS", matched: ["React"], missing: ["TypeScript", "Tailwind CSS"], salary: "$95,000 - $125,000", responsibilities: "Building accessible user interfaces, optimizing rendering pipelines, and integrating backend REST/GraphQL APIs." },
        { id: "job_cs_2", domain: "cybersecurity", title: "Cyber Threat Analyst", company: "SecureNet Systems", border: "border-amber", skills: "SIEM Tools, Incident Response, Python, Network Auditing", matched: ["Python"], missing: ["SIEM Tools", "Network Auditing"], salary: "$105,000 - $135,000", responsibilities: "Monitoring security events, performing log analysis, and containing threat vectors across cloud workloads." },
        { id: "job_cs_3", domain: "data_ai", title: "AI/ML Solutions Engineer", company: "Nexus Dynamics", border: "border-pink", skills: "Python, PyTorch, LLM Fine-Tuning, Vector DBs", matched: ["Python"], missing: ["PyTorch", "Vector DBs"], salary: "$120,000 - $160,000", responsibilities: "Deploying enterprise language models, setting up retrieval-augmented generation pipelines, and optimizing vector indexing." }
    ],
    medicine: [
        { id: "job_med_1", domain: "biomedical", title: "Biomedical Systems Engineer", company: "HealthTech Innovations", border: "border-blue", skills: "Medical Electronics, Physiology, Embedded Systems, ISO 13485", matched: ["Physiology"], missing: ["ISO 13485 Compliance"], salary: "$85,000 - $115,000", responsibilities: "Designing patient monitoring devices and maintaining ISO quality documentation." },
        { id: "job_med_2", domain: "pharmacology", title: "Clinical Research Associate", company: "BioPharma Labs", border: "border-purple", skills: "GCP Standards, Clinical Protocols, Data Auditing, Bio-statistics", matched: ["Bio-statistics"], missing: ["GCP Standards"], salary: "$78,000 - $102,000", responsibilities: "Monitoring clinical trial sites, ensuring protocol compliance, and managing patient safety data." }
    ],
    commerce: [
        { id: "job_com_1", domain: "accounting", title: "Corporate Financial Analyst", company: "Apex Financial Group", border: "border-emerald", skills: "Financial Valuation, Excel/VBA, PowerBI, Forecasting", matched: ["Financial Valuation"], missing: ["PowerBI"], salary: "$80,000 - $110,000", responsibilities: "Building corporate valuation models, forecasting quarterly revenues, and creating executive dashboards." },
        { id: "job_com_2", domain: "business_admin", title: "Agile Operations Manager", company: "Vanguard Enterprise", border: "border-purple", skills: "Scrum Methodology, Product Strategy, JIRA, SAP ERP", matched: ["Product Strategy"], missing: ["JIRA"], salary: "$90,000 - $120,000", responsibilities: "Managing cross-functional team workflows, facilitating sprint planning, and streamlining supply operations." }
    ]
};

// ==========================================
// 4. DROPDOWN HANDLERS & RENDERING
// ==========================================
function handleStudentFieldChange(fieldKey) {
    const domainSelect = document.getElementById('student-domain-select');
    if (!domainSelect) return;
    const domains = fieldDomains[fieldKey] || fieldDomains.cs;
    domainSelect.innerHTML = domains.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    renderStudentDashboard();
}

function handleJobseekerFieldChange(fieldKey) {
    const domainSelect = document.getElementById('jobseeker-domain-select');
    if (!domainSelect) return;
    const domains = fieldDomains[fieldKey] || fieldDomains.cs;
    domainSelect.innerHTML = domains.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    renderJobFeed();
}

function renderStudentDashboard() {
    const container = document.getElementById('student-feed-container');
    if (!container) return;

    const fieldKey = document.getElementById('student-field-select')?.value || 'cs';
    const selectedDomain = document.getElementById('student-domain-select')?.value || 'all';

    let list = studentMarketData[fieldKey] || [];
    if (selectedDomain !== 'all') {
        list = list.filter(item => item.domain === selectedDomain);
    }

    if (list.length === 0) {
        container.innerHTML = `<div class="card" style="grid-column: 1/-1;"><p>No academic curriculums found matching the selected specialization filter.</p></div>`;
        return;
    }

    container.innerHTML = list.map(item => `
        <div class="card sector-card clickable-card ${item.border}" onclick="openDetailModal('student', '${fieldKey}', '${item.id}')">
            <h3>${item.degree}</h3>
            <p><strong>Academic Core:</strong> ${item.core}</p>
            <h4>Identified Industry Gaps:</h4>
            ${item.gaps.map(gap => `<span class="badge-red">${gap}</span>`).join('')}
            <div style="margin-top: 15px; font-size: 12px; color: #059669; font-weight: bold;">🔍 Click card to inspect full gap breakdown →</div>
        </div>
    `).join('');
}

function renderJobFeed() {
    const container = document.getElementById('job-feed-container');
    if (!container) return;

    const fieldKey = document.getElementById('jobseeker-field-select')?.value || 'cs';
    const selectedDomain = document.getElementById('jobseeker-domain-select')?.value || 'all';

    let list = jobMarketData[fieldKey] || [];
    if (selectedDomain !== 'all') {
        list = list.filter(item => item.domain === selectedDomain);
    }

    if (list.length === 0) {
        container.innerHTML = `<div class="card" style="grid-column: 1/-1;"><p>No job roles found matching the selected specialization filter.</p></div>`;
        return;
    }

    container.innerHTML = list.map(job => `
        <div class="card sector-card clickable-card ${job.border}" onclick="openDetailModal('jobseeker', '${fieldKey}', '${job.id}')">
            <h4>${job.title} — <span style="color: #059669;">${job.company}</span></h4>
            <p><strong>Required Skills:</strong> ${job.skills}</p>
            ${job.matched.map(s => `<span class="badge-green">${s} Matched</span>`).join('')}
            ${job.missing.map(s => `<span class="badge-red">${s} Missing</span>`).join('')}
            <div style="margin-top: 15px; font-size: 12px; color: #059669; font-weight: bold;">🔍 Click card to inspect role requirements →</div>
        </div>
    `).join('');
}

// ==========================================
// 5. INTERACTIVE CARD DETAIL MODAL
// ==========================================
function openDetailModal(type, fieldKey, itemId) {
    const modal = document.getElementById('modal-detail');
    const titleEl = document.getElementById('detail-title');
    const bodyEl = document.getElementById('detail-body');

    if (!modal || !titleEl || !bodyEl) return;

    if (type === 'student') {
        const item = (studentMarketData[fieldKey] || []).find(i => i.id === itemId);
        if (!item) return;

        titleEl.innerText = item.degree;
        bodyEl.innerHTML = `
            <p style="font-size: 15px; color: #064e3b; font-weight: 600;">${item.description}</p>
            <hr style="border: none; border-top: 1px solid #d1fae5; margin: 15px 0;">
            <p><strong>📖 Academic Core Subjects:</strong><br>${item.core}</p>
            <p><strong>⚠️ Missing Market Skills (Skill Gaps):</strong></p>
            <ul>
                ${item.gaps.map(g => `<li style="color: #991b1b; font-weight: 600; margin-bottom: 4px;">${g}</li>`).join('')}
            </ul>
            <p style="background: #f0fdf4; padding: 10px; border-radius: 8px; border-left: 4px solid #059669; margin-top: 15px;">
                <strong>Recommendation:</strong> Bridge these gaps through university elective updates or certified short courses before graduation.
            </p>
        `;
    } else if (type === 'jobseeker') {
        const item = (jobMarketData[fieldKey] || []).find(i => i.id === itemId);
        if (!item) return;

        titleEl.innerText = `${item.title} (${item.company})`;
        bodyEl.innerHTML = `
            <p><strong>💰 Estimated Compensation:</strong> ${item.salary}</p>
            <p><strong>📋 Primary Responsibilities:</strong><br>${item.responsibilities}</p>
            <hr style="border: none; border-top: 1px solid #d1fae5; margin: 15px 0;">
            <p><strong>✅ Skills You Possess:</strong></p>
            <div>${item.matched.length ? item.matched.map(m => `<span class="badge-green">${m}</span>`).join('') : '<em>None matched yet</em>'}</div>
            <p style="margin-top: 12px;"><strong>🎯 Missing Skills to Target:</strong></p>
            <div>${item.missing.map(m => `<span class="badge-red">${m}</span>`).join('')}</div>
        `;
    } else if (type === 'university') {
        const details = {
            cs: {
                title: "Computer Science Department Analysis",
                gaps: "Cloud Architecture, DevOps/CI-CD, Docker/Kubernetes, MLOps.",
                timeline: "<strong>Year 1:</strong> Linux & Git fundamentals.<br><strong>Year 2:</strong> REST APIs & Docker.<br><strong>Year 3:</strong> AWS Cloud & MLOps electives.<br><strong>Year 4:</strong> Industry-partnered Capstone."
            },
            medicine: {
                title: "Medical & Healthcare Department Analysis",
                gaps: "Digital Health Systems, Regulatory Compliance (ISO 13485/FDA), Clinical Data Software.",
                timeline: "<strong>Year 1:</strong> Electronic Health Records.<br><strong>Year 2:</strong> Good Clinical Practice (GCP).<br><strong>Year 3:</strong> Medical Device Compliance & Regulatory Auditing.<br><strong>Year 4:</strong> Clinical Site Rotations & Tech Integration."
            },
            commerce: {
                title: "Commerce & Business Department Analysis",
                gaps: "Predictive Analytics, Financial Modeling (Excel/VBA/Python), SAP ERP, PowerBI.",
                timeline: "<strong>Year 1:</strong> Applied Excel & Automated Spreadsheets.<br><strong>Year 2:</strong> Financial Modeling & SQL.<br><strong>Year 3:</strong> PowerBI, SAP ERP & Salesforce CRM.<br><strong>Year 4:</strong> Business Strategy Capstone with Real Market Datasets."
            }
        };

        const d = details[fieldKey] || details.cs;
        titleEl.innerText = d.title;
        bodyEl.innerHTML = `
            <p style="font-size: 15px; color: #064e3b; font-weight: 600;">Departmental Curriculum Action Plan</p>
            <hr style="border: none; border-top: 1px solid #d1fae5; margin: 15px 0;">
            <p><strong>⚠️ High-Priority Skill Deficits:</strong><br>${d.gaps}</p>
            <p style="margin-top: 12px;"><strong>📅 Suggested 4-Year Implementation:</strong></p>
            <p style="font-size: 13px; color: #334155; line-height: 1.8;">${d.timeline}</p>
        `;
    }

    modal.classList.remove('hidden');
}

function closeDetailModal() {
    const modal = document.getElementById('modal-detail');
    if (modal) modal.classList.add('hidden');
}

// ==========================================
// 6. SKILL ASSESSMENT MODAL HANDLERS
// ==========================================
function openAssessmentModal() {
    const assessmentModal = document.getElementById('assessment-modal');
    if (assessmentModal) {
        assessmentModal.style.display = 'flex';
        assessmentModal.classList.remove('hidden');
        
        if (typeof resetAssessmentState === 'function') {
            resetAssessmentState();
        }
    }
}

function closeAssessmentModal() {
    const assessmentModal = document.getElementById('assessment-modal');
    if (assessmentModal) {
        assessmentModal.style.display = 'none';
        assessmentModal.classList.add('hidden');
    }
}

// ==========================================
// 7. NAVIGATION & WINDOW TOGGLING
// ==========================================
function showWindow(windowId, bypassRoleCheck = false) {
    if (!windowId.startsWith('window-')) {
        windowId = 'window-' + windowId;
    }

    if (!bypassRoleCheck && currentUser) {
        if (currentUser.role === 'student' && windowId === 'window-jobseeker') {
            alert('Access Restricted: You are signed up as a Graduate Student. You can only view Student and University views.');
            return;
        }
        if (currentUser.role === 'jobseeker' && windowId === 'window-student') {
            alert('Access Restricted: You are signed up as a Job Seeker. You can only view Job Seeker and University views.');
            return;
        }
    }

    const windows = ['window-home', 'window-student', 'window-jobseeker', 'window-university', 'window-ai'];

    windows.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
            el.classList.remove('fade-in');
        }
    });

    const targetEl = document.getElementById(windowId);
    if (targetEl) {
        targetEl.classList.remove('hidden');
        void targetEl.offsetWidth;
        targetEl.classList.add('fade-in');
    } else {
        console.error("Target window element not found in HTML:", windowId);
    }
}

// ==========================================
// 7b. 100% SCORE -> RELEVANT JOB OFFERS
// ==========================================
const subjectJobMap = {
    cs_ds: { field: 'cs', domain: 'all' },
    cs_web: { field: 'cs', domain: 'web_dev' },
    cs_cloud: { field: 'cs', domain: 'all' },
    bus_fin: { field: 'commerce', domain: 'accounting' },
    bus_mkt: { field: 'commerce', domain: 'business_admin' }
};

function goToRelevantJobs(subjectId) {
    const resolvedSubjectId = subjectId || document.getElementById('subject-select')?.value || '';
    const target = subjectJobMap[resolvedSubjectId] || { field: 'cs', domain: 'all' };

    const fieldSelect = document.getElementById('jobseeker-field-select');
    if (fieldSelect) {
        fieldSelect.value = target.field;
        handleJobseekerFieldChange(target.field);
    }

    const domainSelect = document.getElementById('jobseeker-domain-select');
    if (domainSelect) {
        domainSelect.value = target.domain;
        renderJobFeed();
    }

    closeAssessmentModal();
    showWindow('window-jobseeker', true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 8. AUTHENTICATION HANDLERS & FORM CONSTRAINTS
// ==========================================
function openAuthModal(mode) {
    document.getElementById('modal-auth').classList.remove('hidden');
    switchAuthTab(mode || 'login');
}

function closeAuthModal() {
    document.getElementById('modal-auth').classList.add('hidden');
}

function switchAuthTab(tab) {
    if (tab === 'login') {
        document.getElementById('tab-login-btn').classList.add('active-tab');
        document.getElementById('tab-signup-btn').classList.remove('active-tab');
        document.getElementById('form-login').classList.remove('hidden');
        document.getElementById('form-signup').classList.add('hidden');
    } else {
        document.getElementById('tab-signup-btn').classList.add('active-tab');
        document.getElementById('tab-login-btn').classList.remove('active-tab');
        document.getElementById('form-signup').classList.remove('hidden');
        document.getElementById('form-login').classList.add('hidden');
    }
}

function updateEmailPlaceholder() {
    const role = document.getElementById('signup-role').value;
    const emailInput = document.getElementById('signup-email');
    const emailHint = document.getElementById('email-hint');

    if (role === 'student') {
        emailInput.placeholder = "e.g. student@university.edu or name@edu.bd";
        emailHint.innerText = "Graduate students can use standard or institutional (.edu, .edu.bd, etc.) emails.";
    } else {
        emailInput.placeholder = "e.g. user@gmail.com";
        emailHint.innerText = "Job seekers should provide a valid standard email address.";
    }
}

function validateAuthInputs(name, email, password, confirmPassword, role) {
    if (name !== null) {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!name.trim()) {
            alert('Validation Error: Please enter your full name.');
            return false;
        }
        if (!nameRegex.test(name.trim())) {
            alert('Validation Error: Name can only contain letters and spaces.');
            return false;
        }
    }

    if (!email.trim()) {
        alert('Validation Error: Please enter an email address.');
        return false;
    }

    const standardEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!standardEmailRegex.test(email.trim())) {
        alert('Validation Error: Please enter a valid email address.');
        return false;
    }

    if (role === 'student') {
        const academicPattern = /\.(edu|edu\.[a-z]{2}|ac\.[a-z]{2})$/i;
        const isAcademic = academicPattern.test(email.trim());
        const isStandard = standardEmailRegex.test(email.trim());

        if (!isAcademic && !isStandard) {
            alert('Validation Error for Graduate Students: Email must be a valid email or institutional domain (e.g. name@edu.bd, name@university.edu).');
            return false;
        }
    }

    if (password !== null) {
        if (!password || password.length < 6) {
            alert('Validation Error: Password must be at least 6 characters long.');
            return false;
        }
        if (confirmPassword !== undefined && password !== confirmPassword) {
            alert('Validation Error: Password and Confirm Password do not match.');
            return false;
        }
    }

    return true;
}

function handleSignUp() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const role = document.getElementById('signup-role').value;

    if (!validateAuthInputs(name, email, password, confirmPassword, role)) {
        return;
    }

    currentUser = { name, email, role };
    updateUIAfterAuth();
    closeAuthModal();

    if (role === 'student') {
        showWindow('window-student');
    } else {
        showWindow('window-jobseeker');
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!validateAuthInputs(null, email, password, undefined, null)) {
        return;
    }

    const detectedRole = email.includes('.edu') ? 'student' : 'student';

    currentUser = { name: 'User', email: email, role: detectedRole };
    updateUIAfterAuth();
    closeAuthModal();
    showWindow('window-student');
}

function handleLogout() {
    currentUser = null;
    document.getElementById('btn-login-nav').classList.remove('hidden');
    document.getElementById('btn-signup-nav').classList.remove('hidden');
    document.getElementById('btn-logout-nav').classList.add('hidden');

    document.getElementById('nav-student').classList.remove('hidden');
    document.getElementById('nav-jobseeker').classList.remove('hidden');

    showWindow('window-home');
}

function updateUIAfterAuth() {
    if (currentUser) {
        document.getElementById('btn-login-nav').classList.add('hidden');
        document.getElementById('btn-signup-nav').classList.add('hidden');
        document.getElementById('btn-logout-nav').classList.remove('hidden');

        if (currentUser.role === 'student') {
            document.getElementById('nav-jobseeker').classList.add('hidden');
            document.getElementById('nav-student').classList.remove('hidden');
        } else if (currentUser.role === 'jobseeker') {
            document.getElementById('nav-student').classList.add('hidden');
            document.getElementById('nav-jobseeker').classList.remove('hidden');
        }
    }
}

// ==========================================
// 9. AI CAREER COACH CHAT INTEGRATION
// ==========================================
function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

function formatChatReply(text) {
    return typeof formatAIRecommendations === 'function'
        ? formatAIRecommendations(text)
        : escapeHTML(text);
}

async function sendChatMessage() {
    const inputField = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-messages');
    if (!inputField || !chatContainer) return;

    const messageText = inputField.value.trim();
    if (!messageText) return;

    chatContainer.innerHTML += `<div style="margin-bottom: 12px; text-align: right;"><span style="background: #059669; color: white; padding: 8px 12px; border-radius: 8px; display: inline-block;">${escapeHTML(messageText)}</span></div>`;
    inputField.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const loadingId = 'loading-' + Date.now();
    chatContainer.innerHTML += `<div id="${loadingId}" style="margin-bottom: 12px; color: #64748b;"><em>Coach is thinking...</em></div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText }),
            signal: controller.signal
        });

        const data = await response.json();
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();

        if (!response.ok) {
            throw new Error(data.error || `AI service returned HTTP ${response.status}`);
        }

        if (data.success) {
            chatContainer.innerHTML += `<div style="margin-bottom: 12px; color: #1e293b; background: #ecfdf5; padding: 10px; border-radius: 8px; border: 1px solid #a7f3d0;"><strong>Coach:</strong><br>${formatChatReply(data.response)}</div>`;
        } else {
            chatContainer.innerHTML += `<div style="margin-bottom: 12px; color: #991b1b;">Error getting response from AI.</div>`;
        }
    } catch (err) {
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();
        const reason = err.name === 'AbortError'
            ? 'The AI request timed out. Please try again.'
            : (err && err.message && err.message !== 'Failed to fetch'
                ? err.message
                : 'Could not reach the AI service. Please try again.');
        chatContainer.innerHTML += `<div style="margin-bottom: 12px; color: #991b1b;">${escapeHTML(reason)}</div>`;
    } finally {
        clearTimeout(timeoutId);
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// ==========================================
// 10. STARTUP INITIALIZATION & COMPONENT RENDERING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Component HTML Templates into Empty Window Divs
    if (typeof renderHome === 'function') {
        const homeEl = document.getElementById('window-home');
        if (homeEl) homeEl.innerHTML = renderHome();
    }
    if (typeof renderStudentView === 'function') {
        const studentEl = document.getElementById('window-student');
        if (studentEl) studentEl.innerHTML = renderStudentView();
    }
    if (typeof renderJobSeeker === 'function') {
        const jsEl = document.getElementById('window-jobseeker');
        if (jsEl) jsEl.innerHTML = renderJobSeeker();
    }
    if (typeof renderUniversity === 'function') {
        const uniEl = document.getElementById('window-university');
        if (uniEl) uniEl.innerHTML = renderUniversity();
    }
    if (typeof renderModals === 'function') {
        const modalsEl = document.getElementById('window-modals');
        if (modalsEl) modalsEl.innerHTML = renderModals();
    }

    // 2. Initialize Dropdowns & Filters
    handleStudentFieldChange('cs');
    handleJobseekerFieldChange('cs');

    // 3. Bind Chat Enter Key
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

    // 4. Bind Assessment Modal Close Button
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.onclick = closeAssessmentModal;
    }

    // 5. Display Default Home Window
    showWindow('window-home');
});