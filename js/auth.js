import { users, setLoggedInUser, clearLoggedInUser, updateUsers } from './data.js';
import { getAlertTranslation, showNotification } from './utils.js';
import { clearFormFields, updateDashboardUI } from './ui.js'; // Import UI functions here

export async function login(username, password) {
    // Form Validation for Login
    if (!username || !password) {
        showNotification('warning', getAlertTranslation('usernamePassRequired'), false, 1500);
        return false;
    }

    const user = users[username];
    if (user && user.password === password) {
        setLoggedInUser(username);
        showNotification('success', getAlertTranslation('loginSuccess'), `${getAlertTranslation('welcomeMessage', username)}`, 1500);
        return true;
    } else {
        showNotification('error', getAlertTranslation('loginFailed'), false, 1500);
        return false;
    }
}

export async function signup(username, password) {
    // Form Validation for Sign Up
    if (!username || !password) {
        showNotification('warning', getAlertTranslation('usernamePassRequired'), false, 1500);
        return false;
    }
    if (password.length < 6) {
        showNotification('warning', getAlertTranslation('passwordLength'), false, 1500);
        return false;
    }

    if (users[username]) {
        showNotification('error', getAlertTranslation('usernameExists'), false, 1500);
        return false;
    } else {
        users[username] = { password: password, teamName: null };
        updateUsers(users); // Update the shared users object in data.js
        showNotification('success', getAlertTranslation('signupSuccess'), false, 1500);
        return true;
    }
}

export function logout() {
    clearLoggedInUser();
    showNotification('info', getAlertTranslation('logoutButton'), false, 1000);
}
