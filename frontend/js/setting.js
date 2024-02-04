document.addEventListener('DOMContentLoaded', function () {
var userIcon = document.querySelector('.user-icon');
var userMenu = document.querySelector('.user-menu');
var container = document.querySelector('.container');
var message = document.querySelector('.message');
var deleteAccountForm = document.querySelector('.delete-account-form');
var changePassForm = document.querySelector('.change-pass-form');

// Event listener for clicking on the user icon to toggle user menu
userIcon.addEventListener('click', function () {
    // Toggle the display of the user menu
    userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
});

var settingsLink = document.getElementById('settings-link');
var subMenu = document.getElementById('sub-menu');

// Event listener for clicking on the Settings link to toggle sub-menu
settingsLink.addEventListener('click', function (event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Toggle the display of the sub-menu
    subMenu.style.display = (subMenu.style.display === 'block') ? 'none' : 'block';
});

var editAccLink = document.querySelector('#sub-menu li:nth-child(1) a');
var changePassLink = document.querySelector('#sub-menu li:nth-child(2) a');
var deleteAccLink = document.querySelector('#sub-menu li:nth-child(3) a');

editAccLink.addEventListener('click', function () {
    // Show the container for 'Edit Acc'
    container.style.display = 'flex';
    changePassForm.style.display = 'none'; // Hide change-pass-form
    deleteAccountForm.style.display = 'none'; // Hide delete-account-form
    message.style.display = 'none'; // Hide message
});

changePassLink.addEventListener('click', function () {
    // Hide the container for 'Edit Acc' and display change-pass-form
    container.style.display = 'none';
    changePassForm.style.display = 'block';
    deleteAccountForm.style.display = 'none'; // Hide delete-account-form
    message.style.display = 'none'; // Hide message
});

deleteAccLink.addEventListener('click', function (event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Toggle the display of the delete-account-form only if it is not already displayed
    if (deleteAccountForm.style.display !== 'block') {
        deleteAccountForm.style.display = 'block';
        message.style.display = 'block'; // Show message
    } else {
        deleteAccountForm.style.display = 'block';
        message.style.display = 'block'; // Show message
    }

    // Hide other sections if needed
    container.style.display = 'none';
    changePassForm.style.display = 'none';
});




document.addEventListener('DOMContentLoaded', function () {
        const container = document.querySelector('.container');

        const storedData = localStorage.getItem('userData');

        if (storedData) {
            const userData = JSON.parse(storedData);
            updateContainer(userData);
        }
    });

    function updateContainer(userData) {
        // Your code to update the container based on the userData
        const fullNameElement = document.querySelector('.container [name="fullName"]');
        const reserveEmailElement = document.querySelector('.container [name="reserveEmail"]');
        const phoneNumberElement = document.querySelector('.container [name="phoneNumber"]');
        const birthDateElement = document.querySelector('.container [name="birthDate"]');
        const genderElement = document.querySelector('.container [name="gender"]');

        if (fullNameElement) fullNameElement.textContent = `Full Name: ${userData.fullName}`;
        if (reserveEmailElement) reserveEmailElement.textContent = `Reserve Email: ${userData.reserveEmail}`;
        if (phoneNumberElement) phoneNumberElement.textContent = `Phone Number: ${userData.phoneNumber}`;
        if (birthDateElement) birthDateElement.textContent = `Birth Date: ${userData.birthDate}`;
        if (genderElement) genderElement.textContent = `Gender: ${userData.gender}`;
        // Update other elements as needed
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve form data from localStorage
    const storedFormData = localStorage.getItem('formData');

    if (storedFormData) {
        const formData = JSON.parse(storedFormData);

        // Populate the form in settings.html
        document.getElementsByName('fullName')[0].value = formData.fullName;
        document.getElementsByName('reserveEmail')[0].value = formData.reserveEmail;
        document.getElementsByName('phoneNumber')[0].value = formData.phoneNumber;
        document.getElementsByName('birthDate')[0].value = formData.birthDate;
        document.getElementsByName('gender').forEach(radio => {
            if (radio.value === formData.gender) {
                radio.checked = true;
            }
        });

        // Corrected field names for the address
        document.getElementsByName('streetAddress')[0].value = formData.address.streetAddress;
        document.getElementsByName('country')[0].value = formData.address.country;
        document.getElementsByName('city')[0].value = formData.address.city;
        document.getElementsByName('region')[0].value = formData.address.region;
        document.getElementsByName('postalCode')[0].value = formData.address.postalCode;
    }

});

