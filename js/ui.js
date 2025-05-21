import { loggedInUser, users, teams, appointments, games } from './data.js';
import { getTranslation, getAlertTranslation } from './utils.js';

// Get references to HTML elements (passed from main.js or get directly if needed)
const loginPanel = document.getElementById('login-panel');
const signupPanel = document.getElementById('signup-panel');
const dashboardPanel = document.getElementById('dashboard-panel');

const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const signupUsernameInput = document.getElementById('signup-username');
const signupPasswordInput = document.getElementById('signup-password');
const teamNameInput = document.getElementById('team-name');
const teamContactInput = document.getElementById('team-contact');
const opponentTeamNameInput = document.getElementById('opponent-team-name');
const appointmentDatetimeInput = document.getElementById('appointment-datetime');
const memberUsernameInput = document.getElementById('member-username');
const teamSearchInput = document.getElementById('team-search-input');

const welcomeMessage = document.getElementById('welcome-message');
const teamStatusMessage = document.getElementById('team-status-message');
const appointmentStatusMessage = document.getElementById('appointment-status-message');
const memberStatusMessage = document.getElementById('member-status-message');

const createTeamButton = document.getElementById('create-team-button');
const requestAppointmentButton = document.getElementById('request-appointment-button');
const addMemberButton = document.getElementById('add-member-button');
const removeMemberButton = document.getElementById('remove-member-button');

const teamListDiv = document.getElementById('team-list');
const myAppointmentsListDiv = document.getElementById('my-appointments-list');
const myTeamMembersListDiv = document.getElementById('my-team-members-list');
const gamesListDiv = document.getElementById('games-list');


export function showPanel(panelId) {
    const panels = [loginPanel, signupPanel, dashboardPanel];
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(panelId).classList.add('active');
}

export function clearFormFields() {
    loginUsernameInput.value = '';
    loginPasswordInput.value = '';
    signupUsernameInput.value = '';
    signupPasswordInput.value = '';
    teamNameInput.value = '';
    teamContactInput.value = '';
    opponentTeamNameInput.value = '';
    appointmentDatetimeInput.value = '';
    memberUsernameInput.value = '';
    teamSearchInput.value = '';

    teamStatusMessage.textContent = '';
    teamStatusMessage.classList.remove('text-green-600', 'text-red-600', 'text-blue-600', 'text-gray-600');
    appointmentStatusMessage.textContent = '';
    appointmentStatusMessage.classList.remove('text-green-600', 'text-red-600', 'text-gray-600');
    memberStatusMessage.textContent = '';
    memberStatusMessage.classList.remove('text-green-600', 'text-red-600', 'text-gray-600');
}

export function updateDashboardUI() {
    if (loggedInUser) {
        welcomeMessage.textContent = getTranslation('welcomeMessage', loggedInUser);
        const hasTeam = users[loggedInUser].teamName !== null;

        // Team Creation Section
        teamNameInput.disabled = hasTeam;
        teamContactInput.disabled = hasTeam;
        createTeamButton.disabled = hasTeam;
        if (hasTeam) {
            teamStatusMessage.textContent = getTranslation('teamUpdateSuccess', users[loggedInUser].teamName);
            teamStatusMessage.classList.add('text-blue-600');
            teamStatusMessage.classList.remove('text-red-600', 'text-green-600', 'text-gray-600');
        } else {
            teamStatusMessage.textContent = getTranslation('createTeamMessage'); // Better message for creating team
            teamStatusMessage.classList.remove('text-blue-600', 'text-red-600', 'text-green-600');
            teamStatusMessage.classList.add('text-gray-600');
        }
        listTeams();

        // Team Member Management Section
        const isTeamLeader = hasTeam && teams[users[loggedInUser].teamName].leader === loggedInUser;
        memberUsernameInput.disabled = !isTeamLeader;
        addMemberButton.disabled = !isTeamLeader;
        removeMemberButton.disabled = !isTeamLeader;

        if (!hasTeam) {
            memberStatusMessage.textContent = getTranslation('createTeamToManageMembers');
            memberStatusMessage.classList.add('text-gray-600');
            memberStatusMessage.classList.remove('text-green-600', 'text-red-600');
        } else if (!isTeamLeader) {
            memberStatusMessage.textContent = getTranslation('notTeamLeaderManageMembers');
            memberStatusMessage.classList.add('text-red-600');
            memberStatusMessage.classList.remove('text-green-600', 'text-gray-600');
        } else {
            memberStatusMessage.textContent = getTranslation('teamLeaderCanManageMembers');
            memberStatusMessage.classList.remove('text-red-600', 'text-gray-600');
            memberStatusMessage.classList.add('text-green-600');
        }
        listMyTeamMembers();

        // Appointment Management Section
        requestAppointmentButton.disabled = !hasTeam;
        opponentTeamNameInput.disabled = !hasTeam;
        appointmentDatetimeInput.disabled = !hasTeam;
        if (!hasTeam) {
            appointmentStatusMessage.textContent = getTranslation('createTeamToRequestAppt');
            appointmentStatusMessage.classList.add('text-gray-600');
            appointmentStatusMessage.classList.remove('text-green-600', 'text-red-600');
        } else {
            appointmentStatusMessage.textContent = ''; // Clear default message
        }
        listMyAppointments();
        listGames(); // Always list games on dashboard update
    }
}

