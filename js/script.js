let row_count = 4;
let column_count = 4;
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
    color: "#79FA39",
    text_color: "#0A8C5C"
  },
  {
    id :2,
    name: "Sahil",
    color: "#F34533",
    text_color: "#8b0000"
  },
  {
    id :3,
    name: "Mohit",
    color: "#33F3D9",
    text_color: "#2323AF"
  }
];

var matrix = [];

$(document).ready(function () {
  draw();
  
  document.getElementById('player_name').innerHTML = player[0].name + " turn";
  document.getElementById('player_name').style.color = player[0].color;

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
          value : false,
          count: 0,
          player_id: null
        };
        matrix.push(temp_obj);
      }
    }

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

  for (let i = 0 ;i < column_count; i++) {
    for (let j = 0 ;j < row_count; j++) {
      if (pos.x > (box.width*i) &&  pos.x  < (box.width*(i + 1)) &&
      pos.y > (box.height*j) &&  pos.y < (box.height*(j + 1))) {
        matrix_i = i;
        matrix_j = j;
      }
    }
  }
  if (matrix_i != undefined && matrix_j != undefined) {
    var value = check_matrix(matrix_i,matrix_j);
    if  (!value) {
      fill_matrix(matrix_i,matrix_j);
      switch_player_turn(matrix_i, matrix_j);
    }
  }
}

function switch_player_turn(x, y) {
  var ctx = canvas.getContext('2d');
  var index_i = parseInt(y*column_count + x);
  var val = y + '_' + x;
  for (let i = 0; i< player.length ; i++) {
    if (player[i].id == player_turn) {
      if (i != player.length-1) {
        player_turn = player[i+1].id;

        ctx.fillStyle = player[i].color;
        ctx.fillRect((x*box.width) + lineWidth, (y*box.height)+ lineWidth, box.width-(2*lineWidth), box.height-(2*lineWidth));
        document.getElementById('player_name').innerHTML = player[i+1].name + " turn";
        document.getElementById('player_name').style.color = player[i+1].color;
        ctx.fillStyle = player[i].text_color;
        break;
      } else {
        player_turn = player[0].id;
        ctx.fillStyle = player[player.length - 1].color;
        ctx.fillRect((x*box.width) + lineWidth, (y*box.height)+ lineWidth, box.width-(2*lineWidth), box.height-(2*lineWidth));
        document.getElementById('player_name').innerHTML = player[0].name + " turn";
        document.getElementById('player_name').style.color = player[0].color;
        ctx.fillStyle = player[player.length - 1].text_color;
      }
    }
  }
  ctx.font = "18pt sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(matrix[index_i][val].count, ((x+1)*(box.width)) -20, ((y+1)*(box.height)) -12);
}


function check_matrix(j_value,i_value) {
  var data_exist = false;
  var index_i = parseInt(i_value*column_count + j_value);
  var val = i_value + '_' + j_value;

  // Main Logic part 1
  if(( i_value == 0 && j_value == 0) ||
     ( i_value == 0 && j_value == row_count -1) || 
     ( i_value == column_count -1 && j_value == 0) || 
     ( i_value == column_count -1 && j_value == row_count -1)) {
    if (matrix[index_i][val].player_id != null) {
      if(matrix[index_i][val].count >= 1 || matrix[index_i][val].player_id != player_turn){
        data_exist = true;
      }
    } else {
      if(matrix[index_i][val].count >= 1){
        data_exist = true;
      }
    }
  } else if ((i_value == 0 && j_value != 0) || (j_value == 0 && i_value != 0)) {
    if (matrix[index_i][val].player_id != null) {
      if(matrix[index_i][val].count >= 2 || matrix[index_i][val].player_id != player_turn){
        data_exist = true;
      }
    } else {
      if(matrix[index_i][val].count >= 2){
        data_exist = true;
      }
    }
  } else { 
    if (matrix[index_i][val].player_id != null) {
      if(matrix[index_i][val].count >= 3 || matrix[index_i][val].player_id != player_turn){
        data_exist = true;
      } 
    } else {
      if(matrix[index_i][val].count >= 3){
        data_exist = true;
      }
    }
  }
  return data_exist;
}


function fill_matrix(j_value, i_value) {
  var value = i_value + '_' + j_value;
  var index_i = parseInt(i_value*column_count + j_value);
  var key_name = Object.keys(matrix[index_i]);
  matrix[index_i][key_name].value = true;
  matrix[index_i][key_name].count++;
  matrix[index_i][key_name].player_id = player_turn;
  console.log(matrix);
}

function reset() {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    matrix = [];
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