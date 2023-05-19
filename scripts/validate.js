function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  {
    hideInputError(formElement, inputElement, options);
  }
}

function hasInvalidInput(inputElements) {
  return !inputElements.every((inputElement) => inputElement.validity.valid);
}

function disableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

function enableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, { inactiveButtonClass });
    return;
  }
  enableButton(submitButton, { inactiveButtonClass });
}

function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);
  // const buttonElement = formElement.querySelector(".modal__button");

  toggleButtonState(inputElements, submitButton, options);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  // formElements - that means you need to find FORMS, but currently these are DIV's. The preview modal don't have a form, but if you look for the modal div, od couurse you will select this modal as well. And THAT causes an issue

  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}
const config = {
  // formSelector: ".popup__form",
  // inputSelector: ".popup__input",
  // submitButtonSelector: ".popup__button",
  // inactiveButtonClass: "popup__button_disabled",
  // inputErrorClass: "popup__input_type_error",
  // errorClass: "popup__error_visible",
  modalSelector: ".modal", // handle formSelector
  formSelector: ".modal__form", // it has name about forms, but you search for modals
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