export function listTeams(filteredTeams = null) { // Accepts filtered list for search
    teamListDiv.innerHTML = '';

    const teamsToDisplay = filteredTeams || Object.values(teams);

    if (teamsToDisplay.length === 0) {
        teamListDiv.innerHTML = `<p class="text-center text-gray-500">${getTranslation('noTeamsYet')}</p>`;
        return;
    }

    let teamListHtml = '';
    teamsToDisplay.forEach(team => {
        teamListHtml += `
            <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-2">
                <p><strong class="text-gray-800 dark:text-gray-200">${getTranslation('teamNameLabel')}:</strong> ${team.teamName}</p>
                <p><strong class="text-gray-800 dark:text-gray-200">${getTranslation('leaderLabel')}:</strong> ${team.leader}</p>
                <p><strong class="text-gray-800 dark:text-gray-200">${getTranslation('membersLabel')}:</strong> ${team.members.length} (${team.members.join(', ')})</p>
                <p><strong class="text-gray-800 dark:text-gray-200">${getTranslation('contactInfoLabel')}:</strong> ${team.contact}</p>
            </div>
        `;
    });
    teamListDiv.innerHTML = teamListHtml;
}

export function listMyAppointments() {
    myAppointmentsListDiv.innerHTML = '';

    if (!loggedInUser || !users[loggedInUser].teamName) {
        myAppointmentsListDiv.innerHTML = `<p class="text-center text-gray-500">${getTranslation('noAppointmentsYet')}</p>`;
        return;
    }

    const myTeamName = users[loggedInUser].teamName;
    const myAppointments = appointments.filter(
        appt => appt.team1Name === myTeamName || appt.team2Name === myTeamName
    );

    if (myAppointments.length === 0) {
        myAppointmentsListDiv.innerHTML = `<p class="text-center text-gray-500">${getTranslation('noAppointmentsYet')}</p>`;
        return;
    }

    myAppointments.forEach((appt, index) => {
        let statusColorClass = '';
        let statusTextClass = '';
        if (appt.status === 'Accepted') {
            statusColorClass = 'border-green-500';
            statusTextClass = 'text-green-600';
        } else if (appt.status === 'Rejected') {
            statusColorClass = 'border-red-500';
            statusTextClass = 'text-red-600';
        } else {
            statusColorClass = 'border-yellow-500';
            statusTextClass = 'text-yellow-600';
        }

        let apptHtml = `
            <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-2 border-l-4 ${statusColorClass}">
                <p><strong class="text-gray-800 dark:text-gray-200">${getTranslation('teamsLabel')}:</strong> ${appt.team1Name} vs ${appt.team2Name}</p>
                <p><strong class="text-gray-800 dark:text-gray-200">${getTranslation('timeLabel')}:</strong> ${appt.dateTime.replace('T', ' ')}</p>
                <p><strong class="text-gray-800 dark:text-gray-200">${getTranslation('statusLabel')}:</strong> <span class="font-semibold ${statusTextClass}">${appt.status}</span></p>
        `;

        if (appt.team2Name === myTeamName && appt.status === 'Pending') {
            const team2Leader = teams[myTeamName] ? teams[myTeamName].leader : null;
            if (loggedInUser === team2Leader) {
                apptHtml += `
                    <div class="mt-2 flex gap-2">
                        <button class="bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 transition duration-200 appointment-action-btn" data-index="${index}" data-action="accept">Accept</button>
                        <button class="bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600 transition duration-200 appointment-action-btn" data-index="${index}" data-action="reject">Reject</button>
                    </div>
                `;
            } else {
                 apptHtml += `<p class="mt-2 text-xs text-gray-600 dark:text-gray-400">${getTranslation('teamLeadersOnly')}</p>`;
            }
        }
        apptHtml += `</div>`;
        myAppointmentsListDiv.innerHTML += apptHtml;
    });
}

export function listMyTeamMembers() {
    myTeamMembersListDiv.innerHTML = '';

    if (!loggedInUser || !users[loggedInUser].teamName) {
        myTeamMembersListDiv.innerHTML = `<p class="text-center text-gray-500">${getTranslation('noTeamMembersYet')}</p>`;
        return;
    }

    const myTeamName = users[loggedInUser].teamName;
    const team = teams[myTeamName];

    if (!team || team.members.length === 0) {
        myTeamMembersListDiv.innerHTML = `<p class="text-center text-gray-500">${getTranslation('noTeamMembersYet')}</p>`;
        return;
    }

    let membersHtml = '';
    team.members.forEach(member => {
        membersHtml += `<div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mb-1"><span class="font-semibold text-gray-800 dark:text-gray-200">${member}</span> ${member === team.leader ? `(${getTranslation('leaderLabel')})` : ''}</div>`;
    });
    myTeamMembersListDiv.innerHTML = membersHtml;
}

export function listGames() {
    gamesListDiv.innerHTML = '';
    if (games.length === 0) {
        gamesListDiv.innerHTML = `<p class="text-center text-gray-500">${getTranslation('noGamesYet')}</p>`;
        return;
    }

    let gamesHtml = '<ul class="list-disc pl-5 text-gray-700 dark:text-gray-300">';
    games.forEach(game => {
        gamesHtml += `<li><span class="font-semibold">${game.name}</span> (${game.id.toUpperCase()})</li>`;
    });
    gamesHtml += '</ul>';
    gamesListDiv.innerHTML = gamesHtml;
}
