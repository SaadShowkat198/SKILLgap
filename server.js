const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const AI_API_URL = process.env.AI_API_URL || 'http://127.0.0.1:5000';

// Parse incoming JSON data.
app.use(express.json());

// Serve front-end files from public/ for local development.
// On Vercel, files in public/ are served by the CDN (express.static is ignored).
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// AI CAREER COACH BRIDGE ENDPOINT
// ==========================================
app.post('/api/analyze-skills', async (req, res) => {
    try {
        const skills = Array.isArray(req.body?.skills)
            ? req.body.skills.slice(0, 3).map(skill => String(skill).trim()).filter(Boolean)
            : [];
        const targetRole = String(req.body?.target_role || 'Software Engineer').trim();

        // Forward quiz data to the local Python Flask AI API running on port 5000.
        const aiResponse = await axios.post(`${AI_API_URL}/analyze`, {
            skills,
            target_role: targetRole
        }, { timeout: 180000 });

        res.json({
            success: true,
            recommendations: aiResponse.data.recommendations || '',
            resources: Array.isArray(aiResponse.data.resources) ? aiResponse.data.resources : []
        });
    } catch (error) {
        console.error("AI Bridge Connection Error:", error.message);
        res.status(500).json({ 
            success: false, 
            error: "Failed to connect to local AI agent." 
        });
    }
});

function normalizeScore(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 0;
    return Math.max(0, Math.min(100, Math.round(numeric)));
}

// In-memory database array to store assessment submissions (CRUD data store)
let assessmentSubmissions = [
    {
        id: "sub_1",
        studentName: "Demo Student",
        subject: "Data Structures & Algorithms",
        score: 67,
        lackingGaps: ["Core Linear Data Structures"]
    }
];

// ==========================================
// CRUD ENDPOINTS
// ==========================================

// 1. READ (GET): Retrieve all assessment records
app.get('/api/assessments', (req, res) => {
    res.json(assessmentSubmissions);
});

// 2. CREATE (POST): Add a new assessment submission from the frontend quiz
app.post('/api/assessments', (req, res) => {
    const { studentName, subject, score, lackingGaps } = req.body || {};

    const newSubmission = {
        id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        studentName: String(studentName || "Anonymous Student").trim().slice(0, 120),
        subject: String(subject || "General Assessment").trim().slice(0, 120),
        score: normalizeScore(score),
        lackingGaps: Array.isArray(lackingGaps)
            ? lackingGaps.map(gap => String(gap).trim()).filter(Boolean).slice(0, 20)
            : []
    };

    assessmentSubmissions.push(newSubmission);
    res.status(201).json({ success: true, data: newSubmission });
});

// 3. UPDATE (PUT): Modify an existing assessment record by ID
app.put('/api/assessments/:id', (req, res) => {
    const { id } = req.params;
    const { studentName, score } = req.body || {};

    const submission = assessmentSubmissions.find(s => s.id === id);
    if (submission) {
        if (studentName) submission.studentName = String(studentName).trim().slice(0, 120);
        if (score !== undefined) submission.score = normalizeScore(score);
        res.json({ success: true, data: submission });
    } else {
        res.status(404).json({ success: false, message: "Submission not found" });
    }
});

// 4. DELETE (DELETE): Remove an assessment record by ID
app.delete('/api/assessments/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = assessmentSubmissions.length;
    assessmentSubmissions = assessmentSubmissions.filter(s => s.id !== id);

    if (assessmentSubmissions.length < initialLength) {
        res.json({ success: true, message: `Submission ${id} deleted successfully` });
    } else {
        res.status(404).json({ success: false, message: "Submission not found" });
    }
});

// Start the server only when run directly (not when imported by Vercel).
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`==================================================`);
        console.log(`🚀 SkillGap Server is running at http://localhost:${PORT}`);
        console.log(`==================================================`);
    });
}

module.exports = app;