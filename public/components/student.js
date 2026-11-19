function renderStudentView() {
    return studentHTML;
}

const studentHTML = `
<div class="container">
    <div class="card hero-card">
        <h2>🎓 Graduate Student Skill Gap Dashboard</h2>
        <p>Explore curriculum alignments, academic core topics, and market skill gaps across fields.</p>
        
        <div class="filter-bar">
            <div>
                <label><strong>Field: </strong></label>
                <select id="student-field-select" onchange="handleStudentFieldChange(this.value)">
                    <option value="cs">Computer Science & Tech</option>
                    <option value="medicine">Medicine & Healthcare</option>
                    <option value="commerce">Commerce & Business</option>
                </select>
            </div>
            <div>
                <label><strong>Target Domain: </strong></label>
                <select id="student-domain-select" onchange="renderStudentDashboard()">
                    <!-- Populated dynamically -->
                </select>
            </div>
        </div>
    </div>

    <div id="student-feed-container" class="sector-grid"></div>
</div>
`;