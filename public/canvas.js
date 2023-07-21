// tool.beginPath(); // new Graphic (Path)
// tool.moveTo(10, 10); // start point
// tool.lineTo(100, 50); // End point
// tool.stroke(); // Fill color or graphic

// tool.lineTo(150, 200); // It does not start a new path, it just continues from the previous path
// tool.stroke(); // Will draw a new line starting from end of previous line

// // Start a new path
// tool.beginPath();
// tool.moveTo(10, 10);
// tool.lineTo(200, 200);
// tool.stroke();

/*
 Tool -> API to draw graphics
 StrokeSTyle -> color
 lineWidth -> Thinkness of element
 beginPath -> sets a new path
 moveTo -> Start of path( Line in this case)
 lineTo -> end of path( Line in this case)
 stroke -> Gives color to the line made above

*/

// Mouse down -> Start new path
// mousemove -> Path fill(Graphics)

/* Initializing project code */

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElement = document.querySelector(".pencil-width");
let eraserWidthElement = document.querySelector(".eraser-width");
let downloadIcon = document.querySelector(".download");
let redoIcon = document.querySelector(".redo");
let undoIcon = document.querySelector(".undo");

let penColor = "red";
let pencilWidth = pencilWidthElement.value;
let eraserWidth = eraserWidthElement.value;
let eraserColor = "white";

let tool = canvas.getContext("2d");
tool.strokeStyle = penColor;
tool.lineWidth = pencilWidth;
let mousedown = false;
let undoRedo = [];
let tracker = 0;

canvas.addEventListener("mousedown", (e) => {
  mousedown = true;
  //beginPath({ x: e.clientX, y: e.clientY });

  let data = {
    x: e.clientX,
    y: e.clientY,
  };
  socket.emit("beginPath", data); // emits data to server through the socket
  // we get the access tpo socket varible here as we defined this variable in script tag in index.html and
  //canvas.js is included after that tag, so all varibles and functions defined above will get referenced to below script tag files
});

canvas.addEventListener("mousemove", (e) => {
  // Only if mouse is up and clicked

  if (mousedown) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: showEraser ? eraserColor : penColor,
      width: showEraser ? eraserWidth : pencilWidth,
    };
    socket.emit("drawStroke", data);
    // drawStroke({
    //   x: e.clientX,
    //   y: e.clientY,
    //   color: showEraser ? eraserColor : penColor,
    //   width: showEraser ? eraserWidth : pencilWidth,
    // });
  }
});

canvas.addEventListener("mouseup", (e) => {
  mousedown = false;
  let url = canvas.toDataURL("image/jpeg", 1.0);
  undoRedo.push(url);
  tracker = undoRedo.length - 1;
});

const beginPath = (strokeOj) => {
  tool.beginPath();
  tool.moveTo(strokeOj.x, strokeOj.y); // e.clientX is the horizontal distance of the x axis to the mouse clicked point
};

const drawStroke = (strokeOj) => {
  tool.strokeStyle = strokeOj.color;
  tool.lineWidth = strokeOj.width;
  tool.lineTo(strokeOj.x, strokeOj.y); // Makes a line
  tool.stroke();
};

const undoRedoCanvas = (trackObj) => {
  //REinitialise track and undoRedo
  //   let { tracker, undoRedo } = trackObj;
  tracker = trackObj.tracker;
  undoRedo = trackObj.undoRedo;

  // Fetch last URl
  let url = undoRedo[tracker];
  let img = new Image(); // New Inage

  //"https://picsum.photos/200/300";
  img.src = url;

  // Do something on image load
  // draw an image from the previous canvas state
  // Previous canvas state is stored as URL above
  // and that state is converted to a new image
  // Then we use drawImage method of tool to create a new graphic
  //   tool.fillRect(50, 50, 500, 500);
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height); // start from 0,0 and fill with entire canvas height and width
    // tool.fillStyle = "white";

    //draw background / rect on entire canvas
    // tool.fillRect(0, 0, canvas.width, canvas.height);
  };
};

pencilColor.forEach((colorElement) => {
  colorElement.addEventListener("click", (e) => {
    let color = colorElement.classList[1];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});

pencilWidthElement.addEventListener("change", (e) => {
  pencilWidth = pencilWidthElement.value;
  tool.lineWidth = pencilWidth;
});

eraserWidthElement.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElement.value;
  tool.lineWidth = eraserWidth;
});

eraserIcon.addEventListener("click", (e) => {
  if (showEraser) {
    // if eraser is active then the stroke styles should be of eraser color which will be white by default
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    // if eraser is inactive then the stroke styles should be of pencil
    tool.strokeStyle = penColor;
    tool.lineWidth = pencilWidth;
  }
});

downloadIcon.addEventListener("click", (e) => {
  let url = canvas.toDataURL(); // Converts a Url of the entire canvas graphic drawn

  // Steps to download something
  let anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "board.jpg";
  anchor.click();
});

redoIcon.addEventListener("click", (e) => {
  if (tracker < undoRedo.length - 1) {
    tracker++;
  }
  let data = {
    tracker,
    undoRedo,
  };
  socket.emit("redo", data);
  // undoRedoCanvas({ tracker, undoRedo });
});

undoIcon.addEventListener("click", (e) => {
  if (tracker > 0) {
    tracker--;
  }
  let data = {
    tracker,
    undoRedo,
  };
  socket.emit("undo", data);
  //undoRedoCanvas({ tracker, undoRedo });
});

// This will get triggered after the BE server sends data to Client bComputer via socket
socket.on("beginPath", (data) => {
  // data from BE server
  // perform something
  beginPath(data); // beginPath is the function that draws. Defined on line 86
});

socket.on("drawStroke", (data) => {
  // data from BE server
  // perform something
  drawStroke(data); // drawStroke is the function that draws. Defined on line 98
});

socket.on("undo", (data) => {
  // data from BE server
  // perform something
  undoRedoCanvas(data); // undoRedoCanvas is the function that draws. Defined on line 105
});

socket.on("redo", (data) => {
  // data from BE server
  // perform something
  undoRedoCanvas(data); // undoRedoCanvas is the function that draws. Defined on line 105
});
