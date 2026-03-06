const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fileInput = document.getElementById("fileInput");
const jsonViewer = document.getElementById("jsonViewer");

fileInput.addEventListener("change", function(event){

const file = event.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

const text = e.target.result;

jsonViewer.textContent = text;

const data = JSON.parse(text);

ctx.clearRect(0,0,canvas.width,canvas.height);

drawFractal(
data.startX,
data.startY,
data.length,
data.angle,
data.depth,
data
);

};

reader.readAsText(file);

});

function drawFractal(x,y,length,angle,depth,data){

if(depth <= 0) return;

const rad = angle * Math.PI / 180;

const x2 = x + length * Math.cos(rad);
const y2 = y + length * Math.sin(rad);

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x2,y2);
ctx.strokeStyle = data.color || "cyan";
ctx.stroke();

data.branches.forEach(branch => {

drawFractal(
x2,
y2,
length * branch.scale,
angle + branch.angle,
depth - 1,
data
);

});

}
