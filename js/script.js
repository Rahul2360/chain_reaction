let row_count = 5;
let column_count = 5;
const lineWidth = 1;

const canvas = document.getElementById('main-canvas');

const box = {
	height: 40,
	width: 40
};

const player = ['p1', 'p2'];

$(document).ready(function () {
	draw();
});

function draw() {
	if (canvas.getContext) {
		reset();
		var ctx = canvas.getContext('2d');

		for (let  i = 0; i < column_count; i++) {
			for (let j = 0; j < row_count; j++) {
				ctx.rect(box.width*i, box.height*j, box.width, box.height);
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = "black";
				ctx.stroke();
			}
		}

		// for (let i = 1; i<= column_count; i++ ) {
		// 	ctx.lineWidth = lineWidth;
		// 	ctx.beginPath();
		// 	ctx.moveTo(box.width*i, 0);
		// 	ctx.lineTo(box.width*i, box.width*row_count)
		// 	ctx.stroke();
		// }
		// for (let j = 1; j <= row_count; j++) {
		// 	ctx.lineWidth = lineWidth;
		// 	ctx.beginPath();
		// 	ctx.moveTo(0, box.height*j);
		// 	ctx.lineTo(box.height*column_count, box.height*j)
		// 	ctx.stroke();
		// }

	}
	canvas.addEventListener('click',handleClick)	;	
}

function getMousePosition(c, evt) {
	var rect = c.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	}
}

function handleClick(e) {
	var pos = getMousePosition(canvas, e);
	posx = pos.x;
	posy = pos.y;
	alert(posx + "  " + posy)
}



function reset() {
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
	}
}


function getDimension() {
	if (row_count != null && column_count != null) {
		// reset();
		column_count = document.getElementById('column_length').value;
		row_count = document.getElementById('row_length').value;
		draw();
	}
}