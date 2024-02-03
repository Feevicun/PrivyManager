document.addEventListener('DOMContentLoaded', function () {
    var userIcon = document.querySelector('.user-icon');
    var userMenu = document.querySelector('.user-menu');

    function toggleForm(type) {
        var passForm = document.getElementById('pass-form');
        var passphraseForm = document.getElementById('passphrase-form');
        var usernameForm = document.getElementById('username-form');
        var emAddress = document.getElementById('em-address');
        var domName = document.getElementById('dom-name');
        var usernameOptions = document.getElementById('usernameOptions');
        var passwordOptions = document.getElementById('password-options');

        passForm.style.display = 'none';
        passphraseForm.style.display = 'none';
        usernameForm.style.display = 'none';
        emAddress.style.display = 'none';
        domName.style.display = 'none';
        usernameOptions.style.display = 'none';

        if (type === 'password') {
            passForm.style.display = 'block';
        } else if (type === 'passphrase') {
            passphraseForm.style.display = 'block';
        } else if (type === 'username') {
            usernameForm.style.display = 'block';
        }
    }


    document.getElementById('password').onclick = function () {
        toggleForm('password');
    };
    document.getElementById('type-pwd').onclick = function () {
        toggleForm('password');
    };
    document.getElementById('passphrase').onclick = function () {
        toggleForm('passphrase');
    };
    document.getElementById('username').onclick = function () {
        toggleForm('username');
    };

    var emailRadio = document.getElementById('email');
    var catchAllRadio = document.getElementById('catch-all');
    var randomRadio = document.getElementById('random');
    var emAddress = document.getElementById('em-address');
    var domName = document.getElementById('dom-name');
    var usernameOptions = document.getElementById('usernameOptions');
    var passwordOptions = document.getElementById('password-options');

    emailRadio.addEventListener('change', function () {
        emAddress.style.display = emailRadio.checked ? 'block' : 'none';
        domName.style.display = 'none';
        usernameOptions.style.display = 'none';
        passwordOptions.style.display = 'block';
    });

    catchAllRadio.addEventListener('change', function () {
        emAddress.style.display = 'none';
        domName.style.display = catchAllRadio.checked ? 'block' : 'none';
        usernameOptions.style.display = 'none';
        passwordOptions.style.display = 'block';
    });

    randomRadio.addEventListener('change', function () {
        emAddress.style.display = 'none';
        domName.style.display = 'none';
        usernameOptions.style.display = randomRadio.checked ? 'block' : 'none';

        // Updated code for passphrase options
        if (randomRadio.checked) {
            document.getElementById('passphrase-options').style.display = 'block';
        } else {
            document.getElementById('passphrase-options').style.display = 'none';
        }

    });

    document.getElementById('regenerate-username').addEventListener('click', function () {
        // Call a function to generate the username based on user preferences
        var username = generateUsername();
        // Update the generated username in the form or perform any other actions
        document.getElementById('password-container').textContent = username;
    });
    

// Function to generate usernames based on user preferences
function generateUsername() {
    var username = '';

    // Check the selected position
    if (emailRadio.checked) {
        // Plus addressed email
        var address = document.getElementById('address').value;
        username = address + '+' + generateRandomString(5) + '@example.com';
    } else if (catchAllRadio.checked) {
        // Catch-all email
        var domain = document.getElementById('domain').value;
        username = generateRandomString(10) + '@' + domain;
    } else if (randomRadio.checked) {
        fetchRandomWordWordnik(wordnikApiKey, function (randomWord) {
            // Process the word based on user preferences
            var capitalize = document.getElementById('capitalise').checked;
            var includeNumbers = document.getElementById('inc-num').checked;
        
            // Capitalize only if the word is not already capitalized
            if (capitalize && !isAlreadyCapitalized(randomWord)) {
                randomWord = randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
            }
        
            if (includeNumbers) {
                randomWord += generateRandomString(2); // Add a random 2-digit number
            }
        
            // Update the generated username in the form or perform any other actions
            document.getElementById('password-container').textContent = randomWord;
        });
        
        function isAlreadyCapitalized(word) {
            // Check if the first letter is already capitalized
            return word.charAt(0).toUpperCase() === word.charAt(0);
        }
        

    return username;
}
}



var wordnikApiKey = 'qxyws0ktnft3t893ggw6cy53ud9iagd56y63qdrh1zs6ankd0';
// Function to fetch random word from Wordnik API
function fetchRandomWordWordnik(apiKey, callback) {

    var apiUrl = 'https://api.wordnik.com/v4/words.json/randomWords?' +
    'minLength=5&maxLength=10&limit=10&api_key=' + apiKey;

    axios.get(apiUrl)
        .then(function (response) {
            var randomWord = response.data[0].word; // Access the first word in the array
            callback(randomWord);
        })
        .catch(function (error) {
            console.error('Error fetching random word:', error);
        });
}



    // Function to generate a random string of a specified length
    function generateRandomString(length) {
        var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var randomString = '';
        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset.charAt(randomIndex);
        }
        return randomString;
    }


    document.addEventListener('click', function (event) {
        var isUserIconClicked = userIcon.contains(event.target);
        var isUserMenuClicked = userMenu.contains(event.target);

        if (!isUserIconClicked && !isUserMenuClicked) {
            userMenu.style.display = 'none';
        }
    });

    // Event listener for clicking on the user icon to toggle user menu
    userIcon.addEventListener('click', function () {
        // Toggle the display of the user menu
        userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var passwordContainer = document.getElementById('password-container');
    var passwordOptionsForm = document.getElementById('pass-form');
    var lengthInput = document.getElementById('length');
    var includeUpperCaseCheckbox = document.getElementById('large');
    var includeLowerCaseCheckbox = document.getElementById('small');
    var includeNumbersCheckbox = document.getElementById('num');
    var includeSpecialCharsCheckbox = document.getElementById('special');
    var avoidAmbiguousCharsCheckbox = document.getElementById('characters');
    var regenerateButton = document.getElementById('regenerate');
    var copyButton = document.getElementById('copy');

    regenerateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyToClipboard);

    function generatePassword() {
        var length = parseInt(lengthInput.value);
        var includeUpperCase = includeUpperCaseCheckbox.checked;
        var includeLowerCase = includeLowerCaseCheckbox.checked;
        var includeNumbers = includeNumbersCheckbox.checked;
        var includeSpecialChars = includeSpecialCharsCheckbox.checked;
        var avoidAmbiguousChars = avoidAmbiguousCharsCheckbox.checked;

        var characterSet = '';
        var password = '';

        if (includeUpperCase) {
            characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }

        if (includeLowerCase) {
            characterSet += 'abcdefghijklmnopqrstuvwxyz';
        }

        if (includeNumbers) {
            characterSet += '0123456789';
        }

        if (includeSpecialChars) {
            characterSet += '!@#$%^&*';
        }

        // Exclude ambiguous characters if selected
        if (avoidAmbiguousChars) {
            characterSet = characterSet.replace(/[Il1O0]/g, '');
        }

        if (characterSet.length === 0) {
            alert('Please select at least one character set.');
            return;
        }

        // Ensure the password meets the minimum number of digits requirement
        var minNumDigits = parseInt(document.getElementById('min-num').value);
        var numDigits = 0;

        // Generate password using CSPRNG
        var passwordArray = new Uint32Array(length);
        crypto.getRandomValues(passwordArray);

        for (var i = 0; i < length; i++) {
            // Get a random character from the character set
            var randomIndex = passwordArray[i] % characterSet.length;
            var randomChar = characterSet.charAt(randomIndex);

            // Check if the character is a digit
            if (includeNumbers && randomChar.match(/\d/)) {
                numDigits++;
            }

            // Append the character to the password
            password += randomChar;
        }

        // If the password does not contain the required number of digits, regenerate
        while (numDigits < minNumDigits) {
            // Reset the counters
            numDigits = 0;
            password = '';

            // Generate password using CSPRNG
            passwordArray = new Uint32Array(length);
            crypto.getRandomValues(passwordArray);

            for (var j = 0; j < length; j++) {
                var newIndex = passwordArray[j] % characterSet.length;
                var newChar = characterSet.charAt(newIndex);

                if (includeNumbers && newChar.match(/\d/)) {
                    numDigits++;
                }

                password += newChar;
            }
        }

        // Display the generated password in the 'header-rectangle' div
        passwordContainer.textContent = password;
    }

    function copyToClipboard() {
        var passwordText = passwordContainer.textContent;
        if (passwordText) {
            navigator.clipboard.writeText(passwordText).then(function () {
                alert('Password copied to clipboard!');
            }).catch(function (err) {
                console.error('Unable to copy to clipboard', err);
            });
        }
    }
});



