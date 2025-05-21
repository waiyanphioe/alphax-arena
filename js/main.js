// Import all necessary modules
import { loggedInUser, initData } from './data.js';
import { showPanel, clearFormFields, updateDashboardUI, listTeams, listMyAppointments, listMyTeamMembers, listGames } from './ui.js';
import { login, signup, logout } from './auth.js';
import { createTeam, handleTeamSearch } from './team.js';
import { requestAppointment, handleAppointmentAction } from './appointment.js';
import { addMember, removeMember } from './member.js';
import { initLanguageAndTheme, currentLang, currentTheme, updateUIStrings, getTranslation, getAlertTranslation } from './utils.js';

// Get references to HTML elements (all IDs are prefixed with their panel name for clarity)
// Login Panel
const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

// Signup Panel
const signupUsernameInput = document.getElementById('signup-username');
const signupPasswordInput = document.getElementById('signup-password');
const signupButton = document.getElementById('signup-button');

// Dashboard Panel
const logoutButton = document.getElementById('logout-button');
const teamNameInput = document.getElementById('team-name');
const teamContactInput = document.getElementById('team-contact');
const createTeamButton = document.getElementById('create-team-button');
const refreshTeamsButton = document.getElementById('refresh-teams-button');
const teamSearchInput = document.getElementById('team-search-input');

const opponentTeamNameInput = document.getElementById('opponent-team-name');
const appointmentDatetimeInput = document.getElementById('appointment-datetime');
const requestAppointmentButton = document.getElementById('request-appointment-button');
const refreshAppointmentsButton = document.getElementById('refresh-appointments-button');

const memberUsernameInput = document.getElementById('member-username');
const addMemberButton = document.getElementById('add-member-button');
const removeMemberButton = document.getElementById('remove-member-button');

// Top level navigation/toggles
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const languageToggleBtn = document.getElementById('language-toggle');
const themeToggleBtn = document.getElementById('theme-toggle');

// --- Event Listeners ---
// Panel Navigation
showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPanel('signup-panel');
    clearFormFields();
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPanel('login-panel');
    clearFormFields();
});

// Authentication
loginButton.addEventListener('click', async () => {
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();
    const success = await login(username, password);
    if (success) {
        updateDashboardUI();
        showPanel('dashboard-panel');
        clearFormFields();
    }
});

signupButton.addEventListener('click', async () => {
    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value.trim();
    const success = await signup(username, password);
    if (success) {
        showPanel('login-panel');
        clearFormFields();
    }
});

logoutButton.addEventListener('click', () => {
    logout();
    showPanel('login-panel');
    clearFormFields();
});

// Team Management
createTeamButton.addEventListener('click', async () => {
    const teamName = teamNameInput.value.trim();
    const contactInfo = teamContactInput.value.trim();
    const success = await createTeam(teamName, contactInfo);
    if (success) {
        teamNameInput.value = '';
        teamContactInput.value = '';
        updateDashboardUI(); // Re-render dashboard elements
        listTeams(); // Refresh team list
    }
});

refreshTeamsButton.addEventListener('click', () => {
    listTeams();
});

teamSearchInput.addEventListener('input', () => {
    handleTeamSearch(teamSearchInput.value); // Pass search term to the handler
});

// Appointment Management
requestAppointmentButton.addEventListener('click', async () => {
    const opponentTeamName = opponentTeamNameInput.value.trim();
    const dateTime = appointmentDatetimeInput.value.trim();
    const success = await requestAppointment(opponentTeamName, dateTime);
    if (success) {
        opponentTeamNameInput.value = '';
        appointmentDatetimeInput.value = '';
        listMyAppointments(); // Refresh appointment list
    }
});

refreshAppointmentsButton.addEventListener('click', () => {
    listMyAppointments();
});

// Delegate event for dynamically created appointment action buttons
document.getElementById('my-appointments-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('appointment-action-btn')) {
        const index = event.target.dataset.index;
        const action = event.target.dataset.action;
        handleAppointmentAction(index, action);
    }
});

// Team Member Management
addMemberButton.addEventListener('click', async () => {
    const memberUsername = memberUsernameInput.value.trim();
    const success = await addMember(memberUsername);
    if (success) {
        memberUsernameInput.value = '';
        listMyTeamMembers(); // Refresh members list
    }
});

removeMemberButton.addEventListener('click', async () => {
    const memberUsername = memberUsernameInput.value.trim();
    const success = await removeMember(memberUsername);
    if (success) {
        memberUsernameInput.value = '';
        listMyTeamMembers(); // Refresh members list
    }
});

// Language and Theme Toggles
languageToggleBtn.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'my' : 'en';
    localStorage.setItem('appLang', newLang); // Save preference
    location.reload(); // Reload to apply new language completely
});

themeToggleBtn.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('appTheme', newTheme); // Save preference
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
    themeToggleBtn.textContent = (newTheme === 'light' ? getAlertTranslation('darkModeButton') : getAlertTranslation('lightModeButton'));
});


// --- Initial Setup ---
// Initialize data (e.g., load from localStorage or mock data)
initData();
// Initialize language and theme from localStorage
initLanguageAndTheme();
// Update UI strings based on initial language
updateUIStrings();
// Start with login panel
showPanel('login-panel');
// Clear all form fields
clearFormFields();
// Update dashboard UI elements (enables/disables fields based on login status)
updateDashboardUI();
