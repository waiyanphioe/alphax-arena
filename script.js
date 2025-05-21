// script.js

// Get references to HTML elements
const loginPanel = document.getElementById('login-panel');
const signupPanel = document.getElementById('signup-panel');
const dashboardPanel = document.getElementById('dashboard-panel');

const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');

const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

const signupUsernameInput = document.getElementById('signup-username');
const signupPasswordInput = document.getElementById('signup-password');
const signupButton = document.getElementById('signup-button');

const welcomeMessage = document.getElementById('welcome-message');
const logoutButton = document.getElementById('logout-button');

const teamNameInput = document.getElementById('team-name');
const teamContactInput = document.getElementById('team-contact');
const createTeamButton = document.getElementById('create-team-button');
const teamStatusMessage = document.getElementById('team-status-message');
const teamListDiv = document.getElementById('team-list');
const refreshTeamsButton = document.getElementById('refresh-teams-button');

// Appointment Management Elements
const opponentTeamNameInput = document.getElementById('opponent-team-name');
const appointmentDatetimeInput = document.getElementById('appointment-datetime');
const requestAppointmentButton = document.getElementById('request-appointment-button');
const appointmentStatusMessage = document.getElementById('appointment-status-message');
const myAppointmentsListDiv = document.getElementById('my-appointments-list');
const refreshAppointmentsButton = document.getElementById('refresh-appointments-button');

// Team Member Management Elements
const memberUsernameInput = document.getElementById('member-username');
const addMemberButton = document.getElementById('add-member-button');
const removeMemberButton = document.getElementById('remove-member-button');
const memberStatusMessage = document.getElementById('member-status-message');
const myTeamMembersListDiv = document.getElementById('my-team-members-list');


// --- Data Storage (Temporary - In-Memory) ---
// In a real app, this data would come from a backend server and a database.
const users = {}; // Stores users: { username: { password: '...', teamName: '...' } }
const teams = {}; // Stores teams: { teamName: { leader: '...', contact: '...', members: [] } }
const appointments = []; // Stores appointments: [{ team1: '...', team2: '...', datetime: '...', status: '...' }]
let loggedInUser = null; // Stores the current logged-in user's username

// --- UI Navigation Functions ---
function showPanel(panelToShow) {
    const panels = [loginPanel, signupPanel, dashboardPanel];
    panels.forEach(panel => {
        panel.classList.remove('active'); // Hide all panels
    });
    panelToShow.classList.add('active'); // Show the selected panel
}

// --- Event Listeners ---
showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    showPanel(signupPanel);
    clearFormFields();
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPanel(loginPanel);
    clearFormFields();
});

loginButton.addEventListener('click', () => {
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!username || !password) {
        alert('Username and Password ဖြည့်ပါ။');
        return;
    }

    const user = users[username];
    if (user && user.password === password) {
        loggedInUser = username;
        alert(`Login အောင်မြင်ပါပြီ။ ${loggedInUser} မှ ကြိုဆိုပါတယ်။`);
        updateDashboardUI(); // Update dashboard elements based on logged-in user
        showPanel(dashboardPanel);
        clearFormFields();
    } else {
        alert('Username သို့မဟုတ် Password မှားယွင်းနေပါသည်။');
    }
});

signupButton.addEventListener('click', () => {
    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value.trim();

    if (!username || !password) {
        alert('Username နှင့် Password ဖြည့်ပါ။');
        return;
    }

    if (users[username]) {
        alert('ဒီ Username ရှိပြီးသားပါ။ တခြားတစ်ခု ရွေးပေးပါ။');
    } else {
        users[username] = { password: password, teamName: null };
        alert('အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါပြီ။ Login ဝင်နိုင်ပါပြီ။');
        showPanel(loginPanel); // Go back to login after successful signup
        clearFormFields();
    }
});

logoutButton.addEventListener('click', () => {
    loggedInUser = null;
    alert('Logout အောင်မြင်ပါပြီ။');
    showPanel(loginPanel);
    clearFormFields();
});

