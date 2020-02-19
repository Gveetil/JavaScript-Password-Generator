// Assignment Code
var generateBtn = document.querySelector("#generate");
// Text displayed while prompting user input
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

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password != "") {
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
  }
}

// Function to generate password based on user input
// Returns - new password if successful, empty string if cancelled by user 
function generatePassword() {
  // Set the password length and chars and proceed with generation only if successful
  if (setPasswordLength() && setPasswordChars()) {
    //Generate and return password
    var newPassword = "";
    var selectedCharset = getPasswordCharset();
    var charsetLength = selectedCharset.length;
    for (let index = 0; index < pwdLengthSelected; index++) {
      var positionRandom = Math.floor(Math.random() * charsetLength);
      newPassword += selectedCharset.charAt(positionRandom);
    }
    return newPassword;
  }
  return "";
}

// This function constructs the character set used for password generation, based on user's current selection 
// Returns - character set for password generation as string
function getPasswordCharset() {
  var selectedCharset = "";
  for (var key in passwordCharset) {
    if (pwdCharTypesSelected.indexOf(key) != -1) selectedCharset += passwordCharset[key];
  };
  return selectedCharset;
}

// This function prompts user to input password length, validates the same and returns true if successful 
function setPasswordLength() {
  var isSelected = false;
  var promptText = promptPasswordLengthText;
  var promptValue = pwdLengthSelected;
  // Loop prompts user until a correct selection has been made
  while (!isSelected) {
    var usrSelection = prompt(promptText, promptValue);
    if (usrSelection == undefined) {
      // User chose to cancel - so exit loop and return false
      break;
    }
    else {
      var usrLength = parseInt(usrSelection);
      if (!isNaN(usrLength) && usrLength >= 8 && usrLength <= 128) {
        //Correct length selection - set the password length
        pwdLengthSelected = usrLength;
        isSelected = true;
      }
    }
    //For incorrect selection, update user prompt message accordingly
    if (!isSelected) {
      promptText = promptIncorrectEntry + promptPasswordLengthText;
      promptValue = usrSelection;
    }
  }
  return isSelected;
}

// This function prompts user to input password char types, validates the same and returns true if successful 
function setPasswordChars() {
  var isSelected = false;
  var promptText = promptPasswordCharsText;
  var promptValue = pwdCharTypesSelected;
  // Loop prompts user until a correct selection has been made
  while (!isSelected) {
    var usrSelection = prompt(promptText, promptValue);
    if (usrSelection == undefined) {
      // User chose to cancel - so exit loop and return false
      break;
    }
    else {
      var usrCharTypes = "";
      var arrUsrSelection = usrSelection.toLowerCase();
      // Loop through user input characters
      for (var i = 0; i < arrUsrSelection.length; i++) {
        var element = arrUsrSelection[i];
        if (passwordCharset[element] != undefined) {
          // input character is valid, so add to char types, if not repeating
          if (usrCharTypes.indexOf(element) == -1) usrCharTypes += element;
        } else if (element != " ") {
          // input character is invalid, so reset and break the for loop
          usrCharTypes = "";
          break;
        }
      }
      if (usrCharTypes.length > 0) {
        //Char types selected correctly - set the password char types
        pwdCharTypesSelected = usrCharTypes;
        isSelected = true;
      }
    }
    //For incorrect selection, update user prompt message accordingly
    if (!isSelected) {
      promptText = promptIncorrectEntry + promptPasswordCharsText;
      promptValue = usrSelection;
    }
  }
  return isSelected;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

