import { loggedInUser, users, teams, appointments, updateAppointments } from './data.js';
import { getAlertTranslation, showNotification } from './utils.js';
import { appointmentStatusMessage, listMyAppointments } from './ui.js';

export async function requestAppointment(opponentTeamName, dateTime) {
    if (!loggedInUser || !users[loggedInUser].teamName) {
        showNotification('warning', getAlertTranslation('teamRequiredForAction'), false, 2000);
        return false;
    }

    const myTeamName = users[loggedInUser].teamName;

    // Form Validation
    if (!opponentTeamName || !dateTime) {
        showNotification('warning', getAlertTranslation('opponentTeamRequired'), false, 1500);
        return false;
    }
    const apptTime = new Date(dateTime);
    if (isNaN(apptTime.getTime()) || apptTime < new Date()) {
        showNotification('warning', getAlertTranslation('invalidDateTime'), false, 2000);
        return false;
    }

    if (!teams[opponentTeamName]) {
        showNotification('error', getAlertTranslation('opponentTeamNotFound'), false, 1500);
        return false;
    }
    if (opponentTeamName === myTeamName) {
        showNotification('warning', getAlertTranslation('cannotRequestSelfAppointment'), false, 2000);
        return false;
    }

    const newAppointment = {
        team1Name: myTeamName,
        team2Name: opponentTeamName,
        dateTime: dateTime,
        status: 'Pending'
    };
    appointments.push(newAppointment);
    updateAppointments(appointments); // Update data

    showNotification('success', getAlertTranslation('appointmentRequested', opponentTeamName), false, 2000);
    appointmentStatusMessage.textContent = getAlertTranslation('appointmentRequested', opponentTeamName);
    appointmentStatusMessage.classList.add('text-green-600');
    appointmentStatusMessage.classList.remove('text-red-600', 'text-gray-600');
    return true;
}

export function handleAppointmentAction(index, action) {
    if (appointments[index]) {
        // Confirmation with SweetAlert2
        Swal.fire({
            title: getAlertTranslation('confirmActionTitle', action),
            text: getAlertTranslation('confirmActionText', action),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: getAlertTranslation('confirmButtonText')
        }).then((result) => {
            if (result.isConfirmed) {
                appointments[index].status = action.charAt(0).toUpperCase() + action.slice(1);
                updateAppointments(appointments); // Update data
                showNotification('success', getAlertTranslation(`appointment${action.charAt(0).toUpperCase() + action.slice(1)}`), false, 1500);
                listMyAppointments(); // Refresh the list to show updated status
            }
        });
    }
}
