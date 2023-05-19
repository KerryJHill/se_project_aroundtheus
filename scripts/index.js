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

// Elements----------------------------------------------
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const addCardCloseButton = addCardModal.querySelector("#acmodal-close-button");
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

const cardTitleInput = addCardElementForm.querySelector("#card-title-input");
const cardUrlInput = addCardElementForm.querySelector("#card-url-input");

const cardPreviewModal = document.querySelector("#card-preview-modal");
const cardPreviewModalCloseButton = cardPreviewModal.querySelector(
  "#preview-close-button"
);
const addCardForm = document.querySelector("#add-card-form");

const closeModalWithClick = (e) => {
  if (e.target === e.currentTarget) {
    // handleModalClose(e.currentTarget);
    closeModal(e.currentTarget);
  }
};

const closeModalWithEsc = (e) => {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal__opened");
    closeModal(activeModal);
  }
};

// Functions---------------------------------------------

function openModal(modal) {
  modal.classList.add("modal__opened");
  modal.addEventListener("mousedown", closeModalWithClick);
  document.addEventListener("keydown", closeModalWithEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  modal.removeEventListener("mousedown", closeModalWithClick);
  document.removeEventListener("keydown", closeModalWithEsc);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", handleDeleteCard);
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  cardImageEl.addEventListener("click", () => {
    const imagePreview = document.querySelector(".modal__image-preview");
    const image = imagePreview.querySelector("#modal-image");
    const imageCaption = imagePreview.querySelector(".modal__image-caption");
    image.src = data.link;
    image.alt = data.name;
    imageCaption.textContent = data.name;

    openModal(cardPreviewModal);
  });
  return cardElement;
}

function handleDeleteCard(e) {
  e.target.closest(".card").remove();
}

// Event Handlers--------------------------------------

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  closeModal(addCardModal);
}

function renderCard(Data, wrapper) {
  const cardElement = getCardElement(Data);
  wrapper.prepend(cardElement);
}

// Event Listeners-----------------------------------

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  disableButton(addCardForm.querySelector(".modal__button"), config);
  openModal(addCardModal);
});

addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardElementForm.addEventListener("submit", handleAddCardFormSubmit);

cardPreviewModalCloseButton.addEventListener("click", () =>
  closeModal(cardPreviewModal)
);

initialCards.forEach((data) => renderCard(data, cardListEl));
