let optionsContainer = document.querySelector(".options-container");
let showOptions = true;
let toolsContainer = document.querySelector(".tools-container");
let pencilContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");
let icon = optionsContainer.children[0];

const onClick = (event) => {
  showOptions = !showOptions;

  if (showOptions) {
    openTools();
  } else {
    closeTools();
  }
};

const openTools = () => {
  icon.classList.remove("fa-bars");
  icon.classList.add("fa-close");
  toolsContainer.style.display = "flex";
};

const closeTools = () => {
  icon.classList.remove("fa-close");
  icon.classList.add("fa-bars");
  toolsContainer.style.display = "none";
  pencilContainer.style.display = "none";
  eraserToolContainer.style.display = "none";
};

optionsContainer.addEventListener("click", onClick);
