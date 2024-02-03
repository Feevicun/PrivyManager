// Define the toggleMenu function
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('visible');
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the userMenu element
    const userMenu = document.getElementById('userMenu');

    // Add click event listener to userMenu
    userMenu.addEventListener('click', toggleMenu);
});

// Function to handle clicking the profile picture
function profilePictureClicked() {
    toggleMenu(); // Call toggleMenu function when profile picture is clicked
}