createTeamButton.addEventListener('click', () => {
    if (!loggedInUser) {
        alert('Team ဖွဲ့ရန် Login ဝင်ရန် လိုအပ်ပါသည်။');
        return;
    }
    if (users[loggedInUser].teamName) {
        alert(`သင်သည် ${users[loggedInUser].teamName} တွင် ရှိပြီးသားပါ။ Team အသစ်ထပ်ဖွဲ့၍ မရပါ။`);
        return;
    }

    const teamName = teamNameInput.value.trim();
    const contactInfo = teamContactInput.value.trim();

    if (!teamName || !contactInfo) {
        alert('Team Name နှင့် Contact Info ဖြည့်ပါ။');
        return;
    }

    if (teams[teamName]) {
        alert('ဒီ Team Name ရှိပြီးသားပါ။ တခြားတစ်ခု ရွေးပေးပါ။');
    } else {
        teams[teamName] = {
            teamName: teamName, // Store teamName explicitly for display
            leader: loggedInUser,
            contact: contactInfo,
            members: [loggedInUser] // Leader is the first member
        };
        users[loggedInUser].teamName = teamName; // Assign team to user
        alert(`${teamName} Team ကို အောင်မြင်စွာ ဖွဲ့စည်းပြီးပါပြီ။`);
        teamStatusMessage.textContent = `"${teamName}" ကို ဖွဲ့စည်းပြီးပါပြီ။`;
        teamStatusMessage.classList.add('text-green-600');
        teamStatusMessage.classList.remove('text-red-600');
        teamNameInput.value = '';
        teamContactInput.value = '';
        updateDashboardUI(); // Re-enable/disable fields
        listTeams(); // Refresh team list after creation
    }
});

refreshTeamsButton.addEventListener('click', () => {
    listTeams();
});

requestAppointmentButton.addEventListener('click', () => {
    if (!loggedInUser || !users[loggedInUser].teamName) {
        alert('Appointment တောင်းဆိုရန်အတွက် Team တစ်ခုရှိရပါမည်။');
        return;
    }

    const myTeamName = users[loggedInUser].teamName;
    const opponentTeamName = opponentTeamNameInput.value.trim();
    const dateTime = appointmentDatetimeInput.value.trim();

    if (!opponentTeamName || !dateTime) {
        alert('ပြိုင်ဘက် Team Name နှင့် ရက်စွဲ/အချိန် ဖြည့်ပါ။');
        return;
    }

    if (!teams[opponentTeamName]) {
        alert('ထို Team Name ကို ရှာမတွေ့ပါ။');
        return;
    }
    if (opponentTeamName === myTeamName) {
        alert('ကိုယ့် Team ကိုယ် Appointment တောင်းလို့မရပါဘူး။');
        return;
    }

    const newAppointment = {
        team1Name: myTeamName,
        team2Name: opponentTeamName,
        dateTime: dateTime,
        status: 'Pending'
    };
    appointments.push(newAppointment);
    alert('Appointment တောင်းဆိုခြင်း အောင်မြင်ပါပြီ။ ' + opponentTeamName + ' မှ လက်ခံရန် စောင့်ဆိုင်းပါ။');
    appointmentStatusMessage.textContent = 'Appointment တောင်းဆိုခြင်း အောင်မြင်ပါပြီ။';
    appointmentStatusMessage.classList.add('text-green-600');
    appointmentStatusMessage.classList.remove('text-red-600');
    opponentTeamNameInput.value = '';
    appointmentDatetimeInput.value = '';
    listMyAppointments(); // Refresh appointment list
});

refreshAppointmentsButton.addEventListener('click', () => {
    listMyAppointments();
});

addMemberButton.addEventListener('click', () => {
    if (!loggedInUser || !users[loggedInUser].teamName) {
        alert('Team Member ထည့်သွင်းရန်အတွက် Team တစ်ခုရှိရပါမည်။');
        return;
    }
    const myTeamName = users[loggedInUser].teamName;
    const team = teams[myTeamName];

    if (team.leader !== loggedInUser) {
        alert('Team Member ထည့်သွင်းရန် Team Leader ဖြစ်ရပါမည်။');
        return;
    }

    const memberToAdd = memberUsernameInput.value.trim();
    if (!memberToAdd) {
        alert('ထည့်သွင်းလိုသော Member Username ဖြည့်ပါ။');
        return;
    }
    if (!users[memberToAdd]) {
        alert('ထို Username ကို ရှာမတွေ့ပါ။ အရင်ဆုံး အကောင့်ဖွင့်ရပါမည်။');
        return;
    }
    if (users[memberToAdd].teamName) {
        alert(`${memberToAdd} သည် အခြား Team တစ်ခုတွင် ရှိနှင့်ပြီးသားဖြစ်သည်။`);
        return;
    }
    if (team.members.includes(memberToAdd)) {
        alert(`${memberToAdd} သည် Team ထဲတွင် ရှိပြီးသားဖြစ်သည်။`);
        return;
    }

    team.members.push(memberToAdd);
    users[memberToAdd].teamName = myTeamName; // Assign team to the new member
    alert(`${memberToAdd} ကို ${myTeamName} ထဲ ထည့်လိုက်ပါပြီ။`);
    memberStatusMessage.textContent = `${memberToAdd} ကို ထည့်လိုက်ပါပြီ။`;
    memberStatusMessage.classList.add('text-green-600');
    memberStatusMessage.classList.remove('text-red-600');
    memberUsernameInput.value = '';
    listMyTeamMembers(); // Refresh members list
});

