let row_count = 5;
let column_count = 5;
const lineWidth = 1;

const canvas = document.getElementById('main-canvas');

const box = {
	height: 40,
	width: 40
};

var player_turn;
const player = [
  {
    id :1,
    name: "Rahul",
    color: "#79FA39" 
  },
  {
    id :2,
    name: "Sahil",
    color: "#F34533"
  }
];

var matrix = [];

$(document).ready(function () {
  draw();
  
  document.getElementById('player_name').innerHTML = player[0].name + " turn";
  player_turn = player[0].id;
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
        var temp_obj = {};
        temp_obj[i+ '_' + j] = {
          value : false
        };
        matrix.push(temp_obj);
      }
    }
    console.log(matrix);

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
  var matrix_i,matrix_j;
  // for (let i = 0 ;i < column_count; i++) {
  //   if (pos.x > (box.width*i) &&  pos.x  < (box.width*(i + 1))) {
  //     x = i;
  //   }
  // }
  // for (let j = 0 ;j < row_count; j++) {
  //   if (pos.y > (box.height*j) &&  pos.y < (box.height*(j + 1))) {
  //     y = j;
  //   }
  // }

  for (let i = 0 ;i < column_count; i++) {
    for (let j = 0 ;j < row_count; j++) {
      if (pos.x > (box.width*i) &&  pos.x  < (box.width*(i + 1)) &&
      pos.y > (box.height*j) &&  pos.y < (box.height*(j + 1))) {
        matrix_i = i;
        matrix_j = j;
      }
    }
  }
  // console.log(pos);  
  // console.log((pos.x + lineWidth)/box.width);
  // console.log((pos.x - lineWidth)/box.width);
  // console.log("******************************");
  // console.log((pos.y + lineWidth)/box.height);
  // console.log((pos.y - lineWidth)/box.height);
  if (matrix_i != undefined && matrix_j != undefined) {
    var value = check_matrix(matrix_i,matrix_j);
    if  (!value) {
      fill_matrix(matrix_i,matrix_j);
      switch_player_turn(matrix_i, matrix_j);
    }
  }
  // if ( pos.x >  0 + lineWidth &&
  //   pos.x <  box.width + lineWidth && 
  //   pos.y >  0 + lineWidth &&
  //   pos.y <  box.height + lineWidth) {
  //     var ctx = canvas.getContext('2d');
  //     ctx.fillStyle = "#8ED6FF";
  //     ctx.fillRect(0 + lineWidth, 0 + lineWidth, box.width-(2*lineWidth), box.height-(2*lineWidth));
  //   }
	// posx = pos.x;
	// posy = pos.y;
	// alert(posx + "  " + posy)
}

function switch_player_turn(x, y) {
  var ctx = canvas.getContext('2d');
  for (let i = 0; i< player.length ; i++) {
    if (player[i].id == player_turn) {
      if (i != player.length-1) {
        player_turn = player[i+1].id;
        ctx.fillStyle = player[i].color;
        break;
      } else {
        player_turn = player[0].id;
        ctx.fillStyle = player[player.length - 1].color;
      }
    }
  }
  ctx.fillRect((x*box.width) + lineWidth, (y*box.height)+ lineWidth, box.width-(2*lineWidth), box.height-(2*lineWidth));
}


function check_matrix(j_value,i_value) {
  var data_exist = false;
  var index_i = parseInt(i_value*column_count + j_value);
  var val = i_value + '_' + j_value;
  if(matrix[index_i][val].value == true){
    data_exist = true;
  }
  return data_exist;
}


function fill_matrix(j_value, i_value) {
  var value = i_value + '_' + j_value;
  var index_i = parseInt(i_value*column_count + j_value);
  var key_name = Object.keys(matrix[index_i]);
  matrix[index_i][key_name].value = true;
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