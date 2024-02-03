document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('myModalDocument');
    var modalBackground = document.getElementById('modalBackgroundDocument');
    var addButton = document.getElementById('createNewBtn');
    var closeBtn = document.querySelector('#myModalDocument .close');
    var cancelBtn = document.querySelector('#myModalDocument [type="cancel"]');
    var userIcon = document.querySelector('.user-icon');
    var userMenu = document.querySelector('.user-menu');
    var categoriesBtn = document.getElementById('categories');
    var addFolderBtn = document.getElementById('addFolder');
    var folderModalBackground = document.getElementById('folmodalBackground'); 
    var folderModal = document.getElementById('folderModal');
    var addFolderForm = document.getElementById('addFolderForm');
    var foldersMenu = document.querySelector('.folders-menu');
    var folderCloseBtn = document.querySelector('.folclose'); 
    var containerWrapper = document.getElementById('containerWrapper');
    var savedDocuments = loadDataFromLocalStorage('documents');
    console.log('Loaded Documents:', savedDocuments);
    if (savedDocuments && savedDocuments.length > 0) {
        // Recreate document containers from the loaded data
        savedDocuments.forEach(function (documentData) {
            addDocumentContainer(containerWrapper, documentData);
        });

        // Optionally, hide the 'Middle' element if there are saved documents
        document.getElementById('Middle').style.display = 'none';
    }
// Clear local storage before loading existing accounts
// localStorage.clear();
  // Event listener for the "Add Document" button
  document.getElementById('createNewBtn').addEventListener('click', addDocument);

  // Event listener for form submission in the "Add Document" modal
  document.getElementById('addDocumentForm').addEventListener('submit', function (event) {
      event.preventDefault();
      addDocumentFromForm();
  });

  function addDocument() {
    // Show the modal for adding a document
    var documentModal = document.getElementById('myModalDocument');
    var documentBackground = document.getElementById('modalBackgroundDocument');

    documentModal.style.display = 'block';
    documentBackground.style.display = 'block';

    // Add logic for adding a document here (if needed)
}

function addDocumentFromForm() {
    // Get values from the form
    var documentName = document.getElementById('accountName').value;
    var thumbnailUrl = document.getElementById('photo').files[0]; // Assuming photo is the thumbnail
    var notes = document.getElementById('notes').value;
    var documentFileUrl = document.getElementById('file').files[0];

    // Create a new document data object
    var docId = 'document_' + Math.random().toString(36).substr(2, 9);
    var documentData = {
        name: documentName,
        thumbnailUrl: thumbnailUrl ? URL.createObjectURL(thumbnailUrl) : '', // Convert thumbnail to URL
        notes: notes,
        fileUrl: documentFileUrl ? URL.createObjectURL(documentFileUrl) : '', // Convert document file to URL
    };

    // Add the document container to the UI
    addDocumentContainer(containerWrapper, documentData);
    // Save the document data to local storage
    saveDataToLocalStorage('documents', documentData);


    // Close the modal after adding the document
    closeModal('myModalDocument', 'modalBackgroundDocument');

    // Optionally, reset the form for the next entry
    document.getElementById('addDocumentForm').reset();
    
}

