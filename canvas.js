let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tool = canvas.getContext("2d");
tool.strokeStyle = "red";
tool.lineWidth = 7;

tool.beginPath(); // new Graphic (Path)
tool.moveTo(10, 10); // start point
tool.lineTo(100, 50); // End point
tool.stroke(); // Fill color or graphic

tool.lineTo(150, 200); // It does not start a new path, it just continues from the previous path
tool.stroke(); // Will draw a new line starting from end of previous line

// Start a new path
tool.beginPath();
tool.moveTo(10, 10);
tool.lineTo(200, 200);
tool.stroke();

/*
 Tool -> API to draw graphics
 StrokeSTyle -> color
 lineWidth -> Thinkness of element
 beginPath -> sets a new path
 moveTo -> Start of path( Line in this case)
 lineTo -> end of path( Line in this case)
 stroke -> Gives color to the line made above

*/
