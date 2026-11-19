function renderJobSeeker() {
    return jobseekerHTML;
}

const jobseekerHTML = `
<div class="container">
    <div class="card hero-card">
        <h2>💼 Job Seeker Market Alignment Dashboard</h2>
        <p>Analyze live industry role requirements, matched skills, and missing competencies.</p>
        
        <div class="filter-bar">
            <div>
                <label><strong>Field: </strong></label>
                <select id="jobseeker-field-select" onchange="handleJobseekerFieldChange(this.value)">
                    <option value="cs">Computer Science & Tech</option>
                    <option value="medicine">Medicine & Healthcare</option>
                    <option value="commerce">Commerce & Business</option>
                </select>
            </div>
            <div>
                <label><strong>Domain / Specialization: </strong></label>
                <select id="jobseeker-domain-select" onchange="renderJobFeed()">
                    <!-- Populated dynamically -->
                </select>
            </div>
        </div>
    </div>

    <div id="job-feed-container" class="sector-grid"></div>
</div>
`;