function renderModals() {
    return modalsHTML;
}

const modalsHTML = `
<div id="modal-auth" class="modal-overlay hidden">
    <div class="modal-box">
        <div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
            <button id="tab-login-btn" style="flex: 1; padding: 10px; background: none; border: none; font-weight: bold; cursor: pointer;" onclick="switchAuthTab('login')">Log In</button>
            <button id="tab-signup-btn" style="flex: 1; padding: 10px; background: none; border: none; font-weight: bold; cursor: pointer;" onclick="switchAuthTab('signup')">Sign Up</button>
        </div>

        <!-- Login Form -->
        <div id="form-login">
            <div style="margin-bottom: 12px;">
                <label style="font-size: 12px; font-weight: bold; color: #064e3b;">Email Address</label>
                <input type="email" id="login-email" placeholder="e.g. user@example.com or name@edu.bd" style="width: 100%; padding: 10px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;">
            </div>
            <div style="margin-bottom: 16px;">
                <label style="font-size: 12px; font-weight: bold; color: #064e3b;">Password</label>
                <input type="password" id="login-password" placeholder="Enter your password" style="width: 100%; padding: 10px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;">
            </div>
            <button class="btn-primary" style="width: 100%;" onclick="handleLogin()">Log In</button>
        </div>

        <!-- Signup Form -->
        <div id="form-signup" class="hidden">
            <div style="margin-bottom: 10px;">
                <label style="font-size: 12px; font-weight: bold; color: #064e3b;">Full Name (Letters only)</label>
                <input type="text" id="signup-name" placeholder="John Doe" style="width: 100%; padding: 10px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;">
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="font-size: 12px; font-weight: bold; color: #064e3b;">User Role</label>
                <select id="signup-role" style="width: 100%; padding: 10px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;" onchange="updateEmailPlaceholder()">
                    <option value="student">Graduate Student</option>
                    <option value="jobseeker">Job Seeker</option>
                </select>
            </div>

            <div style="margin-bottom: 10px;">
                <label style="font-size: 12px; font-weight: bold; color: #064e3b;">Email Address</label>
                <input type="email" id="signup-email" placeholder="e.g. name@edu.bd or student@university.edu" style="width: 100%; padding: 10px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;">
                <span id="email-hint" style="font-size: 11px; color: #059669;">Graduate students can use personal or institutional (.edu, .edu.bd) emails.</span>
            </div>

            <div style="margin-bottom: 10px;">
                <label style="font-size: 12px; font-weight: bold; color: #064e3b;">Password (Min. 6 characters)</label>
                <input type="password" id="signup-password" placeholder="Create password" style="width: 100%; padding: 10px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;">
            </div>

            <div style="margin-bottom: 16px;">
                <label style="font-size: 12px; font-weight: bold; color: #064e3b;">Confirm Password</label>
                <input type="password" id="signup-confirm-password" placeholder="Re-enter password" style="width: 100%; padding: 10px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;">
            </div>

            <button class="btn-primary" style="width: 100%;" onclick="handleSignUp()">Create Account</button>
        </div>

        <button onclick="closeAuthModal()" style="margin-top: 15px; background: none; border: none; width: 100%; color: #64748b; cursor: pointer;">Cancel</button>
    </div>
</div>
`;