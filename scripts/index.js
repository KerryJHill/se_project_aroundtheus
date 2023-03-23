const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louis",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const addCardCloseButton = addCardModal.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__container");
const addCardElementForm = addCardModal.querySelector(".modal__container");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// const cardTitleInput = addCardFormElement.querySelector(#card-title-input);
// const cardUrlInput = addCardFormElement.querySelector(#card-url-input);

const cardTitleInput = addCardElementForm.querySelector("#card-title-input");
const cardUrlInput = addCardElementForm.querySelector("#card-url-input");

// Functions

function openModal(modal) {
  modal.classList.add("modal__opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  return cardElement;
}

// Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
// function handleAddCardEditSubmit(e) {
//   e.preventDefault();
//   addCardTitle.textContent = cardTitleInput.value;
//   addCardUrl.textContent = cardUrlInput.value;

//   const cardElement = getCardElement();
//   closeModal(addCardModal);
// }

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  // console.log("name", name);
  // return console.log("link", link);
  renderCard({ name, link }, cardListEl);

  const cardElement = getCardElement({
    name,
    link,
  });

  closeModal(addCardModal);
}

function renderCard(Data, wrapper) {
  const cardElement = getCardElement(Data);
  // cardListEl.prepend(cardElement);
  wrapper.prepend(cardElement);
}
// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  // profileEditModal.classList.add("modal__opened");
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardElementForm.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((data) => {
//   renderCard(data, cardListEl);
// const cardElement = getCardElement(data);
// cardListEl.prepend(cardElement);
initialCards.forEach((data) => renderCard(data, cardListEl));