removeMemberButton.addEventListener('click', () => {
    if (!loggedInUser || !users[loggedInUser].teamName) {
        alert('Team Member ဖယ်ရှားရန်အတွက် Team တစ်ခုရှိရပါမည်။');
        return;
    }
    const myTeamName = users[loggedInUser].teamName;
    const team = teams[myTeamName];

    if (team.leader !== loggedInUser) {
        alert('Team Member ဖယ်ရှားရန် Team Leader ဖြစ်ရပါမည်။');
        return;
    }

    const memberToRemove = memberUsernameInput.value.trim();
    if (!memberToRemove) {
        alert('ဖယ်ရှားလိုသော Member Username ဖြည့်ပါ။');
        return;
    }
    if (memberToRemove === loggedInUser) {
        alert('Team Leader ကိုယ်တိုင် ဖယ်ရှား၍ မရပါ။ Team ဖျက်သိမ်းလိုပါက Admin ကို ဆက်သွယ်ပါ။');
        return;
    }
    const memberIndex = team.members.indexOf(memberToRemove);
    if (memberIndex === -1) {
        alert(`${memberToRemove} သည် Team ထဲတွင် မရှိပါ။`);
        return;
    }

    team.members.splice(memberIndex, 1);
    users[memberToRemove].teamName = null; // Remove team from the user
    alert(`${memberToRemove} ကို ${myTeamName} ထဲက ဖယ်လိုက်ပါပြီ။`);
    memberStatusMessage.textContent = `${memberToRemove} ကို ဖယ်လိုက်ပါပြီ။`;
    memberStatusMessage.classList.add('text-green-600');
    memberStatusMessage.classList.remove('text-red-600');
    memberUsernameInput.value = '';
    listMyTeamMembers(); // Refresh members list
});

// --- Helper Functions ---
function clearFormFields() {
    loginUsernameInput.value = '';
    loginPasswordInput.value = '';
    signupUsernameInput.value = '';
    signupPasswordInput.value = '';
    teamNameInput.value = '';
    teamContactInput.value = '';
    opponentTeamNameInput.value = '';
    appointmentDatetimeInput.value = '';
    memberUsernameInput.value = '';

    // Clear status messages
    teamStatusMessage.textContent = '';
    appointmentStatusMessage.textContent = '';
    memberStatusMessage.textContent = '';
}

function updateDashboardUI() {
    if (loggedInUser) {
        welcomeMessage.textContent = `Welcome, ${loggedInUser}!`;
        const hasTeam = users[loggedInUser].teamName !== null;

        // Team Creation Section
        teamNameInput.disabled = hasTeam;
        teamContactInput.disabled = hasTeam;
        createTeamButton.disabled = hasTeam;
        if (hasTeam) {
            teamStatusMessage.textContent = `သင်၏ Team: ${users[loggedInUser].teamName}`;
            teamStatusMessage.classList.add('text-blue-600');
            teamStatusMessage.classList.remove('text-red-600', 'text-green-600');
        } else {
            teamStatusMessage.textContent = 'Team တစ်ခုဖွဲ့နိုင်ပါသည်။';
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
            memberStatusMessage.textContent = 'Team ဖွဲ့ပြီးမှ Member များကို စီမံခန့်ခွဲနိုင်ပါသည်။';
            memberStatusMessage.classList.add('text-gray-600');
            memberStatusMessage.classList.remove('text-green-600', 'text-red-600');
        } else if (!isTeamLeader) {
            memberStatusMessage.textContent = 'Team Leader မှသာ Member များကို စီမံခန့်ခွဲနိုင်ပါသည်။';
            memberStatusMessage.classList.add('text-red-600');
            memberStatusMessage.classList.remove('text-green-600', 'text-gray-600');
        } else {
            memberStatusMessage.textContent = 'Team Member များကို ထည့်သွင်း/ဖယ်ရှားပါ။';
            memberStatusMessage.classList.remove('text-red-600', 'text-gray-600');
            memberStatusMessage.classList.add('text-green-600');
        }
        listMyTeamMembers();

        // Appointment Management Section
        requestAppointmentButton.disabled = !hasTeam;
        opponentTeamNameInput.disabled = !hasTeam;
        appointmentDatetimeInput.disabled = !hasTeam;
        if (!hasTeam) {
            appointmentStatusMessage.textContent = 'Appointment တောင်းဆိုရန် Team တစ်ခုရှိရပါမည်။';
            appointmentStatusMessage.classList.add('text-gray-600');
            appointmentStatusMessage.classList.remove('text-green-600', 'text-red-600');
        } else {
            appointmentStatusMessage.textContent = ''; // Clear default message
        }
        listMyAppointments();

    }
}

