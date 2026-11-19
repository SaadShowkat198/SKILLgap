// ==========================================
// ASSESSMENT DATASETS & KNOWLEDGE BASE
// ==========================================
const assessmentSubjects = {
    cs: [
        { id: "cs_ds", name: "Data Structures & Algorithms" },
        { id: "cs_web", name: "Web Development & APIs" },
        { id: "cs_cloud", name: "Cloud Computing & DevOps" }
    ],
    business: [
        { id: "bus_fin", name: "Financial Analysis & Valuation" },
        { id: "bus_mkt", name: "Digital Marketing & Strategy" }
    ]
};

const assessmentQuestions = {
    cs_ds: [
        {
            text: "What is the average time complexity for searching an element in a Balanced Binary Search Tree (BST)?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
            correctAnswerText: "O(log n)",
            gapTopic: "Algorithm Time Complexity Analysis"
        },
        {
            text: "Which data structure operates on a Last-In, First-Out (LIFO) order?",
            options: ["Queue", "Stack", "Array", "Linked List"],
            correctAnswerText: "Stack",
            gapTopic: "Core Linear Data Structures"
        },
        {
            text: "Which technique is used to solve dynamic programming problems efficiently by storing past results?",
            options: ["Recursion", "Memoization", "Greedy Search", "Backtracking"],
            correctAnswerText: "Memoization",
            gapTopic: "Dynamic Programming & Optimization"
        }
    ],
    cs_web: [
        {
            text: "Which HTTP method is conventionally used to update an existing resource?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctAnswerText: "PUT",
            gapTopic: "RESTful API Fundamentals"
        },
        {
            text: "What does async/await primarily simplify in JavaScript?",
            options: ["Synchronous CSS styling", "Handling asynchronous Promise-based code", "Compiling TypeScript to JavaScript", "Styling HTML forms"],
            correctAnswerText: "Handling asynchronous Promise-based code",
            gapTopic: "JavaScript Async/Promises"
        },
        {
            text: "In React, which hook is used to perform side effects after a component renders?",
            options: ["useState", "useContext", "useEffect", "useMemo"],
            correctAnswerText: "useEffect",
            gapTopic: "React Component Lifecycle"
        }
    ],
    cs_cloud: [
        {
            text: "Which AWS service runs containers without requiring you to manage servers?",
            options: ["Amazon S3", "AWS Fargate", "Amazon RDS", "AWS IAM"],
            correctAnswerText: "AWS Fargate",
            gapTopic: "Container Orchestration"
        },
        {
            text: "What is the main purpose of a CI/CD pipeline?",
            options: ["Manual code review", "Automating build, test, and deployment", "Designing database schemas", "Managing DNS records"],
            correctAnswerText: "Automating build, test, and deployment",
            gapTopic: "CI/CD Pipelines"
        },
        {
            text: "What does Docker package an application and its dependencies into?",
            options: ["A virtual machine", "A container image", "A relational database", "A load balancer"],
            correctAnswerText: "A container image",
            gapTopic: "Docker Fundamentals"
        }
    ],
    bus_fin: [
        {
            text: "Which financial statement reports revenues and expenses over a period?",
            options: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "Statement of Changes in Equity"],
            correctAnswerText: "Income Statement",
            gapTopic: "Financial Statement Analysis"
        },
        {
            text: "A positive Net Present Value (NPV) generally means the project is expected to:",
            options: ["Destroy shareholder value", "Break even exactly", "Add value above the discount rate", "Have no future cash flows"],
            correctAnswerText: "Add value above the discount rate",
            gapTopic: "Valuation & NPV"
        },
        {
            text: "Which Excel tool is commonly used for sensitivity analysis in financial models?",
            options: ["Data Tables", "Spell Check", "Mail Merge", "Track Changes"],
            correctAnswerText: "Data Tables",
            gapTopic: "Financial Modeling in Excel"
        }
    ],
    bus_mkt: [
        {
            text: "What does CTR stand for in digital marketing?",
            options: ["Cost to Reach", "Click-Through Rate", "Customer Tracking Ratio", "Conversion Time Rate"],
            correctAnswerText: "Click-Through Rate",
            gapTopic: "Digital Marketing Metrics"
        },
        {
            text: "Which metric measures the share of visitors who complete a desired action?",
            options: ["Bounce rate", "Reach", "Conversion rate", "Frequency"],
            correctAnswerText: "Conversion rate",
            gapTopic: "Conversion Optimization"
        },
        {
            text: "What is a buyer persona?",
            options: ["A fictional profile of an ideal customer", "A CRM database table", "A pricing strategy", "A social media algorithm"],
            correctAnswerText: "A fictional profile of an ideal customer",
            gapTopic: "Audience Segmentation"
        }
    ]
};

// ==========================================
// ASSESSMENT ENGINE STATE MANAGEMENT
// ==========================================
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

