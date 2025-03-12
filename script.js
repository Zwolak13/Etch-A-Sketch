let canvas = document.querySelector("canvas");
const knobs = document.querySelectorAll(".knobs"); 
let activeKnob = null; 
let resetButton = document.getElementById("resetCanvaButton")
let colorPicker = document.getElementById("colorPicker");

let c = canvas.getContext('2d');

const drawingPanel = document.getElementById('drawingPanel');
const rect = drawingPanel.getBoundingClientRect();

const width = rect.width;
const height = rect.height;

canvas.width = width; 
canvas.height = height; 

let brushPositionX = canvas.width/2;
let brushPositionY = canvas.height/2;

maxX = canvas.width -20;
minX = 20;
maxY = canvas.height -20;
minY = 20;

c.lineWidth = 5;
c.beginPath();
c.moveTo(canvas.width/2, canvas.height/2);
c.strokeStyle = "black";


resetButton.addEventListener("click", (e) =>{
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
});

colorPicker.addEventListener("input", (e) => {
    c.strokeStyle = colorPicker.value;
    c.beginPath();
    c.moveTo(brushPositionX, brushPositionY);
});
 

let previousAngleRight = null; 
let previousAngleLeft = null; 
let rotationDirection = null; 

const sensitivity = 0.1; 

knobs.forEach(element => {
    element.addEventListener("mouseenter", (e) => {
        activeKnob = element; 
    });

    element.addEventListener("wheel", (e) => {
        if (!activeKnob) return;
    
        let deltaAngle = e.deltaY * sensitivity; 
    
    
        draw(element.id, deltaAngle);

        
    });


    element.addEventListener("mouseleave", () => {
        activeKnob = null;
    
    });

});

const keys = {}; 

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    handleKeys(); 
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false; 
    activeKnob = null;
});

function handleKeys() {
    let deltaAngle = 10;
    

    if (keys["w"] && keys["a"]) {
        draw("left", -deltaAngle);
        draw("right", -deltaAngle);
    } 

    else if (keys["w"] && keys["d"]) {
        draw("left", -deltaAngle);
        draw("right", deltaAngle);
    } 

    else if (keys["s"] && keys["a"]) {
        draw("left", deltaAngle);
        draw("right", -deltaAngle);
    } 

    else if (keys["s"] && keys["d"]) {
        draw("left", deltaAngle);
        draw("right", deltaAngle);
    } 

    else {
        if (keys["a"]) draw("right", -deltaAngle);
        if (keys["d"]) draw("right", deltaAngle);
        if (keys["w"]) draw("left", -deltaAngle);
        if (keys["s"]) draw("left", deltaAngle);
    }
}


function rotateKnob(deltaAngle,whichKnob){
    if(whichKnob == "left"){
        angle = (previousAngleLeft || 0) + deltaAngle;
    
        previousAngleLeft = angle;
    }else{
        angle = (previousAngleRight || 0) + deltaAngle;
    
        previousAngleRight = angle;
    }
    if(activeKnob != whichKnob){
        activeKnob = document.getElementById(whichKnob);
    }
    activeKnob.style.transform = `rotate(${angle}deg)`;
}

function draw(element, deltaAngle){
    if (deltaAngle>0){
        rotationDirection = "down";
    }else{
        rotationDirection = "up"
    }


    if(element == "right"){
        if(brushPositionX > maxX  && rotationDirection == "down" || brushPositionX < minX && rotationDirection == "up") return;
        brushPositionX += deltaAngle;
        c.lineTo(brushPositionX,brushPositionY);
        c.stroke();

    }else if(element == "left"){
        if(brushPositionY > maxY  && rotationDirection == "down" || brushPositionY < minY && rotationDirection == "up") return;
        brushPositionY += deltaAngle;
        c.lineTo(brushPositionX,brushPositionY);
        c.stroke();
    }

    rotateKnob(deltaAngle,element);
}









