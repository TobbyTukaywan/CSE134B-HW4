const form = document.getElementById('comment-form');
const nameField = form.elements.name;
const emailField = form.elements.email;
const commentsField = form.elements.comments;
const formErrorsField = form.elements['form-errors'];
const errorMessage = form.querySelector('error-message');
const charCount = form.querySelector('char-count');
const fieldNames = {
    name: 'Name',
    email: 'Email',
    comments: 'Comments'
}
const countWarningThreshold = 100;
let form_errors = [];

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

function receiveInput(input) {
    if (input.validity.customError) {
        updateInvalid(input);
    } else {
        updateErrorMessage()
    }
}

function updateErrorMessage() {
    errorMessage.replaceChildren();
    addErrorToMessage(nameField);
    addErrorToMessage(emailField);
    addErrorToMessage(commentsField);
}

function addErrorToMessage(invalidField) {
    if (invalidField.validity.customError) {
        if (errorMessage.textContent) {
            errorMessage.append(document.createElement('br'));
        }
        errorMessage.append(`${fieldNames[invalidField.id]}: ${invalidField.validationMessage}`);
    }
}

function updateCharCount() {
    const charsRemaining = commentsField.maxLength - commentsField.textLength;
    if (charsRemaining == 0) {
        charCount.textContent = `Message reached max length`;
        charCount.classList.add('warning');
    } else if (charsRemaining > countWarningThreshold) {
        charCount.textContent = `${charsRemaining} characters remaining`;
        charCount.classList.remove('warning');
    } else {
        charCount.textContent = `Only ${charsRemaining} characters remaining!!!`;
        charCount.classList.add('warning');
    }
}

function recordError(input) {
    form_errors.push(`${fieldNames[input.id]}: ${input.validationMessage}`);
    console.log(form_errors);
}

function addFormErrors() {
    formErrorsField.value = JSON.stringify(form_errors);
}

nameField.addEventListener('focusout', () => updateInvalid(nameField));
emailField.addEventListener('focusout', () => updateInvalid(emailField));
commentsField.addEventListener('focusout', () => updateInvalid(commentsField));
nameField.addEventListener('invalid', () => updateInvalid(nameField));
emailField.addEventListener('invalid', () => updateInvalid(emailField));
commentsField.addEventListener('invalid', () => updateInvalid(commentsField));
nameField.addEventListener('invalid', () => recordError(nameField));
emailField.addEventListener('invalid', () => recordError(emailField));
commentsField.addEventListener('invalid', () => recordError(commentsField));
nameField.addEventListener('input', () => receiveInput(nameField));
emailField.addEventListener('input', () => receiveInput(emailField));
commentsField.addEventListener('input', () => receiveInput(commentsField));
commentsField.addEventListener('input', updateCharCount);
updateCharCount();
form.addEventListener('submit', addFormErrors);