function resetAssessmentState() {
    const setupStep = document.getElementById('assessment-setup');
    const quizStep = document.getElementById('assessment-quiz');
    const resultsStep = document.getElementById('assessment-results');

    if (setupStep) setupStep.classList.remove('hidden');
    if (quizStep) quizStep.classList.add('hidden');
    if (resultsStep) resultsStep.classList.add('hidden');

    const fieldSelect = document.getElementById('field-select');
    const subjectSelect = document.getElementById('subject-select');
    const startBtn = document.getElementById('start-assessment-btn');

    if (fieldSelect) fieldSelect.value = "";
    if (subjectSelect) {
        subjectSelect.innerHTML = '<option value="">-- Select Subject --</option>';
        subjectSelect.disabled = true;
    }
    if (startBtn) {
        startBtn.disabled = true;
        startBtn.innerText = "Start Assessment";
    }

    currentQuizQuestions = [];
    currentQuestionIndex = 0;
    userAnswers = [];
}

function handleFieldSelection(fieldKey) {
    const subjectSelect = document.getElementById('subject-select');
    const startBtn = document.getElementById('start-assessment-btn');

    if (!fieldKey || !assessmentSubjects[fieldKey]) {
        if (subjectSelect) {
            subjectSelect.innerHTML = '<option value="">-- Select Subject --</option>';
            subjectSelect.disabled = true;
        }
        if (startBtn) startBtn.disabled = true;
        return;
    }

    const options = assessmentSubjects[fieldKey]
        .map(sub => `<option value="${sub.id}">${sub.name}</option>`)
        .join('');

    if (subjectSelect) {
        subjectSelect.innerHTML = `<option value="">-- Select Subject --</option>` + options;
        subjectSelect.disabled = false;
    }
    if (startBtn) startBtn.disabled = true;
}

function handleSubjectSelection(subjectId) {
    const startBtn = document.getElementById('start-assessment-btn');
    if (startBtn) {
        startBtn.disabled = !subjectId;
    }
}

// Start Assessment Quiz Step (AI generation requesting exact correct option text)
async function startAssessmentQuiz() {
    const subjectSelect = document.getElementById('subject-select');
    const startBtn = document.getElementById('start-assessment-btn');
    if (!subjectSelect || !startBtn) return;

    const subjectId = subjectSelect.value;
    const subjectName = subjectSelect.selectedOptions[0]?.text || "Computer Science";

    if (!subjectId) return;

    startBtn.disabled = true;
    startBtn.innerText = "🤖 Generating AI Questions...";

    let loadedQuestions = [];
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 180000);

    try {
        const response = await fetch('http://127.0.0.1:5000/generate-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject: subjectName }),
            signal: controller.signal
        });

        const data = await response.json();

        if (!response.ok || !data.success || !Array.isArray(data.questions)) {
            throw new Error(data.error || "Invalid question format returned by AI.");
        }

        loadedQuestions = data.questions.map((q, idx) => {
            if (!q || typeof q !== 'object') return null;

            const options = Array.isArray(q.options)
                ? q.options.map(option => String(option).trim()).filter(Boolean)
                : [];
            const questionText = String(q.question || q.text || '').trim();

            if (!questionText || options.length < 2) return null;

            let correctText = q.correctAnswerText || q.correctText || '';
            if (!correctText && Number.isInteger(q.answer) && options[q.answer] !== undefined) {
                correctText = options[q.answer];
            } else if (!correctText && Number.isInteger(q.correct) && options[q.correct] !== undefined) {
                correctText = options[q.correct];
            }

            const exactMatch = options.find(option =>
                option.toLowerCase() === String(correctText).trim().toLowerCase()
            );
            if (!exactMatch) return null;

            return {
                id: `ai_q_${idx + 1}`,
                text: questionText,
                options: options,
                correctAnswerText: exactMatch,
                gapTopic: String(q.gapTopic || `${subjectName} - Concept ${idx + 1}`).trim()
            };
        }).filter(Boolean);

        if (loadedQuestions.length === 0) {
            throw new Error("AI returned no valid questions.");
        }
    } catch (err) {
        console.warn("AI Quiz Generation failed, using static fallback:", err);
        const fallback = assessmentQuestions[subjectId] || [];
        loadedQuestions = [...fallback].sort(() => Math.random() - 0.5);
    } finally {
        clearTimeout(timeoutId);
        startBtn.disabled = false;
        startBtn.innerText = "Start Assessment";
    }

    if (loadedQuestions.length === 0) {
        alert("No assessment questions available for this subject yet.");
        return;
    }

    currentQuizQuestions = loadedQuestions;
    currentQuestionIndex = 0;
    userAnswers = [];

    const setupDiv = document.getElementById('assessment-setup');
    const quizDiv = document.getElementById('assessment-quiz');
    if (setupDiv) setupDiv.classList.add('hidden');
    if (quizDiv) quizDiv.classList.remove('hidden');

    renderQuestion();
}

