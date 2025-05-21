export let currentLang = 'my'; // Default language: Myanmar
export let currentTheme = 'light'; // Default theme: light

const translations = {
    en: {
        appName: 'Esport Area App',
        loginTitle: 'Login',
        usernameLabel: 'Username:',
        passwordLabel: 'Password:',
        enterUsernamePlaceholder: 'Enter your username',
        enterPasswordPlaceholder: 'Enter your password',
        loginButton: 'Login',
        noAccountYet: 'Don\'t have an account yet?',
        signUpHere: 'Sign Up Here',
        signUpTitle: 'Sign Up',
        chooseUsernamePlaceholder: 'Choose a username',
        choosePasswordPlaceholder: 'Choose a password',
        signUpButton: 'Sign Up',
        alreadyHaveAccount: 'Already have an account?',
        loginHere: 'Login Here',
        dashboardTitle: 'Dashboard',
        welcomeMessage: 'Welcome, {0}!',
        logoutButton: 'Logout',
        teamCreationTitle: 'Team Creation',
        teamNameLabel: 'Team Name:',
        contactInfoLabel: 'Contact Info:',
        enterTeamNamePlaceholder: 'Enter team name',
        phoneEmailPlaceholder: 'Phone or Email',
        createTeamButton: 'Create Team',
        allTeamsTitle: 'All Teams',
        searchTeamsPlaceholder: 'Search teams by name...',
        viewTeamsButton: 'View Teams',
        noTeamsYet: 'No teams available yet.',
        appointmentMgmtTitle: 'Appointment Management',
        opponentTeamLabel: 'Opponent Team:',
        enterOpponentTeamPlaceholder: 'Enter opponent team name',
        dateTimeLabel: 'Date and Time (YYYY-MM-DD HH:MM):',
        requestAppointmentButton: 'Request Appointment',
        myAppointmentsTitle: 'My Appointments',
        viewMyAppointmentsButton: 'View My Appointments',
        noAppointmentsYet: 'No appointments available yet.',
        teamMemberMgmtTitle: 'Team Member Management',
        memberUsernameLabel: 'Member Username:',
        enterUsernameToAddRemovePlaceholder: 'Enter username to add/remove',
        addMemberButton: 'Add Member',
        removeMemberButton: 'Remove Member',
        myTeamMembersTitle: 'My Team Members:',
        noTeamMembersYet: 'No team members yet.',
        gamesListTitle: 'Available Games',
        noGamesYet: 'No games available yet.',
        leaderLabel: 'Leader', // New translation
        membersLabel: 'Members', // New translation
        teamsLabel: 'Teams', // New translation
        timeLabel: 'Time', // New translation
        statusLabel: 'Status', // New translation

        // JavaScript alerts/messages (for SweetAlert2)
        usernamePassRequired: 'Username and Password are required.',
        passwordLength: 'Password must be at least 6 characters long.',
        usernameExists: 'This Username already exists. Please choose another one.',
        signupSuccess: 'Account created successfully! You can now log in.',
        loginSuccess: 'Login successful!',
        loginFailed: 'Invalid Username or Password.',
        teamRequiredForAction: 'You need a team to perform this action.',
        alreadyInTeam: 'You are already in a team: "{0}". You cannot create another team.',
        teamNameContactRequired: 'Team Name and Contact Info are required.',
        teamNameExists: 'This Team Name already exists. Please choose another one.',
        teamCreated: '"{0}" Team created successfully!',
        teamUpdateSuccess: 'Your team information updated.',
        invalidDateTime: 'Invalid date/time or date/time is in the past.',
        opponentTeamRequired: 'Opponent Team Name and Date/Time are required.',
        opponentTeamNotFound: 'Opponent team not found.',
        cannotRequestSelfAppointment: 'You cannot request an appointment with your own team.',
        appointmentRequested: 'Appointment request successful! Waiting for "{0}" to accept.',
        memberUsernameRequired: 'Member Username is required.',
        memberNotFound: 'User not found. Please ask them to sign up first.',
        memberAlreadyInTeam: '"{0}" is already in another team.',
        memberAlreadyInMyTeam: '"{0}" is already in your team.',
        notTeamLeader: 'Only the Team Leader can manage members.',
        cannotRemoveLeader: 'Cannot remove the Team Leader. To delete the team, please contact admin.',
        memberNotInTeam: '"{0}" is not in your team.',
        memberAdded: '"{0}" added to your team!',
        memberRemoved: '"{0}" removed from your team!',
        appointmentAccepted: 'Appointment accepted.',
        appointmentRejected: 'Appointment rejected.',
        teamLeadersOnly: 'Only Team Leaders can accept/reject appointments.',
        teamLeaderManageMembers: 'Team Leader can manage members here.',
        createTeamToManageMembers: 'Create a team to manage members.',
        createTeamToRequestAppt: 'Create a team to request appointments.',
        createTeamMessage: 'You can create a team here!',
        confirmActionTitle: 'Confirm to {0}?',
        confirmActionText: 'Are you sure you want to {0} this appointment?',
        confirmButtonText: 'Yes, do it!',
        darkModeButton: 'Dark Mode',
        lightModeButton: 'Light Mode',
    },
    my: {
        appName: 'Esport နယ်မြေ App',
        loginTitle: 'လော့ဂ်အင်ဝင်မည်',
        usernameLabel: 'အသုံးပြုသူအမည်:',
        passwordLabel: 'လျှို့ဝှက်နံပါတ်:',
        enterUsernamePlaceholder: 'အသုံးပြုသူအမည်ထည့်ပါ',
        enterPasswordPlaceholder: 'လျှို့ဝှက်နံပါတ်ထည့်ပါ',
        loginButton: 'လော့ဂ်အင်',
        noAccountYet: 'အကောင့်မရှိသေးဘူးလား?',
        signUpHere: 'အကောင့်ဖွင့်မည်',
        signUpTitle: 'အကောင့်ဖွင့်မည်',
        chooseUsernamePlaceholder: 'အသုံးပြုသူအမည်ရွေးပါ',
        choosePasswordPlaceholder: 'လျှို့ဝှက်နံပါတ်ရွေးပါ',
        signUpButton: 'အကောင့်ဖွင့်မည်',
        alreadyHaveAccount: 'အကောင့်ရှိပြီးသားလား?',
        loginHere: 'လော့ဂ်အင်ဝင်မည်',
        dashboardTitle: 'ဒက်ရှ်ဘုတ်',
        welcomeMessage: 'ကြိုဆိုပါတယ်, {0}!',
        logoutButton: 'အကောင့်ထွက်မည်',
        teamCreationTitle: 'Team ဖွဲ့စည်းခြင်း',
        teamNameLabel: 'Team အမည်:',
        contactInfoLabel: 'ဆက်သွယ်ရန်အချက်အလက်:',
        enterTeamNamePlaceholder: 'Team အမည်ထည့်ပါ',
        phoneEmailPlaceholder: 'ဖုန်း သို့မဟုတ် အီးမေးလ်',
        createTeamButton: 'Team ဖွဲ့မည်',
        allTeamsTitle: 'ရှိသမျှ Team များ',
        searchTeamsPlaceholder: 'Team အမည်ဖြင့် ရှာဖွေပါ...',
        viewTeamsButton: 'Team များကို ကြည့်မည်',
        noTeamsYet: 'Team များ မရှိသေးပါ။',
        appointmentMgmtTitle: 'Appointment စီမံခန့်ခွဲခြင်း',
        opponentTeamLabel: 'ပြိုင်ဘက် Team:',
        enterOpponentTeamPlaceholder: 'ပြိုင်ဘက် Team အမည်ထည့်ပါ',
        dateTimeLabel: 'ရက်စွဲနှင့် အချိန် (YYYY-MM-DD HH:MM):',
        requestAppointmentButton: 'Appointment တောင်းဆိုမည်',
        myAppointmentsTitle: 'ကျွန်ုပ်၏ Appointment များ',
        viewMyAppointmentsButton: 'Appointments များကို ကြည့်မည်',
        noAppointmentsYet: 'Appointment များ မရှိသေးပါ။',
        teamMemberMgmtTitle: 'Team Member စီမံခန့်ခွဲခြင်း',
        memberUsernameLabel: 'Member အသုံးပြုသူအမည်:',
        enterUsernameToAddRemovePlaceholder: 'ထည့်သွင်း/ဖယ်ရှားလိုသော အသုံးပြုသူအမည်ထည့်ပါ',
        addMemberButton: 'Member ထည့်မည်',
        removeMemberButton: 'Member ဖယ်ရှားမည်',
        myTeamMembersTitle: 'ကျွန်ုပ်၏ Team Members:',
        noTeamMembersYet: 'Team Members များ မရှိသေးပါ။',
        gamesListTitle: 'ရရှိနိုင်သော ဂိမ်းများ',
        noGamesYet: 'ဂိမ်းများ မရှိသေးပါ။',
        leaderLabel: 'ခေါင်းဆောင်',
        membersLabel: 'အဖွဲ့ဝင်များ',
        teamsLabel: 'Team များ',
        timeLabel: 'အချိန်',
        statusLabel: 'အခြေအနေ',

        // JavaScript alerts/messages (for SweetAlert2)
        usernamePassRequired: 'အသုံးပြုသူအမည်နှင့် လျှို့ဝှက်နံပါတ် ဖြည့်ပါ။',
        passwordLength: 'လျှို့ဝှက်နံပါတ် အနည်းဆုံး ၆ လုံး ရှိရပါမည်။',
        usernameExists: 'ဤအသုံးပြုသူအမည်ရှိပြီးသားဖြစ်သည်။ အခြားတစ်ခုရွေးပါ။',
        signupSuccess: 'အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။ ယခု လော့ဂ်အင်ဝင်နိုင်ပါပြီ။',
        loginSuccess: 'လော့ဂ်အင် အောင်မြင်ပါသည်။',
        loginFailed: 'အသုံးပြုသူအမည် သို့မဟုတ် လျှို့ဝှက်နံပါတ် မှားယွင်းပါသည်။',
        teamRequiredForAction: 'ဤလုပ်ဆောင်ချက်အတွက် Team တစ်ခုရှိရန် လိုအပ်ပါသည်။',
        alreadyInTeam: 'သင်သည် "{0}" Team တွင် ရှိနှင့်ပြီးသားဖြစ်သည်။ အခြား Team ထပ်ဖွဲ့၍ မရပါ။',
        teamNameContactRequired: 'Team အမည်နှင့် ဆက်သွယ်ရန်အချက်အလက် ဖြည့်ပါ။',
        teamNameExists: 'ဤ Team အမည်ရှိပြီးသားဖြစ်သည်။ အခြားတစ်ခုရွေးပါ။',
        teamCreated: '"{0}" Team ကို အောင်မြင်စွာ ဖွဲ့စည်းပြီးပါပြီ။',
        teamUpdateSuccess: 'သင်၏ Team အချက်အလက်များ အပ်ဒိတ်လုပ်ပြီးပါပြီ။',
        invalidDateTime: 'ရက်စွဲ သို့မဟုတ် အချိန် မှားယွင်းပါသည်။ သို့မဟုတ် အတိတ်ကအချိန်ဖြစ်သည်။',
        opponentTeamRequired: 'ပြိုင်ဘက် Team အမည်နှင့် ရက်စွဲ/အချိန် ဖြည့်ပါ။',
        opponentTeamNotFound: 'ပြိုင်ဘက် Team ကို ရှာမတွေ့ပါ။',
        cannotRequestSelfAppointment: 'ကိုယ့် Team ကိုယ် Appointment တောင်းဆို၍ မရပါ။',
        appointmentRequested: 'Appointment တောင်းဆိုခြင်း အောင်မြင်ပါသည်။ "{0}" မှ လက်ခံရန် စောင့်ဆိုင်းပါ။',
        memberUsernameRequired: 'Member အသုံးပြုသူအမည် ဖြည့်ပါ။',
        memberNotFound: 'အသုံးပြုသူကို ရှာမတွေ့ပါ။ အရင်ဆုံး အကောင့်ဖွင့်ရန် ပြောပါ။',
        memberAlreadyInTeam: '"{0}" သည် အခြား Team တစ်ခုတွင် ရှိနှင့်ပြီးသားဖြစ်သည်။',
        memberAlreadyInMyTeam: '"{0}" သည် သင်၏ Team ထဲတွင် ရှိပြီးသားဖြစ်သည်။',
        notTeamLeader: 'Team Leader မှသာ Member များကို စီမံခန့်ခွဲနိုင်ပါသည်။',
        cannotRemoveLeader: 'Team Leader ကိုယ်တိုင် ဖယ်ရှား၍ မရပါ။ Team ဖျက်သိမ်းလိုပါက Admin ကို ဆက်သွယ်ပါ။',
        memberNotInTeam: '"{0}" သည် သင်၏ Team ထဲတွင် မရှိပါ။',
        memberAdded: '"{0}" ကို သင်၏ Team ထဲ ထည့်လိုက်ပါပြီ။',
        memberRemoved: '"{0}" ကို သင်၏ Team ထဲက ဖယ်လိုက်ပါပြီ။',
        appointmentAccepted: 'Appointment လက်ခံပြီးပါပြီ။',
        appointmentRejected: 'Appointment ပယ်ချပြီးပါပြီ။',
        teamLeadersOnly: 'Team Leader များသာ Appointment များကို လက်ခံ/ပယ်ချနိုင်ပါသည်။',
        teamLeaderCanManageMembers: 'Team Leader များမှသာ Member များကို ဤနေရာတွင် စီမံခန့်ခွဲနိုင်ပါသည်။',
        createTeamToManageMembers: 'Member များကို စီမံခန့်ခွဲရန် Team တစ်ခု ဖွဲ့စည်းပါ။',
        createTeamToRequestAppt: 'Appointment တောင်းဆိုရန် Team တစ်ခု ဖွဲ့စည်းပါ။',
        createTeamMessage: 'Team တစ်ခု ဖွဲ့စည်းနိုင်ပါသည်။',
        confirmActionTitle: '{0} ရန် အတည်ပြုမည်လား?',
        confirmActionText: 'ဤ Appointment ကို {0} ရန် သေချာပါသလား?',
        confirmButtonText: 'ဟုတ်ကဲ့၊ လုပ်ဆောင်ပါမည်။',
        darkModeButton: 'အမှောင်ပုံစံ',
        lightModeButton: 'အလင်းပုံစံ',
    }
};

