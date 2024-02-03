// JavaScript-код для відображення та закриття модального вікна
var modal = document.getElementById('myModalCard');
var modalBackground = document.getElementById('modalBackground');
var addButton = document.getElementById('createNewBtn');
var closeBtn = document.getElementsByClassName('close')[0];
var cancelBtn = document.querySelector('#myModalCard [type="cancel"]');
var userIcon = document.querySelector('.user-icon');
var userMenu = document.querySelector('.user-menu');
var categoriesBtn = document.getElementById('categories');
var addFolderBtn = document.getElementById('addFolder');
var folderModalBackground = document.getElementById('folmodalBackground'); 
var folderModal = document.getElementById('folderModal');
var addFolderForm = document.getElementById('addFolderForm');
var foldersMenu = document.querySelector('.folders-menu');
var folderCloseBtn = document.querySelector('.folclose'); 

// Event listener for clicking on the user icon to toggle user menu
userIcon.addEventListener('click', function () {
    // Toggle the display of the user menu
    userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
});

function createFolder() {
    var folderName = document.getElementById('Name').value.trim();
    if (folderName) {
        // Here, you can add the logic to handle the creation of the folder.
        // For simplicity, I'm just appending the folder name to the menu.
        var folderItem = document.createElement('div');
        folderItem.textContent = folderName;
        foldersMenu.appendChild(folderItem);
    }
}

function showFoldersMenu() {
    // Toggle the display of the folders menu
    foldersMenu.style.display = (foldersMenu.style.display === 'block') ? 'none' : 'block';
    // Set overflow-y to "auto" for scrolling
    foldersMenu.style.overflowY = 'auto';

    // Set a maximum height for the menu (adjust the value as needed)
    foldersMenu.style.maxHeight = '90px';
}


// Event listener for the "Add Folder" button
addFolderBtn.addEventListener('click', function () {
    // Show the form for adding a folder
    folderModalBackground.style.display = 'block';
    folderModal.style.display = 'block';
});

folderCloseBtn.onclick = function () {
    folderModal.style.display = 'none';
    folderModalBackground.style.display = 'none';
}

// Event listener for the categories button
categoriesBtn.addEventListener('click', showFoldersMenu);

// Event listener for the form submission
addFolderForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Create the folder and update the display
    createFolder();
    // Close the modal window
    folderModalBackground.style.display = 'none';
    folderModal.style.display = 'none';
});

// Event listener for the "Cancel" button in the modal
var cancelButton = document.querySelector('[type="cancel"]');
cancelButton.addEventListener('click', function () {
    // Close the modal window
    folderModalBackground.style.display = 'none';
    folderModal.style.display = 'none';
});


    // Event listener for clicking on the user icon to toggle user menu
    userIcon.addEventListener('click', function() {
        // Toggle the display of the user menu
        userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
    });

addButton.onclick = function() {
    modal.style.display = 'block';
    modalBackground.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
    modalBackground.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modalBackground) {
        modal.style.display = 'none';
        modalBackground.style.display = 'none';
    }
}
cancelBtn.onclick = function() {
    modal.style.display = 'none';
    modalBackground.style.display = 'none';
}

// Логіка додавання даних облікового запису та паролю
document.getElementById('myModalCard').addEventListener('submit', function(event) {
    event.preventDefault();
    var accountName = document.getElementById('accountName').value;
    var folder = document.getElementById('folder').value;
    var notes = document.getElementById('notes').value;
    var masterPasswordReprompt = document.getElementById('masterPasswordReprompt').checked;

    // Тут можна вставити логіку для збереження даних облікового запису та пароля
    // Наприклад, можна зберегти їх у масив, базу даних або файл.

    // Додайте ваш код для збереження даних
    // Наприклад, виведіть їх у консоль для демонстрації
    console.log('Name:', accountName);
    console.log('Folder:', folder);
    console.log('Notes:', notes);
    console.log('Master password re-prompt:', masterPasswordReprompt);

    // Закриття модального вікна після додавання даних облікового запису та паролю
    modal.style.display = 'none';
});

document.addEventListener('click', function (event) {
    var isUserIconClicked = userIcon.contains(event.target);
    var isUserMenuClicked = userMenu.contains(event.target);

    if (!isUserIconClicked && !isUserMenuClicked) {
        // Клік поза user-icon та user-menu, ховаємо user-menu
        userMenu.style.display = 'none';
    }
});

// Event listener for clicking on the user icon to toggle user menu
userIcon.addEventListener('click', function () {
    // Toggle the display of the user menu
    userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
});