function addDocumentContainer(containerWrapper, documentData) {
    var containerIndex = containerWrapper.children.length + 1;

    var documentContainer = document.createElement('div');
    documentContainer.className = 'document-container';
    documentContainer.innerHTML = `
    <div class="containerrs">
    <label for="accountName${containerIndex}"></label>
    <input type="text" id="accountName${containerIndex}" value="${documentData.name}" readonly>
    </div>
    <div class="imgs">
    <img class="star" width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/star--v1.png" class="star" alt="star--v1"/>
    <img class="dots" width="20" height="20" src="https://img.icons8.com/material-rounded/24/menu-2.png" class="dots" alt="menu-2"/>
</div>
<div class="rectangle"></div>
        <div class="document-content">
            <img src="${documentData.thumbnailUrl}" alt="Document Thumbnail" class="thumbnail">
            <p>${documentData.notes}</p>
        </div>
        <a href="${documentData.fileUrl}" download="document_${containerIndex}.pdf" class="btn">Download Document</a>
    `;

    containerWrapper.appendChild(documentContainer);
    // Check if the number of containers exceeds 12 and apply scrolling if needed
    if (containerWrapper.children.length > 12) {
        containerWrapper.style.overflowY = 'auto';
        containerWrapper.style.maxHeight = '700px'; // Adjust the max height as needed
    }

    document.getElementById('Middle').style.display = 'none';


    var dotsIcon = documentContainer.querySelector('.dots');
    var dotsMenu = documentContainer.querySelector('.dots-menu');

   // Event listener for clicking on the dots icon to show the context menu
containerWrapper.addEventListener('click', function (event) {
    var dotsIcon = event.target.closest('.dots');
    if (dotsIcon) {
        var accountBlock = dotsIcon.closest('.document-container');
        var dotsMenu = accountBlock.querySelector('.dots-menu');

        // Ensure dotsMenu is found before proceeding
        if (dotsMenu) {
            // Add event listeners for menu items
            dotsMenu.querySelectorAll('.menu-item').forEach(function (menuItem) {
                menuItem.addEventListener('click', function () {
                    handleDocumentMenuItemClick(menuItem.dataset.action, accountBlock);
                    dotsMenu.style.display = 'none';
                    // Assuming modal and background are global variables
                    modal.style.display = 'none';
                    background.style.display = 'none';
                });
            });
        }
    }
});


}
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
    };

    closeBtn.onclick = function() {
        modal.style.display = 'none';
        modalBackground.style.display = 'none';
    };

    cancelBtn.onclick = function() {
        modal.style.display = 'none';
        modalBackground.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modalBackground) {
            modal.style.display = 'none';
            modalBackground.style.display = 'none';
        }
    };

    // Function to add folder
    function addFolder() {
        var folderModal = document.getElementById('folderModal');
        var folderBackground = document.getElementById('folmodalBackground');

        // Display the modal for adding a folder
        folderModal.style.display = 'block';
        folderBackground.style.display = 'block';

        // Add logic for adding a folder here
    }

    // Event listener for the "Add Folder" button
    document.getElementById('addFolder').addEventListener('click', addFolder);

    // Function to add document
    function addDocument() {
        var documentModal = document.getElementById('myModalDocument');
        var documentBackground = document.getElementById('modalBackgroundDocument');

        // Display the modal for adding a document
        documentModal.style.display = 'block';
        documentBackground.style.display = 'block';

        // Add logic for adding a document here
    }

    // Event listener for the "Add" button
    document.getElementById('createNewBtn').addEventListener('click', addDocument);

    // Function to close modal
    function closeModal(modalId, backgroundId) {
        var modal = document.getElementById(modalId);
        var background = document.getElementById(backgroundId);

        // Close the modal
        modal.style.display = 'none';
        background.style.display = 'none';
    }

    // Event listener for closing the "Add Folder" modal
    document.querySelector('.folclose').addEventListener('click', function() {
        closeModal('folderModal', 'folmodalBackground');
    });

    // Event listener for closing the "Add Document" modal
    document.querySelector('#myModalDocument .close').addEventListener('click', function() {
        closeModal('myModalDocument', 'modalBackgroundDocument');
    });

    // Event listener for "Cancel" button in the "Add Document" modal
    document.querySelector('#myModalDocument [type="cancel"]').addEventListener('click', function() {
        closeModal('myModalDocument', 'modalBackgroundDocument');
    });

    // Event listener for form submission in the "Add Document" modal
    document.getElementById('addDocumentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var documentName = document.getElementById('accountName').value;
        var folder = document.getElementById('folder').value;
        var notes = document.getElementById('notes').value;
        var masterPasswordReprompt = document.getElementById('masterPasswordReprompt').checked;

        // Get values for photo and file
        var photoFile = document.getElementById('photo').files[0];
        var documentFile = document.getElementById('file').files[0];

        // Add logic for saving and sending documents to the server if needed

        // Display information about uploaded files
        if (photoFile) {
            console.log('Photo File:', photoFile.name);
        }
        if (documentFile) {
            console.log('Document File:', documentFile.name);
        }

        // Close the modal after adding documents
        modal.style.display = 'none';
    });
    document.addEventListener('click', function (event) {
        var isUserIconClicked = userIcon.contains(event.target);
        var isUserMenuClicked = userMenu.contains(event.target);
    
        if (!isUserIconClicked && !isUserMenuClicked) {
            // Клік поза user-icon та user-menu, ховаємо user-menu
            userMenu.style.display = 'none';
        }
        // Event listener for clicking on the user icon to toggle user menu
    userIcon.addEventListener('click', function () {
        // Toggle the display of the user menu
        userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
    });
    });

    // Define handleContextMenuItemClick function