const themeToggleBtn = document.getElementById('theme-toggle');

// Function to get translated text for UI elements
export function getTranslation(key, ...args) {
    let text = translations[currentLang][key] || translations['en'][key] || key;
    args.forEach((arg, i) => {
        text = text.replace(`{${i}}`, arg);
    });
    return text;
}

// Function to get translated text for SweetAlert2 notifications
export function getAlertTranslation(key, ...args) {
    let text = translations[currentLang][key] || translations['en'][key] || key;
    args.forEach((arg, i) => {
        text = text.replace(`{${i}}`, arg);
    });
    return text;
}


// Function to update all UI elements with current language
export function updateUIStrings() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        const translation = getTranslation(key);

        if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
            element.setAttribute('placeholder', translation);
        } else {
            // For general text content, replace innerHTML only if it's not a link or contains dynamic content
            if (!element.querySelector('a') && !element.id.includes('-message') && element.id !== 'welcome-message') {
                 element.textContent = translation;
            } else {
                // Special handling for elements with nested links or dynamic content
                if (element.id === 'noAccountYet' || element.id === 'alreadyHaveAccount') {
                    // Check if link exists, then update its text content based on its data-key
                    const linkElement = element.querySelector('a');
                    if (linkElement && linkElement.dataset.key) {
                         linkElement.textContent = getTranslation(linkElement.dataset.key);
                    }
                    // Then update the parent paragraph's text, including the new link text
                    // This is a bit tricky, but we can reconstruct it for these specific cases.
                    // For more complex cases, it's better to let the text be updated directly
                    // and handle link text separately in JS.
                    // For now, let's just make sure the link text is updated. The parent text might be static.
                } else if (element.id === 'welcome-message') {
                     // This is updated dynamically by updateDashboardUI, so don't overwrite
                }
                 else {
                     element.textContent = translation;
                 }
            }
        }
    });

    // Update specific button texts manually because they don't have data-key on their text
    document.getElementById('language-toggle').textContent = (currentLang === 'en' ? 'Myanmar (မြန်မာ)' : 'English');
    document.getElementById('theme-toggle').textContent = (currentTheme === 'light' ? getAlertTranslation('darkModeButton') : getAlertTranslation('lightModeButton'));
}

// Custom SweetAlert2 notification function
export function showNotification(icon, title, text = '', timer = 0) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: timer
    });
}

// Initialize language and theme from localStorage
export function initLanguageAndTheme() {
    const savedLang = localStorage.getItem('appLang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }

    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    }
}
