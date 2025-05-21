import { loggedInUser, users, teams, updateTeams, updateUsers } from './data.js';
import { getAlertTranslation, showNotification } from './utils.js';
import { teamStatusMessage, teamNameInput, teamContactInput, updateDashboardUI, listTeams } from './ui.js';

export async function createTeam(teamName, contactInfo) {
    if (!loggedInUser) {
        showNotification('error', getAlertTranslation('teamRequiredForAction'), false, 2000);
        return false;
    }
    if (users[loggedInUser].teamName) {
        showNotification('warning', getAlertTranslation('alreadyInTeam', users[loggedInUser].teamName), false, 2000);
        return false;
    }

    // Form Validation for Team Creation
    if (!teamName || !contactInfo) {
        showNotification('warning', getAlertTranslation('teamNameContactRequired'), false, 1500);
        return false;
    }

    if (teams[teamName]) {
        showNotification('error', getAlertTranslation('teamNameExists'), false, 1500);
        return false;
    } else {
        teams[teamName] = {
            teamName: teamName,
            leader: loggedInUser,
            contact: contactInfo,
            members: [loggedInUser]
        };
        users[loggedInUser].teamName = teamName;
        updateTeams(teams); // Update data
        updateUsers(users); // Update data

        showNotification('success', getAlertTranslation('teamCreated', teamName), false, 1500);
        teamStatusMessage.textContent = getAlertTranslation('teamCreated', teamName);
        teamStatusMessage.classList.add('text-green-600');
        teamStatusMessage.classList.remove('text-red-600', 'text-gray-600', 'text-blue-600');
        return true;
    }
}

export function handleTeamSearch(searchTerm) {
    const filteredTeams = Object.values(teams).filter(team =>
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    listTeams(filteredTeams); // Pass filtered list to UI module
}
