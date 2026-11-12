const form = document.getElementById('comment-form');
const nameField = form.elements.name;
const emailField = form.elements.email;
const commentsField = form.elements.comments;
const errorMessage = form.querySelector('error-message');
const charCount = form.querySelector('char-count');
const fieldNames = {
    name: 'Name',
    email: 'Email',
    comments: 'Comments'
}
const countWarningThreshold = 100;

function updateInvalid(input) {
    const validityState = input.validity;
    if (validityState.valueMissing)
    {
        input.setCustomValidity('This field is required!');
    }
    else if (validityState.tooShort) {
        input.setCustomValidity('Below the minimum character count!');
    }
    else if (validityState.typeMismatch && input.id == 'email') {
        input.setCustomValidity('Incorrect email format!');
    }
    else {
        input.setCustomValidity('');
    }

    updateErrorMessage()
}

function updateValid(input) {
    const validityState = input.validity;
    if (!(validityState.valueMissing || validityState.tooShort || validityState.typeMismatch)) {
        input.setCustomValidity('');
    }

    updateErrorMessage()
}

function updateErrorMessage() {
    const firstInvalid = form.querySelector('fieldset').querySelector(':user-invalid');
    if (firstInvalid) {
        errorMessage.textContent = `${fieldNames[firstInvalid.id]}: ${firstInvalid.validationMessage}`;
    }
    else {
        errorMessage.textContent = '';
    }
}

function updateCharCount() {
    const charsRemaining = commentsField.maxLength - commentsField.textLength;
    if (charsRemaining == 0) {
        charCount.textContent = `Message reached max length`;
    } else if (charsRemaining > countWarningThreshold) {
        charCount.textContent = `${charsRemaining} characters remaining`;
    } else {
        charCount.textContent = `Only ${charsRemaining} characters remaining!!!`;
    }
}

nameField.addEventListener('focusout', () => updateInvalid(nameField));
emailField.addEventListener('focusout', () => updateInvalid(emailField));
commentsField.addEventListener('focusout', () => updateInvalid(commentsField));
nameField.addEventListener('invalid', () => updateInvalid(nameField));
emailField.addEventListener('invalid', () => updateInvalid(emailField));
commentsField.addEventListener('invalid', () => updateInvalid(commentsField));
nameField.addEventListener('input', () => updateValid(nameField));
emailField.addEventListener('input', () => updateValid(emailField));
commentsField.addEventListener('input', () => updateValid(commentsField));
commentsField.addEventListener('input', updateCharCount);
updateCharCount();