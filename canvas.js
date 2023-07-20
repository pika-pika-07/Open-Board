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
let penColor = "red";
let pencilWidth = pencilWidthElement.value;
let eraserWidth = eraserWidthElement.value;
let eraserColor = "white";

let tool = canvas.getContext("2d");
tool.strokeStyle = penColor;
tool.lineWidth = pencilWidth;
let mousedown = false;

canvas.addEventListener("mousedown", (e) => {
  mousedown = true;
  beginPath({ x: e.clientX, y: e.clientY });
});

canvas.addEventListener("mousemove", (e) => {
  // Only if mouse is up and clicked
  if (mousedown) {
    drawStroke({ x: e.clientX, y: e.clientY });
  }
});

canvas.addEventListener("mouseup", (e) => {
  mousedown = false;
});

const beginPath = (strokeOj) => {
  tool.beginPath();
  tool.moveTo(strokeOj.x, strokeOj.y); // e.clientX is the horizontal distance of the x axis to the mouse clicked point
};

const drawStroke = (strokeOj) => {
  tool.lineTo(strokeOj.x, strokeOj.y); // Makes a line
  tool.stroke();
};

pencilColor.forEach((colorElement) => {
  colorElement.addEventListener("click", (e) => {
    let color = colorElement.classList[1];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});
