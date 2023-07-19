let optionsContainer = document.querySelector(".options-container");
let showOptions = true;
let toolsContainer = document.querySelector(".tools-container");
let pencilContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");
let stickyContainer = document.querySelector(".sticky-container");

let icon = optionsContainer.children[0];
let pencilIcon = document.querySelector(".pencil");
let eraserIcon = document.querySelector(".eraser");
let stickyNoteIcon = document.querySelector(".stickyNote");
let showPencil = false;
let showEraser = false;
let showNoteEditor = false;
const onClick = (event) => {
  showOptions = !showOptions;
  if (showOptions) {
    openTools();
  } else {
    closeTools();
  }
};

const pencilCLick = () => {
  showPencil = !showPencil;
  if (showPencil) {
    pencilContainer.style.display = "block";
  } else {
    pencilContainer.style.display = "none";
  }
};

const eraserClick = () => {
  showEraser = !showEraser;
  if (showEraser) {
    eraserToolContainer.style.display = "flex";
  } else {
    eraserToolContainer.style.display = "none";
  }
};
const stickyNoteClick = () => {
  showNoteEditor = !showNoteEditor;
  if (showNoteEditor) {
    stickyContainer.style.display = "block";
  } else {
    stickyContainer.style.display = "none";
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
pencilIcon.addEventListener("click", pencilCLick);
eraserIcon.addEventListener("click", eraserClick);
stickyNoteIcon.addEventListener("click", stickyNoteClick);