function listTeams() {
    teamListDiv.innerHTML = ''; // Clear existing list

    if (Object.keys(teams).length === 0) {
        teamListDiv.innerHTML = '<p class="text-center text-gray-500">Team များ မရှိသေးပါ။</p>';
        return;
    }

    let teamListHtml = '';
    for (const teamName in teams) {
        const team = teams[teamName];
        teamListHtml += `
            <div class="bg-gray-100 p-3 rounded-md mb-2">
                <p><strong class="text-gray-800">Team Name:</strong> ${team.teamName}</p>
                <p><strong class="text-gray-800">Leader:</strong> ${team.leader}</p>
                <p><strong class="text-gray-800">Members:</strong> ${team.members.length} (${team.members.join(', ')})</p>
                <p><strong class="text-gray-800">Contact:</strong> ${team.contact}</p>
            </div>
        `;
    }
    teamListDiv.innerHTML = teamListHtml;
}

function listMyAppointments() {
    myAppointmentsListDiv.innerHTML = ''; // Clear existing list

    if (!loggedInUser || !users[loggedInUser].teamName) {
        myAppointmentsListDiv.innerHTML = '<p class="text-center text-gray-500">Appointment များ မရှိသေးပါ။</p>';
        return;
    }

    const myTeamName = users[loggedInUser].teamName;
    const myAppointments = appointments.filter(
        appt => appt.team1Name === myTeamName || appt.team2Name === myTeamName
    );

    if (myAppointments.length === 0) {
        myAppointmentsListDiv.innerHTML = '<p class="text-center text-gray-500">Appointment များ မရှိသေးပါ။</p>';
        return;
    }

    myAppointments.forEach((appt, index) => {
        let apptHtml = `
            <div class="bg-gray-100 p-3 rounded-md mb-2 ${appt.status === 'Accepted' ? 'border-l-4 border-green-500' : appt.status === 'Rejected' ? 'border-l-4 border-red-500' : 'border-l-4 border-yellow-500'}">
                <p><strong class="text-gray-800">Teams:</strong> ${appt.team1Name} vs ${appt.team2Name}</p>
                <p><strong class="text-gray-800">Time:</strong> ${appt.dateTime.replace('T', ' ')}</p>
                <p><strong class="text-gray-800">Status:</strong> <span class="font-semibold ${appt.status === 'Accepted' ? 'text-green-600' : appt.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}">${appt.status}</span></p>
        `;

        // If I am team2 and status is Pending, show accept/reject buttons
        if (appt.team2Name === myTeamName && appt.status === 'Pending') {
            apptHtml += `
                <div class="mt-2 flex gap-2">
                    <button class="bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 transition duration-200 appointment-action-btn" data-index="${index}" data-action="accept">Accept</button>
                    <button class="bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600 transition duration-200 appointment-action-btn" data-index="${index}" data-action="reject">Reject</button>
                </div>
            `;
        }
        apptHtml += `</div>`;
        myAppointmentsListDiv.innerHTML += apptHtml;
    });

    // Add event listeners to newly created buttons
    document.querySelectorAll('.appointment-action-btn').forEach(button => {
        button.onclick = (event) => {
            const index = event.target.dataset.index;
            const action = event.target.dataset.action;
            handleAppointmentAction(index, action);
        };
    });
}

function handleAppointmentAction(index, action) {
    if (appointments[index]) {
        appointments[index].status = action.charAt(0).toUpperCase() + action.slice(1); // Capitalize first letter (Accept/Reject)
        alert(`Appointment ${action}ed.`);
        listMyAppointments(); // Refresh the list to show updated status
    }
}

function listMyTeamMembers() {
    myTeamMembersListDiv.innerHTML = ''; // Clear existing list

    if (!loggedInUser || !users[loggedInUser].teamName) {
        myTeamMembersListDiv.innerHTML = '<p class="text-center text-gray-500">Team Members များ မရှိသေးပါ။</p>';
        return;
    }

    const myTeamName = users[loggedInUser].teamName;
    const team = teams[myTeamName];

    if (!team || team.members.length === 0) {
        myTeamMembersListDiv.innerHTML = '<p class="text-center text-gray-500">Team Members များ မရှိသေးပါ။</p>';
        return;
    }

    let membersHtml = '';
    team.members.forEach(member => {
        membersHtml += `<div class="bg-gray-100 p-2 rounded-md mb-1"><span class="font-semibold">${member}</span> ${member === team.leader ? '(Leader)' : ''}</div>`;
    });
    myTeamMembersListDiv.innerHTML = membersHtml;
}

// --- Initial Setup ---
// Start with login panel
showPanel(loginPanel);
clearFormFields();
updateDashboardUI(); // Call once to set initial state for dashboard elements
