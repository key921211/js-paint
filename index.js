const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_WIDTH = document.getElementsByClassName('canvas')[0].offsetWidth;
const CANVAS_HEIGHT = document.getElementsByClassName('canvas')[0].offsetHeight;
//캔버스에서 그릴 수 있는 픽셀크기를 설정 
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}
//그리기
function onMouseMove (e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if(!painting) {
        //시작위치 설정
        ctx.beginPath();
        ctx.moveTo(x, y);

    } else {
 
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle  = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e) {
    const size = e.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'paint';
    }
}

function handleCanvasCilck() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function handleCM(e) {
    e.preventDefault();
}

function handleSaveCilck() {
    const image = canvas.toDataURL();//image/jpeg 를 넣어주면 .jpg로 
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS[🎨]';
    link.click();
}

if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasCilck);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));


if(range) {
    range.addEventListener('input', handleRangeChange);
}

if(mode) {
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveCilck);
}