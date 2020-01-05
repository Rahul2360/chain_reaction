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
    color: "#79FA39",
    text_color: "#0A8C5C"
  },
  {
    id :2,
    name: "Kanishka",
    color: "#F34533",
    text_color: "#8b0000"
  }
  // {
  //   id :3,
  //   name: "Mohit",
  //   color: "#33F3D9",
  //   text_color: "#2323AF"
  // }
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
      fill_cell(matrix_i, matrix_j);
      switch_player_turn();
    }
  }
}

function fill_cell (x,y) {
  var ctx = canvas.getContext('2d');
  var index_i = parseInt(y*column_count + x);
  var val = y + '_' + x;
  for (let i = 0; i< player.length ; i++) {
    if (player[i].id == player_turn) {
      if (i != player.length-1) {

        ctx.fillStyle = player[i].color;
        ctx.fillRect((x*box.width) + lineWidth, (y*box.height)+ lineWidth, box.width-(2*lineWidth), box.height-(2*lineWidth));
        ctx.fillStyle = player[i].text_color;
        break;
      } else {
        ctx.fillStyle = player[player.length - 1].color;
        ctx.fillRect((x*box.width) + lineWidth, (y*box.height)+ lineWidth, box.width-(2*lineWidth), box.height-(2*lineWidth));
        ctx.fillStyle = player[player.length - 1].text_color;
      }
    }
  }
  ctx.font = "18pt sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(matrix[index_i][val].count, ((x+1)*(box.width)) -20, ((y+1)*(box.height)) -12);
}

function switch_player_turn() {
  for (let i = 0; i< player.length ; i++) {
    if (player[i].id == player_turn) {
      if (i != player.length-1) {
        player_turn = player[i+1].id;
        document.getElementById('player_name').innerHTML = player[i+1].name + " turn";
        document.getElementById('player_name').style.color = player[i+1].color;
        break;
      } else {
        player_turn = player[0].id;
        document.getElementById('player_name').innerHTML = player[0].name + " turn";
        document.getElementById('player_name').style.color = player[0].color;
      }
    }
  }
}


function check_matrix(j_value,i_value) {
  var data_exist = false;
  var index_i = parseInt(i_value*row_count + j_value);
  var val = i_value + '_' + j_value;

  // Main Logic part 1
  if(( i_value == 0 && j_value == 0) ||
     ( i_value == 0 && j_value == row_count -1) || 
     ( i_value == column_count -1 && j_value == 0) || 
     ( i_value == column_count -1 && j_value == row_count -1)) {
    if (matrix[index_i][val].player_id != null) {
      if(matrix[index_i][val].count >= 1 || matrix[index_i][val].player_id != player_turn){
        if (matrix[index_i][val].count == 1 && matrix[index_i][val].player_id == player_turn) {
          reset_cell(i_value, j_value);
          chain_reaction(i_value, j_value);
          switch_player_turn();
        }
        data_exist = true;
      }
    } else {
      if(matrix[index_i][val].count >= 1){
        data_exist = true;
      }
    }
  } else if ((i_value == 0 && j_value != 0) || 
      (j_value == 0 && i_value != 0) || 
      (j_value == row_count-1) || 
      (i_value == column_count-1) ) {
    if (matrix[index_i][val].player_id != null) {
      if(matrix[index_i][val].count >= 2 || matrix[index_i][val].player_id != player_turn){
        if (matrix[index_i][val].count == 2 && matrix[index_i][val].player_id == player_turn) {
          chain_reaction(i_value, j_value);
          reset_cell(i_value, j_value);
          switch_player_turn();
        }
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
        if (matrix[index_i][val].count == 3 && matrix[index_i][val].player_id == player_turn) {
          reset_cell(i_value, j_value);
          chain_reaction(i_value, j_value);
          switch_player_turn();
        }
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

function reset_cell(i_value, j_value) {
  var ctx = canvas.getContext('2d');
  var index_i = parseInt(i_value*row_count + j_value);
  var val = i_value + '_' + j_value;
  matrix[index_i][val].count = 0;
  matrix[index_i][val].player_id = null;

  ctx.fillStyle = "#fff";
  ctx.fillRect((j_value*box.width) + lineWidth, (i_value*box.height)+ lineWidth, box.width-(2*lineWidth), box.height-(2*lineWidth));
}

// Main Logic
function chain_reaction(i_value, j_value) {
  up_value = {i: i_value - 1,j: j_value};
  down_value = {i: i_value + 1,j: j_value};
  left_value = {i: i_value,j: j_value -1};
  right_value = {i: i_value,j: j_value + 1};

  var id_index = null;
  for (let i = 0; i< player.length; i++) {
    if (player[i].id == player_turn) {
      id_index = i;
      break;
    }
  } 
  
  if (up_value.i >= 0 && up_value.j >= 0 && up_value.i < column_count && up_value.j < row_count) {
    display_chain_reaction(id_index, up_value);
  }

  if (down_value.i >= 0 && down_value.j >= 0 && down_value.i < column_count && down_value.j < row_count) {
    display_chain_reaction(id_index, down_value);
  }

  if (left_value.i >= 0 && left_value.j >= 0 && left_value.i < column_count && left_value.j < row_count) {
    display_chain_reaction(id_index, left_value);
  }

  if (right_value.i >= 0 && right_value.j >= 0 && right_value.i < column_count && right_value.j < row_count) {
    display_chain_reaction(id_index, right_value);
    check_matrix(right_value.j,right_value.i);
  }
 
}

function display_chain_reaction (player_id, index_value) {
  var ctx = canvas.getContext('2d');

    ctx.fillStyle = player[player_id].color;
    ctx.fillRect((index_value.j*box.width) + lineWidth, (index_value.i*box.height)+ lineWidth, box.width-(2*lineWidth), box.height-(2*lineWidth));
    fill_matrix(index_value.j, index_value.i);
    ctx.fillStyle = player[player_id].text_color;
    ctx.font = "18pt sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(matrix[parseInt(index_value.i*row_count + index_value.j)][index_value.i+ '_' + index_value.j].count, ((index_value.j+1)*(box.width)) -20, ((index_value.i+1)*(box.height)) -12);
}

function fill_matrix(j_value, i_value) {
  var value = i_value + '_' + j_value;
  var index_i = parseInt(i_value*column_count + j_value);
  var key_name = Object.keys(matrix[index_i]);
  matrix[index_i][key_name].value = true;
  matrix[index_i][key_name].count++;
  matrix[index_i][key_name].player_id = player_turn;
}

function reset() {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    matrix = [];
    document.getElementById('player_name').innerHTML = player[0].name + " turn";
    document.getElementById('player_name').style.color = player[0].color;
    player_turn = player[0].id;
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