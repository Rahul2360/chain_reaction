let row_count = 5;
let column_count = 5;
const lineWidth = 2;

const box = {
	height: 25,
	width: 25
};

$(document).ready(function () {

	const starting_point_x = 0;
	const starting_point_y = 0;

	draw();
});

function draw() {
	reset();
	var canvas = document.getElementById('main-canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		for (let i = 1; i<= column_count; i++ ) {
			ctx.lineWidth = lineWidth;
			ctx.beginPath();
			ctx.moveTo(box.width*i, 0);
			ctx.lineTo(box.width*i, box.width*row_count)
			ctx.stroke();
		}
		for (let j = 1; j <= row_count; j++) {
			ctx.lineWidth = lineWidth;
			ctx.beginPath();
			ctx.moveTo(0, box.height*j);
			ctx.lineTo(box.height*column_count, box.height*j)
			ctx.stroke();
		}

	}
}

function reset() {
	var canvas = document.getElementById('main-canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
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