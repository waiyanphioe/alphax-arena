import { loggedInUser, users, teams, updateUsers, updateTeams } from './data.js';
import { getAlertTranslation, showNotification } from './utils.js';
import { memberStatusMessage } from './ui.js';

export async function addMember(memberUsername) {
    if (!loggedInUser || !users[loggedInUser].teamName) {
        showNotification('warning', getAlertTranslation('teamRequiredForAction'), false, 2000);
        return false;
    }
    const myTeamName = users[loggedInUser].teamName;
    const team = teams[myTeamName];

    if (team.leader !== loggedInUser) {
        showNotification('error', getAlertTranslation('notTeamLeader'), false, 2000);
        return false;
    }

    if (!memberUsername) {
        showNotification('warning', getAlertTranslation('memberUsernameRequired'), false, 1500);
        return false;
    }
    if (!users[memberUsername]) {
        showNotification('error', getAlertTranslation('memberNotFound'), false, 2000);
        return false;
    }
    if (users[memberUsername].teamName) {
        showNotification('warning', getAlertTranslation('memberAlreadyInTeam', memberUsername), false, 2000);
        return false;
    }
    if (team.members.includes(memberUsername)) {
        showNotification('warning', getAlertTranslation('memberAlreadyInMyTeam', memberUsername), false, 2000);
        return false;
    }

    team.members.push(memberUsername);
    users[memberUsername].teamName = myTeamName;
    updateTeams(teams); // Update data
    updateUsers(users); // Update data

    showNotification('success', getAlertTranslation('memberAdded', memberUsername), false, 1500);
    memberStatusMessage.textContent = getAlertTranslation('memberAdded', memberUsername);
    memberStatusMessage.classList.add('text-green-600');
    memberStatusMessage.classList.remove('text-red-600', 'text-gray-600');
    return true;
}

export async function removeMember(memberUsername) {
    if (!loggedInUser || !users[loggedInUser].teamName) {
        showNotification('warning', getAlertTranslation('teamRequiredForAction'), false, 2000);
        return false;
    }
    const myTeamName = users[loggedInUser].teamName;
    const team = teams[myTeamName];

    if (team.leader !== loggedInUser) {
        showNotification('error', getAlertTranslation('notTeamLeader'), false, 2000);
        return false;
    }

    if (!memberUsername) {
        showNotification('warning', getAlertTranslation('memberUsernameRequired'), false, 1500);
        return false;
    }
    if (memberUsername === loggedInUser) {
        showNotification('warning', getAlertTranslation('cannotRemoveLeader'), false, 3000);
        return false;
    }
    const memberIndex = team.members.indexOf(memberUsername);
    if (memberIndex === -1) {
        showNotification('warning', getAlertTranslation('memberNotInTeam', memberUsername), false, 2000);
        return false;
    }

    team.members.splice(memberIndex, 1);
    users[memberUsername].teamName = null;
    updateTeams(teams); // Update data
    updateUsers(users); // Update data

    showNotification('success', getAlertTranslation('memberRemoved', memberUsername), false, 1500);
    memberStatusMessage.textContent = getAlertTranslation('memberRemoved', memberUsername);
    memberStatusMessage.classList.add('text-green-600');
    memberStatusMessage.classList.remove('text-red-600', 'text-gray-600');
    return true;
}
