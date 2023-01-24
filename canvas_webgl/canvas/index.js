const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, 1024, 576);

// Sun
ctx.fillStyle = 'yellow';
ctx.arc(100, 75, 50, 0, 2 * Math.PI, false);
ctx.closePath();
ctx.fill();

// basic house
ctx.fillStyle = '#85593e';
ctx.fillRect(100, 300, 400, 250);

// House ceiling
ctx.beginPath()
ctx.moveTo(100, 300);
ctx.lineTo(300, 200);
ctx.lineTo(500, 300);
ctx.fillStyle = '#e33434';
ctx.fill();

// House door
ctx.fillStyle = '#47362b';
ctx.fillRect(150, 450, 50, 100);



