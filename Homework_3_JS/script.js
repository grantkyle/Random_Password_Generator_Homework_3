// Assignment Code
// Questions for the TA and/ or tutor: 
// 1) What is the best place to start in this process? My brain wanted to start at the promptPassword function and work down
// while slowly building out the global variables as we moved down the line
// 2) Does the fact that variables share a keyword with another variable effect their relationship? 
// Example: the word "Array" specialCharactersArray, numbersArray, lowerCaseCharactersArray, upperCaseCharactersArray
// 3) How is the event listener in line 25 connected to the promptPassword? I understand that adding "click" makes buttons clickable,
// but what connects this event listener to the "generate button"


var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copyToClipboard")
var upperCaseCharactersArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
var lowerCaseCharactersArray = 'abcdefghijklmnopqrstuvwxyz'.split('')
var numbersArray = '0123456789'.split('')
var specialCharactersArray = '!$%^@'.split('')
var passwordLength = 0
var specialCharactersPref;
var numbersPref;
var upperCasePref;
var lowerCasePref;

// This is where it alllll starts - in addition to being the beginning of the process, 
// it's helpful to start building from here. 
// When generate button is pressed, I want the prompt to show up to ask user how many characters they want//

// Add event listener to generate button
document.addEventListener("click", function (event) {

    promptPassword()
})

// Password prompt begins, starting with the function to validate the length.

function promptPassword() {
    var passwordPrompt = prompt("What is your password length?");

    validateLength(passwordPrompt)
}

function validateLength(password) {
    if (password > 7 && password < 128) {
        passwordLength = password
        promptSpecialCharacters()
    }
    else {
        alert('CHOOSE A NEW PASSWORD LENGTH FOOH')
    }
}

//Provided the length is valid, the function is promptSpecialCharacters is called below
function promptSpecialCharacters() {
    specialCharactersPref = confirm("Click OK to confirm including special characters?");
    console.log("confirm ", specialCharactersPref)

    // promptLowerCase is called below
    promptLowerCase()
}

// The same process as above works below too
function promptLowerCase() {

    lowerCasePref = confirm("Click OK to confirm including lower case letters?");

    // The line below calls the number prompt
    promptNumbers()
}

// The same process works below
function promptNumbers() {
    numbersPref = confirm("Click OK to confirm including numbers?");
    // The line below calls the upper case prompt
    promptUpperCase()
}

// The same process works below
function promptUpperCase() {
    upperCasePref = confirm("Click OK to confirm including upper case letters?");

    // The code below makes the generator do its thing
    outputPassword()
}


function replaceCharacters(tempAllCharacters, tmpArray) {

    //tmpArray is passed from specialcharactersArray, lowercaseArray, uppercaseArray
    // or numberArray

    //tempAllCharacter is passed tempAllCharacters that have everything
    for (let i = 0; i < tmpArray.length; i++) {

        // indexof checks if a character exists in the tempAllCharacter
        // from specialcharacters Array, lowercaseArray, uppercaseArray
        // or numberArray according to the confirm that was pressed.

        //if character, the value of index is greater than -1.
        let index = tempAllCharacters.indexOf(tmpArray[i]);
        console.log(tmpArray[i])
        if (index > -1) {
            //find the index of the character and deletes it
            tempAllCharacters.splice(index, 1);
        }
    }

    // It returns the results of the tempAllCharacter after the delele 
    //from specialcharacters Array, lowercaseArray, uppercaseArray
    // or numberArray accoding to the confirm cancel that was pressed.
    return tempAllCharacters
}

function generateRandomPassword(passwordLength) {
    var result = ''


    var tempAllCharacters = [...upperCaseCharactersArray, ...numbersArray, ...lowerCaseCharactersArray, ...specialCharactersArray]

    console.log("tempAllCharacters Array with everything:", tempAllCharacters)

    //confirm is cancel, it equals false for special characters 
    if (specialCharactersPref === false) {

        //calls the replace function to exclude all special characters
        tempAllCharacters = replaceCharacters(tempAllCharacters, specialCharactersArray)

    }
    //var num=5 assignment
    //"5"== 5 true, it only cares about the value not datatype
    //"5"=== 5 false, cares about value and datatype

    //confirm is cancel, it equals false for lower characters 
    if (lowerCasePref === false) {
        //calls the replace function to exclude all lower cases
        tempAllCharacters = replaceCharacters(tempAllCharacters, lowerCaseCharactersArray)

    }

    //confirm is cancel, it equals false for upper characters 
    if (upperCasePref === false) {
        //calls the replace function to exclude all uppper cases
        tempAllCharacters = replaceCharacters(tempAllCharacters, upperCaseCharactersArray)

    }

    //confirm is cancel, it equals false for numbers 
    if (numbersPref === false) {
        //calls the replace function to exclude all numbers
        tempAllCharacters = replaceCharacters(tempAllCharacters, numbersArray)

    }
    if (numbersPref === false && upperCasePref === false &&
        specialCharactersPref === false && lowerCasePref === false) {
        tempAllCharacters = []
    }
    console.log("updated tempAllCharacters Array:", tempAllCharacters)

    for (var i = 0; i < passwordLength; i++) {
        //no need to convert it to string, allCharacters is an array already
        // var allCharsString = allCharacters.join('')
        if (tempAllCharacters[Math.floor(Math.random() * tempAllCharacters.length)] != undefined) {
            result += tempAllCharacters[Math.floor(Math.random() * tempAllCharacters.length)];

            console.log("results:", result)
        }

    }

    return result
}

// This function is returning and rendering the process to the front end by writing the password to the #password input
function outputPassword() {
    var password = generateRandomPassword(passwordLength);
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

    // copyBtn.removeAttribute("disabled");
    // copyBtn.focus();
}


function copyToClipboard() {

    //* Get the text field */
    var copyText = document.getElementById("password");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    console.log("Copied the text: " + copyText.value);

    // BONUS 
}

document.querySelector("#copy").addEventListener("click", function (events) {
    copyToClipboard()
})


// BONUS EVENT LISTENER