function renderQuestion() {
    const q = currentQuizQuestions[currentQuestionIndex];
    if (!q) return;

    const quizTitle = document.getElementById('quiz-title');
    const tracker = document.getElementById('question-tracker');
    const textEl = document.getElementById('question-text');
    const subjectSelect = document.getElementById('subject-select');

    if (quizTitle && subjectSelect && subjectSelect.selectedOptions[0]) {
        quizTitle.innerText = subjectSelect.selectedOptions[0].text;
    }
    if (tracker) {
        tracker.innerText = `Question ${currentQuestionIndex + 1}/${currentQuizQuestions.length}`;
    }
    if (textEl) {
        textEl.innerText = q.text;
    }

    const optionsContainer = document.getElementById('options-container');
    if (optionsContainer) {
        // Store the option text directly as the radio value for bulletproof text-matching
        optionsContainer.innerHTML = q.options.map((opt) => `
            <label style="display: block; margin-bottom: 10px; cursor: pointer;">
                <input type="radio" name="quiz-opt" value="${encodeURIComponent(opt)}">
                ${escapeAIText(opt)}
            </label>
        `).join('');
    }

    const nextBtn = document.getElementById('next-question-btn');
    if (nextBtn) {
        nextBtn.innerText = currentQuestionIndex === currentQuizQuestions.length - 1
            ? "Finish Assessment"
            : "Next Question";
    }
}

function handleNextQuestion() {
    const selectedOpt = document.querySelector('input[name="quiz-opt"]:checked');
    if (!selectedOpt) {
        alert("Please select an answer before proceeding.");
        return;
    }

    // Save the decoded user option string
    userAnswers.push(decodeURIComponent(selectedOpt.value));
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuizQuestions.length) {
        renderQuestion();
    } else {
        renderAssessmentResults();
    }
}

