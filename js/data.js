export let users = {};
export let teams = {};
export let appointments = [];
export let loggedInUser = null;

export const games = [
    { id: 'dota2', name: 'Dota 2' },
    { id: 'lol', name: 'League of Legends' },
    { id: 'cs2', name: 'Counter-Strike 2' },
    { id: 'valorant', name: 'Valorant' },
    { id: 'pubg', name: 'PUBG: Battlegrounds' },
    { id: 'mlbb', name: 'Mobile Legends: Bang Bang' },
];

// Function to initialize data (e.g., from localStorage or mock data)
export function initData() {
    // For demonstration, let's add some mock data if empty
    if (Object.keys(users).length === 0) {
        users['testuser'] = { password: 'password123', teamName: null };
        users['leader1'] = { password: 'password', teamName: 'Alpha' };
        users['member1'] = { password: 'password', teamName: 'Alpha' };
        users['leader2'] = { password: 'password', teamName: null }; // Will create 'Beta' team
    }

    if (Object.keys(teams).length === 0) {
        teams['Alpha'] = {
            teamName: 'Alpha',
            leader: 'leader1',
            contact: 'alpha@example.com',
            members: ['leader1', 'member1']
        };
    }

    // You can load data from localStorage here if you want persistence across sessions
    // const savedUsers = localStorage.getItem('users');
    // if (savedUsers) users = JSON.parse(savedUsers);
    // ... similarly for teams, appointments
}

export function setLoggedInUser(username) {
    loggedInUser = username;
}

export function clearLoggedInUser() {
    loggedInUser = null;
}

export function updateUsers(newUsers) {
    users = newUsers;
}

export function updateTeams(newTeams) {
    teams = newTeams;
}

export function updateAppointments(newAppointments) {
    appointments = newAppointments;
}
