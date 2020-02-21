// Password Generator Form Elements referenced by this code
var generateBtn = document.querySelector("#generate");
var passwordTextEl = document.querySelector("#password");

// Text displayed while prompting user for input
const promptPasswordLengthText = "Please enter the length of your password.\nThe Password must be 8 - 128 characters long."
const promptPasswordCharsText = "Please select the character types to include in your password. \n l - lowercase, u - uppercase, n - numeric, s - special characters"
const promptIncorrectEntry = "Incorrect selection !!\n"

// Character set to be used while generating the password - l - lowercase, u - uppercase, n - numeric, s - special characters
var passwordCharset = {
  "l": "abcdefghijklmnopqrstuvwxyz",
  "u": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "n": "0123456789",
  "s": "!#$%&()*+-/:;<=>?@[\\]^_{|}~"
};

// Current / default password length and character types selection 
var pwdLengthSelected = 8;
var pwdCharTypesSelected = "luns";

// Generate and display password in the password text area element
function writePassword() {
  // Set the password length 
  if (getUserInput(promptPasswordLengthText, pwdLengthSelected, updatePasswordLength)) {
    // Set the password char types
    if (getUserInput(promptPasswordCharsText, pwdCharTypesSelected, updatePasswordChars)) {
      // Generate and display password 
      passwordTextEl.value = generatePassword();
    }
  }
}

// Generate and return password based on user's current selection
// Returns - new password as string
function generatePassword() {
  var newPassword = "";
  var charTypeIndex = 0;
  var charType;
  // Loop until desired password length is achieved 
  for (var index = 0; index < pwdLengthSelected; index++) {
    // get char type from user selection
    charType = pwdCharTypesSelected[charTypeIndex];
    // fetch a random character of this type and add to the password 
    newPassword += fetchRandomCharacter(passwordCharset[charType]);
    // move to next char type, starting over when the list is complete
    if (charTypeIndex < pwdCharTypesSelected.length - 1)
      charTypeIndex++;
    else
      charTypeIndex = 0;
  }
  return newPassword;
}

// Picks a random character from the string provided 
// Parameter - selectionString - string containing character set to select from
// Returns - selected character 
function fetchRandomCharacter(selectionString) {
  var positionRandom = Math.floor(Math.random() * selectionString.length);
  return selectionString.charAt(positionRandom);
}

// This function prompts user to input a value, validates and saves the selection
// Parameters - promptText - the text to be displayed when prompting the user to enter a value
//              promptValue - the default value to be displayed when prompting the user 
//              updateValueHandler - function that will validate and save the user entry
// Returns - true if successful, false if operation cancelled by user
function getUserInput(promptText, promptValue, updateValueHandler) {
  var isSelected = false;
  var currentPromptText = promptText;
  var currentPromptValue = promptValue;
  // Loop prompts the user for input until a correct selection has been made
  while (!isSelected) {
    var usrSelection = prompt(currentPromptText, currentPromptValue);
    if (usrSelection == undefined) {
      // User chose to cancel - so exit loop and return false
      break;
    }
    else {
      // Update user selection 
      isSelected = updateValueHandler(usrSelection);
    }
    //For incorrect selection, update user prompt message accordingly
    if (!isSelected) {
      currentPromptText = promptIncorrectEntry + promptText;
      currentPromptValue = usrSelection;
    }
  }
  return isSelected;
}

// Validate and save the length entered by the user 
// Parameter - usrSelection - the length entered by the user as string
// Returns - true if successful, false if the length is incorrect 
function updatePasswordLength(usrSelection) {
  var usrLength = parseInt(usrSelection);
  if (!isNaN(usrLength) && usrLength >= 8 && usrLength <= 128) {
    //Correct length selection - set the password length
    pwdLengthSelected = usrLength;
    return true;
  }
  return false;
}

// Validate and save the char types selected by the user 
// Parameter - usrSelection - the char types selected by the user as string
// Returns - true if successful, false if the selection is incorrect 
function updatePasswordChars(usrSelection) {
  var usrCharTypes = "";
  var arrUsrSelection = usrSelection.toLowerCase();
  // Loop through user input characters
  for (var i = 0; i < arrUsrSelection.length; i++) {
    var element = arrUsrSelection[i];
    if (passwordCharset[element] != undefined) {
      // input character is valid, so add to char types, if not already included
      if (usrCharTypes.indexOf(element) == -1) usrCharTypes += element;
    } else if (element != " ") {
      // input character is invalid, so reset char type array and break the for loop
      usrCharTypes = "";
      break;
    }
  }
  // Check if at least one Char type is selected and set the password char types  
  if (usrCharTypes.length > 0) {
    pwdCharTypesSelected = usrCharTypes;
    return true;
  }
  return false;
}

// Add event listener to generate button to output the password
generateBtn.addEventListener("click", writePassword);

