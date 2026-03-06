const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let fractalData = null;

document.getElementById("fileInput").addEventListener("change", loadJSON);
document.getElementById("depth").addEventListener("input", draw);

function loadJSON(event){

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e){

        fractalData = JSON.parse(e.target.result);
        draw();
    };

    reader.readAsText(file);
}

function draw(){

    if(!fractalData) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const depth = document.getElementById("depth").value;

    drawFractal(
        fractalData.startX,
        fractalData.startY,
        fractalData.length,
        fractalData.angle,
        depth
    );
}

function drawFractal(x,y,length,angle,depth){

    if(depth === 0) return;

    const rad = angle * Math.PI / 180;

    const x2 = x + length * Math.cos(rad);
    const y2 = y + length * Math.sin(rad);

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = "cyan";
    ctx.stroke();

    fractalData.branches.forEach(branch => {

        drawFractal(
            x2,
            y2,
            length * branch.scale,
            angle + branch.angle,
            depth - 1
        );

    });

}
