window.onload = function () {
    var modal = document.getElementById('myModalAccount');
    var modalBackground = document.getElementById('modalBackground');
    var addButton = document.getElementById('createNewBtn');
    var closeBtn = document.getElementsByClassName('close')[0];
    var cancelBtn = document.querySelector('#myModalAccount [type="cancel"]');
    var userIcon = document.querySelector('.user-icon');
    var userMenu = document.querySelector('.user-menu');
    var accountForm = document.querySelector('.addAccountForm');
    accountForm.addEventListener('submit', handleAddAccountSubmit);
    var containerWrapper = document.getElementById('containerWrapper');
    var middleSection = document.getElementById('Middle');
    var textContent = document.querySelector('.text-content');
    var categoriesBtn = document.getElementById('categories');
    var addFolderBtn = document.getElementById('addFolder');
    var folderModalBackground = document.getElementById('folmodalBackground'); 
    var folderModal = document.getElementById('folderModal');
    var addFolderForm = document.getElementById('addFolderForm');
    var foldersMenu = document.querySelector('.folders-menu');
    var folderCloseBtn = document.querySelector('.folclose'); 

// Clear local storage before loading existing accounts
//   localStorage.clear();
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
        foldersMenu.style.display = (foldersMenu.style.display === 'block') ? 'none' : 'block';
        foldersMenu.style.overflowY = 'auto';
        foldersMenu.style.maxHeight = '90px';
    }
    
    
    // Event listener for the "Add Folder" button
    addFolderBtn.addEventListener('click', function () {
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
    

    
    

        function addAccountBlock(accountName, folder, username, password, uri, notes) {
            var accountId = 'account_' + Math.random().toString(36).substr(2, 9);
            var existingAccountBlock = document.querySelector('.account-block[data-account-id="' + accountId + '"]');

            if (!existingAccountBlock) {
                // If it doesn't exist, add a new account block
                var containerIndex = containerWrapper.children.length + 1;

            var accountBlock = document.createElement('div');
            accountBlock.className = 'account-block';
            accountBlock.innerHTML = `
                <p class="acc">${accountName}</p>
                <div class="imgs">
                    <div class="containerrs">
                        <label for="uri${containerIndex}"></label>
                        <input type="text" id="uri${containerIndex}" value="${uri}" readonly>
                    </div>
                    <img class="star" width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/star--v1.png" class="star" alt="star--v1"/>
                    <img class="dots" width="20" height="20" src="https://img.icons8.com/material-rounded/24/menu-2.png" class="dots" alt="menu-2"/>
                </div>
                <div class="rectangle"></div>
                <div class="credentials">
                    <label for="username${containerIndex}"></label>
                    <div class="input-container">
                        <input type="text" id="username${containerIndex}" value="${username}" readonly>
                        <img class="icon copy" src="https://img.icons8.com/parakeet-line/48/copy.png" alt="copy"/>
                    </div>
                    <label for="password${containerIndex}"></label>
                    <div class="input-container">
                        <input type="password" id="password${containerIndex}" value="${password}" readonly>
                        <img class="icon copy" src="https://img.icons8.com/parakeet-line/48/copy.png" alt="copy"/>
                        <img class="icon visible" src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="visible--v1"/>
                    </div>
                </div>
                <p class="note">${notes}</p>
                <button type="open" class="btn">Open in browser</button>
            `;
        
            accountBlock.querySelectorAll('input, select').forEach(function (element) {
            var oldId = element.id;
            element.id = oldId + containerIndex;
        });

        // Set a unique identifier for the account
        accountBlock.dataset.accountId = accountId;

        containerWrapper.appendChild(accountBlock);
    }
    
     containerWrapper.addEventListener('click', function (event) {
        var copyIcon = event.target.closest('.icon.copy');
        var visibleIcon = event.target.closest('.icon.visible');
        var dotsIcon = event.target.closest('.dots');
    
        if (copyIcon) {
            var inputField = copyIcon.parentElement.querySelector('input');
            inputField.select();
            inputField.setSelectionRange(0, 99999);
            document.execCommand('copy');
        } else if (visibleIcon) {
            var passwordInput = visibleIcon.parentElement.querySelector('input[type="password"]');
            var isVisible = passwordInput.type === 'text';
            togglePasswordVisibility(passwordInput, !isVisible);
        } else if (dotsIcon) {
            showContextMenu(dotsIcon, accountBlock);
        }
    });
    middleSection.style.display = 'none';
    textContent.style.display = 'none';
    containerWrapper.style.display = 'grid';
    }



    function saveAccountToLocalStorage(accountId, accountName, folder, username, password, uri, notes) {
        if (typeof Storage !== 'undefined') {
            var existingAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
            var existingAccountIndex = existingAccounts.findIndex(a => a.accountId === accountId);
    
            if (existingAccountIndex !== -1) {
                // Update existing account
                existingAccounts[existingAccountIndex] = { accountId, accountName, folder, username, password, uri, notes };
            } else {
                // Add new account
                existingAccounts.push({ accountId, accountName, folder, username, password, uri, notes });
            }
    
            localStorage.setItem('accounts', JSON.stringify(existingAccounts));
        } else {
            console.error('LocalStorage is not supported in this browser.');
        }
    }
    
    





function togglePasswordVisibility(passwordInput, isVisible) {
    if (isVisible) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

function showContextMenu(target, accountBlock) {
    var contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.innerHTML = `
        <div class="context-menu-item">Note</div>
        <div class="context-menu-item edit">Edit</div>
        <div class="context-menu-item">Delete</div>
    `;

    var rect = target.getBoundingClientRect();
    contextMenu.style.position = 'absolute';
    contextMenu.style.top = rect.bottom + 'px';
    contextMenu.style.left = rect.left + 'px';

    contextMenu.querySelectorAll('.context-menu-item').forEach(function (item) {
        item.addEventListener('click', function () {
            handleContextMenuItemClick(item.innerText, accountBlock);
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

function handleContextMenuItemClick(itemText, accountBlock) {
    if (itemText === 'Note') {
        // Handle Note action
    } else if (itemText === 'Edit') {
        editAccount(accountBlock);
    } else if (itemText === 'Delete') {
        accountBlock.classList.add('fade-out');
        accountBlock.addEventListener('transitionend', function () {
            containerWrapper.removeChild(accountBlock);
            middleSection.style.display = 'flex';
        });
    }
}



function editAccount(accountBlock) {
    // Extract the existing account details from the account block
    var accountName = accountBlock.querySelector('.acc').textContent;
    var uri = accountBlock.querySelector('[id^="uri"]').value;
    var username = accountBlock.querySelector('[id^="username"]').value;
    var password = accountBlock.querySelector('[id^="password"]').value;
    var notes = accountBlock.querySelector('.note').textContent;

    // Populate the form with the existing details
    document.querySelector('[name="accountName"]').value = accountName;
    document.querySelector('[name="uri"]').value = uri;
    document.querySelector('[name="username"]').value = username;
    document.querySelector('[name="password"]').value = password;
    document.querySelector('[name="notes"]').value = notes;

    // Show the modal for editing the account
    var modal = document.getElementById('myModalAccount');
    var modalBackground = document.getElementById('modalBackground');
    modal.style.display = 'block';
    modalBackground.style.display = 'block';

    // Add a flag or identifier to indicate that this is an edit operation
    modal.dataset.editMode = 'true';

    // Store the account ID in the dataset
    modal.dataset.editAccountId = accountBlock.dataset.accountId;
}


function updateAccountBlock(accountId, accountName, folder, username, password, uri, notes) {
    var accountBlock = document.querySelector('[data-account-id="' + accountId + '"]');
    if (accountBlock) {
      accountBlock.querySelector('.acc').textContent = accountName;
      accountBlock.querySelector('[id^="uri"]').value = uri;
      accountBlock.querySelector('[id^="username"]').value = username;
      accountBlock.querySelector('[id^="password"]').value = password;
      accountBlock.querySelector('.note').textContent = notes;
    } else {
      console.error('Invalid account ID:', accountId);
    }
  }
  function handleAddAccountSubmit(event) {
    event.preventDefault();

    var accountName = document.querySelector('[name="accountName"]').value;
    var folder = document.querySelector('[name="folder"]').value;
    var username = document.querySelector('[name="username"]').value;
    var password = document.querySelector('[name="password"]').value;
    var uri = document.querySelector('[name="uri"]').value;
    var notes = document.querySelector('[name="notes"]').value;

    var modal = document.getElementById('myModalAccount');
    var editMode = modal.dataset.editMode === 'true';
    var editAccountId = modal.dataset.editAccountId;

    if (editMode) {
        // Update existing account and update localStorage
        updateAccountBlock(editAccountId, accountName, folder, username, password, uri, notes);
        var existingAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        var accountIndex = existingAccounts.findIndex(a => a.accountId === editAccountId);
        existingAccounts[accountIndex] = { accountId: editAccountId, accountName, folder, username, password, uri, notes };
        localStorage.setItem('accounts', JSON.stringify(existingAccounts));
    } else {
        // Create new account block and save to localStorage
        var accountId = 'account_' + Math.random().toString(36).substr(2, 9);
        addAccountBlock(accountName, folder, username, password, uri, notes, accountId);
        saveAccountToLocalStorage(accountId, accountName, folder, username, password, uri, notes);
    }

    // Reset form and close modal
    accountForm.reset();
    modal.style.display = 'none';
    modalBackground.style.display = 'none';
    modal.dataset.editMode = 'false';
}




    // Event listener for clicking on the star icon to move the container to the first place and change color
    containerWrapper.addEventListener('click', function (event) {
        var starIcon = event.target.closest('.star');

        if (starIcon) {
            var accountBlock = starIcon.closest('.account-block');
            starIcon.classList.toggle('star-clicked');
            containerWrapper.prepend(accountBlock);
        }
    });
          // Load existing accounts from localStorage when the page loads
          loadAccountsFromLocalStorage();

          function loadAccountsFromLocalStorage() {
            if (typeof Storage !== 'undefined') {
                var existingAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        
                // Clear existing content to avoid duplications
                containerWrapper.innerHTML = '';
        
                // Use a Set to track unique account IDs
                var uniqueAccountIds = new Set();
        
                existingAccounts.forEach(function (account) {
                    // Check if the account ID is already processed
                    if (!uniqueAccountIds.has(account.accountId)) {
                        // If not, add a new account block
                        addAccountBlock(account.accountName, account.folder, account.username, account.password, account.uri, account.notes);
        
                        // Mark the account ID as processed
                        uniqueAccountIds.add(account.accountId);
                    }
                });
            } else {
                console.error('LocalStorage is not supported in this browser.');
            }
        }
        
        
        
};
