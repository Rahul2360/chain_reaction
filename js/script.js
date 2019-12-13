
let row_count = 2;
let column_count = 2;
const lineWidth = 2;

const starting_point_x = 0;
const starting_point_y = 0;

const box = {
	height: 25,
	width: 25
};

function getDimension() {
	if (row_count != '' && column_count != '') {
		reset();
		column_count = document.getElementById('column_length').value;
		row_count = document.getElementById('row_length').value;
		draw();
	}
}

function draw() {
	var canvas = document.getElementById('main-canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		
		for (let i = 0; i< column_count; i++ ) {
			for (let j = 0; j < row_count; j++ ) {
				if (i%2 == j%2) {
					ctx.fillStyle = 'black';
					ctx.fillRect(starting_point_x +box.height*i ,starting_point_y+ box.width*j , box.height, box.width);
				} else {
					ctx.fillStyle = 'white';
					ctx.fillRect(starting_point_x +box.height*i ,starting_point_y+ box.width*j , box.height, box.width);
				}
			}
		}

		// for (let i = 0; i< column_count; i++ ) {
		// 	ctx.moveTo((box.width*i) + lineWidth, 0);
		// 	ctx.lineTo((box.width*row_count))
		// }
	}
}

function reset() {
	var canvas = document.getElementById('main-canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		
		for (let i = 0; i< column_count; i++ ) {
			for (let j = 0; j < row_count; j++ ) {
				ctx.fillStyle = 'white';
				ctx.fillRect(starting_point_x +box.height*i ,starting_point_y+ box.width*j , box.height, box.width);
			}
		}
	}
}