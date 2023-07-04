// Function to generate all combinations of passwords up to a maximum length
function generateCombinations(characters, maxLength) {
    const combinations = [];

    function combine(current, remaining, length) {
        if (length === 0) {
            combinations.push(current);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            combine(current + remaining[i], remaining.slice(i), length - 1);
        }
    }

    for (let length = 1; length <= maxLength; length++) {
        combine('', characters, length);
    }

    return combinations;
}

// Function to generate all fixed-length passwords
function generateFixedLengthPasswords(characters, length) {
    const passwords = [];

    function generate(current, remaining, length) {
        if (length === 0) {
            passwords.push(current);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            generate(current + remaining[i], remaining, length - 1);
        }
    }

    generate('', characters, length);

    return passwords;
}

// Function to download the passwords as a text file
function downloadPasswords(passwords, filename) {
    const textFile = new Blob([passwords.join('\n')], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(textFile);
    downloadLink.download = filename;
    downloadLink.click();
}

// Event listener for the combinations button
document.getElementById('combinations-button').addEventListener('click', () => {
    const charactersInput = document.getElementById('characters-input');
    const lengthInput = document.getElementById('length-input');
    const characters = charactersInput.value;
    const maxLength = parseInt(lengthInput.value);

    if (!characters || !maxLength) {
        alert('Please enter characters and maximum length.');
        return;
    }

    const combinations = generateCombinations(characters, maxLength);
    downloadPasswords(combinations, 'combinations.txt');
});

// Event listener for the fixed-length button
document.getElementById('fixed-length-button').addEventListener('click', () => {
    const charactersInput = document.getElementById('characters-input');
    const lengthInput = document.getElementById('length-input');
    const characters = charactersInput.value;
    const length = parseInt(lengthInput.value);

    if (!characters || !length) {
        alert('Please enter characters and length.');
        return;
    }

    const passwords = generateFixedLengthPasswords(characters, length);
    downloadPasswords(passwords, 'fixed_length_passwords.txt');
});