function escapeAIText(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

function safeHttpUrl(value) {
    try {
        const url = new URL(String(value));
        return (url.protocol === 'http:' || url.protocol === 'https:') ? url.href : '';
    } catch (error) {
        return '';
    }
}

function formatAIRecommendations(text) {
    return escapeAIText(text)
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline;">$1</a>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}

function renderResourceLinks(resources) {
    if (!Array.isArray(resources) || resources.length === 0) return '';

    const items = resources.map((resource) => {
        const url = safeHttpUrl(resource && resource.url);
        if (!url) return '';

        const title = escapeAIText(resource.title || url);
        const skill = escapeAIText(resource.skill || '');
        return `<li style="margin-bottom: 8px;">${skill ? `<strong>${skill}:</strong> ` : ''}<a href="${escapeAIText(url)}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline;">${title}</a></li>`;
    }).filter(Boolean);

    if (items.length === 0) return '';

    return `
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
            <h4 style="color: #064e3b; margin-bottom: 8px;">🔗 Direct Learning Resources</h4>
            <ul style="padding-left: 20px; margin: 0; line-height: 1.7;">${items.join('')}</ul>
        </div>
    `;
}

function buildFallbackResourceLinks(gaps) {
    const items = (gaps || []).map((gap) => {
        const query = encodeURIComponent(`${gap} tutorial`);
        const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
        const webUrl = `https://www.google.com/search?q=${query}`;
        return `<li style="margin-bottom: 8px;"><strong>${escapeAIText(gap)}:</strong> <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline;">YouTube tutorials</a> · <a href="${webUrl}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline;">Web resources</a></li>`;
    }).join('');

    return items
        ? `<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px;"><h4 style="color: #064e3b; margin-bottom: 8px;">🔗 Suggested Search Links</h4><ul style="padding-left: 20px; margin: 0; line-height: 1.7;">${items}</ul></div>`
        : '';
}

// Render Results & Connect 100% Score to Relevant Job Offers
function renderAssessmentResults() {
    let score = 0;
    const lackingGaps = [];

    currentQuizQuestions.forEach((q, idx) => {
        const userSelection = (userAnswers[idx] || "").trim();
        const correctSelection = (q.correctAnswerText || "").trim();

        // Text-based evaluation prevents index/type mismatch bugs entirely
        if (userSelection.toLowerCase() === correctSelection.toLowerCase()) {
            score++;
        } else {
            lackingGaps.push(q.gapTopic || `Concept Review ${idx + 1}`);
        }
    });

    const percentage = Math.round((score / currentQuizQuestions.length) * 100);
    const subjectSelect = document.getElementById('subject-select');
    const subjectId = subjectSelect ? subjectSelect.value : '';
    const subjectName = subjectSelect && subjectSelect.selectedOptions[0] ? subjectSelect.selectedOptions[0].text : "Assessment";
    const safeSubjectName = escapeAIText(subjectName);

    const quizDiv = document.getElementById('assessment-quiz');
    const resultsDiv = document.getElementById('assessment-results');
    if (quizDiv) quizDiv.classList.add('hidden');
    if (resultsDiv) resultsDiv.classList.remove('hidden');

    const scoreEl = document.getElementById('final-score');
    if (scoreEl) scoreEl.innerText = percentage;

    const statusText = document.getElementById('score-status-text');
    const lackingList = document.getElementById('lacking-list');
    const recsList = document.getElementById('recommendations-list');

    if (statusText) {
        if (percentage === 100) {
            statusText.innerHTML = "<span style='color: #059669; font-weight: bold;'>🎉 Excellent! You scored 100%! You have full competency in this domain.</span>";
        } else if (percentage >= 50) {
            statusText.innerHTML = "<span style='color: #d97706; font-weight: bold;'>Good effort! Minor skill gaps identified below.</span>";
        } else {
            statusText.innerHTML = "<span style='color: #dc2626; font-weight: bold;'>Attention Needed: Key foundational skill deficits detected.</span>";
        }
    }

    if (lackingList && recsList) {
        if (lackingGaps.length === 0) {
            lackingList.innerHTML = `<li style="color: #059669;">No critical skill deficits found! You are fully qualified for target industry roles.</li>`;

            // 100% score -> show the success card and redirect to relevant job offers.
            recsList.innerHTML = `
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin-top: 10px;">
                    <h4 style="color: #065f46; margin-bottom: 8px;">🚀 Unlocked Job Opportunities for Your Score:</h4>
                    <p style="font-size: 13px; color: #166534; margin-bottom: 10px;">Because you achieved a 100% mastery grade in <strong>${safeSubjectName}</strong>, your profile matches high-demand roles in our job feed:</p>
                    <button onclick="goToRelevantJobs()" style="background: #059669; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;">Browse Matching Job Offers →</button>
                    <p style="font-size: 12px; color: #166534; margin-top: 10px;">Redirecting you to relevant job opportunities...</p>
                </div>
            `;

            setTimeout(() => {
                if (typeof goToRelevantJobs === 'function') {
                    goToRelevantJobs(subjectId);
                }
            }, 3000);
        } else {
            lackingList.innerHTML = lackingGaps.map(gap => `<li style="color: #991b1b;"><strong>${escapeAIText(gap)}</strong></li>`).join('');
            recsList.innerHTML = `<li>🤖 <em>Generating personalized study guides and resources for your gaps...</em></li>`;
        }
    }

    // Save assessment data to backend server
    fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            studentName: typeof currentUser !== 'undefined' && currentUser ? currentUser.name : "Guest Student",
            subject: subjectName,
            score: percentage,
            lackingGaps: lackingGaps
        })
    }).catch(err => console.error("Error saving assessment:", err));

    // If gaps exist, ask the AI agent for study recommendations and real links.
    if (lackingGaps.length > 0) {
        fetch('/api/analyze-skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skills: lackingGaps, target_role: subjectName })
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || `AI service returned HTTP ${res.status}`);
            }
            return data;
        })
        .then(data => {
            if (!recsList) return;

            const resourcesHtml = renderResourceLinks(data.resources) || buildFallbackResourceLinks(lackingGaps);
            const recommendationsHtml = data.recommendations ? formatAIRecommendations(data.recommendations) : '';

            recsList.innerHTML = `<li style="list-style: none; line-height: 1.6;">${resourcesHtml}${recommendationsHtml ? `<div style="line-height: 1.7;">${recommendationsHtml}</div>` : ''}</li>`;
        })
        .catch(err => {
            console.error("AI Bridge Error:", err);
            if (recsList) {
                recsList.innerHTML = `<li style="list-style: none; line-height: 1.6;">${buildFallbackResourceLinks(lackingGaps)}<p style="margin-top: 10px; color: #475569;">AI recommendations are temporarily unavailable, but the links above are a good place to start.</p></li>`;
            }
        });
    }
}

// ==========================================
// EVENT LISTENERS INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const fieldSelect = document.getElementById('field-select');
    const subjectSelect = document.getElementById('subject-select');
    const startBtn = document.getElementById('start-assessment-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const restartBtn = document.getElementById('restart-assessment-btn');

    if (fieldSelect) fieldSelect.addEventListener('change', (e) => handleFieldSelection(e.target.value));
    if (subjectSelect) subjectSelect.addEventListener('change', (e) => handleSubjectSelection(e.target.value));
    if (startBtn) startBtn.addEventListener('click', startAssessmentQuiz);
    if (nextBtn) nextBtn.addEventListener('click', handleNextQuestion);
    if (restartBtn) restartBtn.addEventListener('click', resetAssessmentState);
});