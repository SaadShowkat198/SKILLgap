function renderHome() {
    return homeHTML;
}

const homeHTML = `
<div class="container">
    <div class="card hero-card" style="text-align: center; padding: 48px 24px;">
        <h1 style="font-size: 36px; color: #064e3b; margin-bottom: 12px;">Bridging the Gap Between Education and Employment</h1>
        <p style="font-size: 18px; color: #047857; max-width: 700px; margin: 0 auto 24px auto;">
            SkillGap provides AI-driven skill gap insights across Computer Science, Medicine, and Commerce fields to empower graduates, job seekers, and academic institutions.
        </p>
        <button class="btn-primary" style="font-size: 16px; padding: 12px 28px;" onclick="openAuthModal('signup')">Get Started</button>
    </div>

    <div class="sector-grid">
        <div class="card clickable-card" onclick="showWindow('window-student')">
            <h3 style="color: #064e3b; margin-bottom: 8px;">🎓 Graduate Students</h3>
            <p>Compare university core curriculums against dynamic industry requirements and identify missing skills.</p>
        </div>
        <div class="card clickable-card" onclick="showWindow('window-jobseeker')">
            <h3 style="color: #064e3b; margin-bottom: 8px;">💼 Job Seekers</h3>
            <p>Analyze live role descriptions, check skill matches, and uncover targeted learning paths.</p>
        </div>
        <div class="card clickable-card" onclick="showWindow('window-university')">
            <h3 style="color: #064e3b; margin-bottom: 8px;">🏛️ Universities</h3>
            <p>Leverage market trends and data analytics to adapt academic curriculums to global hiring needs.</p>
        </div>
    </div>
</div>
`;