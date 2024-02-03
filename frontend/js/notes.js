document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('myModalNotes');
    var modalBackground = document.getElementById('modalBackgroundNote');
    var addButton = document.getElementById('createNewBtn');
    var closeBtn = document.querySelector('#myModalNotes .close');
    var cancelBtn = document.querySelector('#myModalNotes [type="cancel"]');
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

// Clear local storage before loading existing accounts
// localStorage.clear();
  
     loadNotesFromLocalStorage();
    // Event listener for clicking outside the user menu to close it
    document.addEventListener('click', function (event) {
        if (!userIcon.contains(event.target) && !userMenu.contains(event.target)) {
            // Clicked outside the user icon and user menu, so close the user menu
            userMenu.style.display = 'none';
        }
    });


    // Event listener for the "Add Note" button
    document.getElementById('createNewBtn').addEventListener('click', addNote);

    // Event listener for form submission in the "Add Note" modal
    document.getElementById('addNoteForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addNoteFromForm();
    });

    function addNote() {
        // Show the modal for adding a note
        modal.style.display = 'block';
        modalBackground.style.display = 'block';

        // Add logic for adding a note here (if needed)
    }

    function addNoteFromForm() {
        // Get values from the form
        var noteName = document.getElementById('accountName').value;
        var folder = document.getElementById('folder').value;
        var noteContent = document.getElementById('notes').value;

        // Create a new note data object
        var noteId = 'document_' + Math.random().toString(36).substr(2, 9);
        var noteData = {
            name: noteName,
            folder: folder,
            content: noteContent,
        };

        // Add the note container to the UI
        addNoteContainer(containerWrapper, noteData);

        saveNoteToLocalStorage(noteData);

        // Close the modal after adding the note
        closeModal('myModalNotes', 'modalBackgroundNote');

        // Optionally, reset the form for the next entry
        document.getElementById('addNoteForm').reset();
    }

    function addNoteContainer(containerWrapper, noteData) {
        var containerIndex = containerWrapper.children.length + 1;
    
        var noteContainer = document.createElement('div');
        noteContainer.className = 'note-container';
        noteContainer.innerHTML = `
            <div class="containerrs">
                <label for="accountName${containerIndex}"></label>
                <input type="text" id="accountName${containerIndex}" value="${noteData.name}" readonly>
            </div>
            <div class="imgs">
                <img class="star" width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/star--v1.png" class="star" alt="star--v1"/>
                <img class="dots" width="20" height="20" src="https://img.icons8.com/material-rounded/24/menu-2.png" class="dots" alt="menu-2"/>
            </div>
            <div class="rectangle"></div>
            <div class="note-content">
                <textarea id="noteContent${containerIndex}" rows="4" cols="50" readonly>${noteData.content}</textarea>
            </div>
        `;
    
        containerWrapper.appendChild(noteContainer);
    
        document.getElementById('Middle').style.display = 'none';
    
        var dotsIcon = noteContainer.querySelector('.dots');
    
        dotsIcon.addEventListener('click', function (event) {
            var noteBlock = dotsIcon.closest('.note-container');
    
            // Remove any existing context menu
            var existingContextMenu = noteBlock.querySelector('.context-menu');
            if (existingContextMenu) {
                existingContextMenu.remove();
            }
    
            // Show the new context menu
            showContextMenu(dotsIcon, noteBlock);
    
            event.stopPropagation(); // Prevent the click event from propagating to the containerWrapper
        });
    }
    
    
    function showContextMenu(target, noteContainer) {
        var contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <div class="context-menu-item copy">Copy</div>
            <div class="context-menu-item edit">Edit</div>
            <div class="context-menu-item">Delete</div>
        `;
    
        var rect = target.getBoundingClientRect();
        contextMenu.style.position = 'absolute';
        contextMenu.style.top = rect.bottom + 'px';
        contextMenu.style.left = rect.left + 'px';
    
        contextMenu.querySelectorAll('.context-menu-item').forEach(function (item) {
            item.addEventListener('click', function () {
                handleContextMenuItemClick(item.innerText, noteContainer);
                contextMenu.style.display = 'none';
            });
        });
    
        document.body.appendChild(contextMenu);
    
        window.addEventListener('click', function (event) {
            if (!event.target.matches('.dots')) {
                contextMenu.style.display = 'none';
            }
        });
    
        // Додайте обробник події для "Copy" в контекстному меню
        var copyMenuItem = contextMenu.querySelector('.copy');
        copyMenuItem.addEventListener('click', function () {
            copyNoteContent(noteContainer);
            contextMenu.style.display = 'none';
        });
    }
    
    // Функція для копіювання тексту з textarea
    function copyNoteContent(noteContainer) {
        var textareaId = noteContainer.querySelector('textarea').id;
        var textarea = document.getElementById(textareaId);
        
        // Використовуйте document.execCommand для копіювання тексту в буфер обміну
        textarea.select();
        document.execCommand('copy');
        
        // Зняття виділення тексту після копіювання
        window.getSelection().removeAllRanges();
    }
    

    function handleContextMenuItemClick(itemText, noteContainer) {
        if (itemText === 'Note') {
            // Handle Note action
        } else if (itemText === 'Edit') {
            openEditForm(noteContainer); 
        } else if (itemText === 'Delete') {
            noteContainer.classList.add('fade-out');
            noteContainer.addEventListener('transitionend', function () {
                containerWrapper.removeChild(noteContainer);
                document.getElementById('Middle').style.display = 'flex';
            });
        }

       // Function to handle the form submission in edit mode
function handleEditFormSubmit(event, noteContainer, noteName, folder, noteContent) {
    event.preventDefault();
    // Update the values in the existing note container
    updateNoteContainer(noteContainer, noteName, folder, noteContent);
    // Close the modal after editing the note
    closeModal('myModalNotes', 'modalBackgroundNote');
}

function openEditForm(noteContainer) {
    // Get values from the noteContainer
    var noteName = noteContainer.querySelector('.containerrs input[type="text"]').value;
    var folder = noteContainer.querySelector('.containerrs label').textContent;
    var noteContent = noteContainer.querySelector('.note-content textarea').value;

    // Fill the edit form with the retrieved values
    document.getElementById('accountName').value = noteName;
    document.getElementById('folder').value = folder;
    document.getElementById('notes').value = noteContent;

    // Show the edit form
    modal.style.display = 'block';
    modalBackground.style.display = 'block';

    // Remove previous event listener for form submission
    document.getElementById('addNoteForm').removeEventListener('submit', addNoteFromForm);

    // Add a new event listener to the edit form for submission
    document.getElementById('addNoteForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // Update the values in the existing note container
        updateNoteContainer(noteContainer, noteName, folder, noteContent);
        // Close the modal after editing the note
        closeModal('myModalNotes', 'modalBackgroundNote');
    });
}


// Function to update the values in an existing note container
function updateNoteContainer(noteContainer, noteName, folder, noteContent) {
    noteContainer.querySelector('.containerrs label').textContent = folder;
    noteContainer.querySelector('input[type="text"]').value = noteName;
    noteContainer.querySelector('.note-content textarea').value = noteContent;
}
   
    
    
        // Додайте обробник події для "Edit" в контекстному меню
        var editMenuItem = contextMenu.querySelector('.edit');
        editMenuItem.addEventListener('click', function () {
            openEditForm(noteContainer);
            contextMenu.style.display = 'none';
        });
    }
    


    // Function to close modal
    function closeModal(modalId, backgroundId) {
        var modal = document.getElementById(modalId);
        var background = document.getElementById(backgroundId);

        // Close the modal
        modal.style.display = 'none';
        background.style.display = 'none';
    }


    // Event listener for closing the "Add Note" modal
    document.querySelector('.close').addEventListener('click', function () {
        closeModal('myModalNotes', 'modalBackgroundNote');
    });

    // Event listener for "Cancel" button in the "Add Note" modal
    document.querySelector('[type="cancel"]').addEventListener('click', function () {
        closeModal('myModalNotes', 'modalBackgroundNote');
    });

    // Event listener for form submission in the "Add Note" modal
    document.getElementById('addNoteForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // Add your logic for saving and sending notes to the server if needed

        // Close the modal after adding notes
        modal.style.display = 'none';
    });

    // Event listener for clicking on the categories button to toggle folders menu
    categoriesBtn.addEventListener('click', function () {
        // Toggle the display of the folders menu
        foldersMenu.style.display = (foldersMenu.style.display === 'block') ? 'none' : 'block';
    });

    // Event listener for clicking on the "Add Folder" button
    addFolderBtn.addEventListener('click', function () {
        // Show the folder modal
        folderModal.style.display = 'block';
        folderModalBackground.style.display = 'block';
    });

    // Event listener for clicking outside the folders menu to close it
    document.addEventListener('click', function (event) {
        if (!categoriesBtn.contains(event.target) && !foldersMenu.contains(event.target)) {
            // Clicked outside the categories button and folders menu, so close the folders menu
            foldersMenu.style.display = 'none';
        }
    });

    // Event listener for closing the folder modal
    folderCloseBtn.addEventListener('click', function () {
        folderModal.style.display = 'none';
        folderModalBackground.style.display = 'none';
    });


 // Event listener for the form submission
 addFolderForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Create the folder and update the display
    createFolder();
    // Close the modal window
    folderModalBackground.style.display = 'none';
    folderModal.style.display = 'none';
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
    
    function saveNoteToLocalStorage(noteData) {
        if (typeof Storage !== 'undefined') {
            var existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
            existingNotes.push(noteData);
            localStorage.setItem('notes', JSON.stringify(existingNotes));
        } else {
            console.error('LocalStorage is not supported in this browser.');
        }
    }

    function loadNotesFromLocalStorage() {
        if (typeof Storage !== 'undefined') {
            var existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
            existingNotes.forEach(function (noteData) {
                addNoteContainer(containerWrapper, noteData);
            });
        } else {
            console.error('LocalStorage is not supported in this browser.');
        }
    }


});