function handleContextMenuItemClick(action, accountBlock) {
    // Your logic for handling menu item click
    console.log('Clicked on:', action);
    console.log('Account block:', accountBlock);
}

// Function to remove document container
function removeDocumentContainer(container) {
    container.parentNode.removeChild(container);
        // Check if there are no more containers
        var containers = document.querySelectorAll('.document-container');
        if (containers.length === 0) {
            document.getElementById('Middle').style.display = 'flex';
        }
    }


// Function to show context menu
function showContextMenu(target, accountBlock) {
    var contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.innerHTML = `
        <div class="context-menu-item">Note</div>
        <div class="context-menu-item edit">Edit</div>
        <div class="context-menu-item delete">Delete</div>
    `;

    var rect = target.getBoundingClientRect();
    contextMenu.style.position = 'absolute';
    contextMenu.style.top = rect.bottom + 'px';
    contextMenu.style.left = rect.left + 'px';

    contextMenu.querySelectorAll('.context-menu-item').forEach(function (item) {
        item.addEventListener('click', function () {
            var action = item.innerText.toLowerCase();
            handleContextMenuItemClick(action, accountBlock);

            if (action === 'edit') {
                // Open the "Add Document" form here
                closeModal('myModalDocument', 'modalBackgroundDocument'); // Close any existing modal
                addDocument(); // Open the "Add Document" form
            }

            if (action === 'delete') {
                accountBlock.classList.add('fade-out');
                accountBlock.addEventListener('transitionend', function () {
                    removeDocumentContainer(accountBlock);
                });
            }

            contextMenu.style.display = 'none';
        });
    });

    document.body.appendChild(contextMenu);

    window.addEventListener('click', function (event) {
        if (!event.target.matches('.dots')) {
            contextMenu.style.display = 'none';
        }
    });
}





// Event listener for clicking on the dots icon to show the context menu
containerWrapper.addEventListener('click', function (event) {
    var dotsIcon = event.target.closest('.dots');
    if (dotsIcon) {
        var accountBlock = dotsIcon.closest('.document-container');
        showContextMenu(dotsIcon, accountBlock);
    }
});

function loadDataFromLocalStorage(key) {
    if (typeof Storage !== 'undefined') {
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } else {
        console.error('LocalStorage is not supported in this browser.');
        return null;
    }
}


// Function to save data to local storage
function saveDataToLocalStorage(key, data) {
    if (typeof Storage !== 'undefined') {
        // Load existing data from local storage
        var existingData = loadDataFromLocalStorage(key) || [];

        // Add the new data to the existing array
        existingData.push(data);

        // Save the updated array back to local storage
        localStorage.setItem(key, JSON.stringify(existingData));

        console.log('Data saved to local storage:', key, existingData);
    } else {
        console.error('LocalStorage is not supported in this browser.');
    }
}


    });