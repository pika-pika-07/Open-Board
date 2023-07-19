let optionsContainer = document.querySelector(".options-container");
let showOptions = true;
let toolsContainer = document.querySelector(".tools-container");
let pencilContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");

let icon = optionsContainer.children[0];
let pencilIcon = document.querySelector(".pencil");
let eraserIcon = document.querySelector(".eraser");
let stickyNoteIcon = document.querySelector(".stickyNote");
let uploadIcon = document.querySelector(".upload");
let showPencil = false;
let showEraser = false;
let showNoteEditor = false;

const uploadHTML = ` 
<div class="header-container">
  <div class="minimize" onClick="minimizeNote(${headerId})"></div>
  <div class="remove" onClick="deleteNote(${headerId})"></div>
</div>
<div class="notes-container">
  <img src="${url}"/>
</div>`;

const noteHTML = `<div class="header-container">
<div class="minimize" onClick="minimizeNote(${headerId})"></div>
<div class="remove" onClick="deleteNote(${headerId})"></div>
</div>
<div class="notes-container">
<textarea spellcheck="false"></textarea>
</div>`;
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

const actions = (minimizeIcon, removeIcon, stickyContainer, id) => {
  removeIcon.addEventListener("click", (e) => {
    let stickyContainerToRemove = document.getElementById(id);
    debugger;
    stickyContainerToRemove.remove();
  });

  minimizeIcon.addEventListener("click", (e) => {});
};

const stickyNoteClick = (e) => {
  let stickyContainer = document.createElement("div");
  let headerId = "header_" + Math.floor(Math.random() * 100000);
  stickyContainer.setAttribute("class", "sticky-container");
  stickyContainer.setAttribute("id", `${headerId}`);

  stickyContainer.innerHTML = noteHTML;

  document.body.appendChild(stickyContainer);

  let minimizeIcon = document.querySelector(".minimize");
  let removeIcon = document.querySelector(".remove");

  DragDrop(stickyContainer, e);
};

const deleteNote = (id) => {
  let newID = `#${id.id}`;
  let stickyContainerToRemove = document.querySelector(newID);

  stickyContainerToRemove.remove();
};

const minimizeNote = (id) => {
  let newID = `#${id.id}`;

  let stickyContainerToMinimize = document.querySelector(newID);

  let notesContainer = stickyContainerToMinimize.children[1];

  let display = getComputedStyle(notesContainer).getPropertyValue("display");
  if (display === "none") {
    notesContainer.style.display = "block";
  } else {
    notesContainer.style.display = "none";
  }
};
const DragDrop = (element, event) => {
  element.onmousedown = function (event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = "absolute";
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + "px";
      element.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      element.onmouseup = null;
    };
  };

  element.ondragstart = function () {
    return false;
  };
};

const uploadCLick = (event) => {
  //Open File
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  input.addEventListener("change", (e) => {
    let uploadedFile = input.files[0];
    let url = URL.createObjectURL(uploadedFile);
    let stickyContainer = document.createElement("div");
    let headerId = "header_" + Math.floor(Math.random() * 100000);
    stickyContainer.setAttribute("class", "sticky-container");
    stickyContainer.setAttribute("id", `${headerId}`);

    stickyContainer.innerHTML = uploadHTML;

    document.body.appendChild(stickyContainer);

    let minimizeIcon = document.querySelector(".minimize");
    let removeIcon = document.querySelector(".remove");

    DragDrop(stickyContainer, e);
  });
};

optionsContainer.addEventListener("click", onClick);
pencilIcon.addEventListener("click", pencilCLick);
eraserIcon.addEventListener("click", eraserClick);
stickyNoteIcon.addEventListener("click", stickyNoteClick);
uploadIcon.addEventListener("click", uploadCLick);