document.addEventListener('DOMContentLoaded', function () {
    var wordnikApiKey = 'qxyws0ktnft3t893ggw6cy53ud9iagd56y63qdrh1zs6ankd0';

    // Function to fetch random words using Wordnik API
    function fetchWords(apiKey, callback) {
        var apiUrl = 'https://api.wordnik.com/v4/words.json/randomWords?' +
            'minLength=5&maxLength=10&limit=10&api_key=' + apiKey;

        axios.get(apiUrl)
            .then(function (response) {
                var words = response.data.map(function (wordObject) {
                    return wordObject.word;
                });
                callback(words);
            })
            .catch(function (error) {
                console.error('Error fetching words:', error);
            });
    }

    // Your passphrase generation logic
    function generatePassphrase(words, numWords, separator, capitalize, includeNumbers) {
        // Ensure that there are enough words available
        if (numWords > words.length) {
            console.error('Not enough words available.');
            return '';
        }

        // Randomly select words from the fetched list based on the user's preference
        var selectedWords = [];
        while (selectedWords.length < numWords) {
            var randomWord = words[Math.floor(Math.random() * words.length)];

            // Avoid duplicates
            if (!selectedWords.includes(randomWord)) {
                selectedWords.push(randomWord);
            }
        }

        // Customize the options based on user preferences
        if (capitalize) {
            selectedWords = selectedWords.map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            });
        }

        // Add a random number (one or two digits) to the passphrase if the user selected the option
        if (includeNumbers) {
            var randomNumber = Math.floor(Math.random() * 100);
            selectedWords.push(randomNumber);
        }

        // Join the selected words using the separator to form the passphrase
        return selectedWords.join(separator);
    }

    // Call fetchWords with the Wordnik API key
    fetchWords(wordnikApiKey, function (words) {
        // Display the fetched words for testing
        console.log('Fetched Words:', words);

        // Event listener for the "Regenerate passphrase" button
        document.getElementById('regeneratepas').addEventListener('click', function () {
            // Get user preferences
            var numWords = parseInt(document.getElementById('num-words-fields').value);
            var separator = document.getElementById('word-separator-fields').value;
            var capitalize = document.getElementById('capitalise').checked;
            var includeNumbers = document.getElementById('inc-num').checked;

            // Generate the passphrase based on user preferences
            var passphrase = generatePassphrase(words, numWords, separator, capitalize, includeNumbers);

            // Update the passphrase in the form or perform any other actions
            document.getElementById('password-container').textContent = passphrase;
        });

        // Your existing code for copy and history button event listeners...

    });
});
