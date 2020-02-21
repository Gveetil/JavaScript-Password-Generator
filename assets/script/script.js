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
  "s": "!”#$%&’()*+,-./:;<=>?@[\\]^_`{|}~"
};

// Current / default password length and character types selection 
var pwdLengthSelected = 8;
var pwdCharTypesSelected = "luns";

// Generate and display password in the password text area element
function writePassword() {
  var password = generatePassword();
  // If the password was generated successfully, display it 
  if (password != "") {
    passwordTextEl.value = password;
  }
}

// Function to generate password based on user input
// Returns - new password if successful, empty string if cancelled by user 
function generatePassword() {
  // Set the password length - exit if not successful
  if (getUserInput(promptPasswordLengthText, pwdLengthSelected, updatePasswordLength) == false) return "";
  // Set the password char types - exit if not successful
  if (getUserInput(promptPasswordCharsText, pwdCharTypesSelected, updatePasswordChars) == false) return "";
  //Generate and return password
  var newPassword = "";
  var selectedCharset = getSelectedPasswordCharset();
  var charsetLength = selectedCharset.length;
  for (let index = 0; index < pwdLengthSelected; index++) {
    var positionRandom = Math.floor(Math.random() * charsetLength);
    newPassword += selectedCharset.charAt(positionRandom);
  }
  return newPassword;
}

// This function constructs the character set used for password generation, based on user's current selection 
// Returns - character set for password generation as string
function getSelectedPasswordCharset() {
  var selectedCharset = "";
  for (var key in passwordCharset) {
    if (pwdCharTypesSelected.indexOf(key) != -1) selectedCharset += passwordCharset[key];
  };
  return selectedCharset;
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
  // This Loop prompts the user for input until a correct selection has been made
  while (!isSelected) {
    var usrSelection = prompt(currentPromptText, currentPromptValue);
    if (usrSelection == undefined) {
      // User chose to cancel - so exit loop and return false
      break;
    }
    else {
      // Update the user selection 
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

// Validates and saves the length entered by the user 
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

// Validates and saves the char types selected by the user 
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
  // Check if Char types selected correctly and set the password char types selection 
  if (usrCharTypes.length > 0) {
    pwdCharTypesSelected = usrCharTypes;
    return true;
  }
  return false;
}

// Add event listener to generate button to output the password
generateBtn.addEventListener("click", writePassword);

