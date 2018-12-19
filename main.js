$(document).ready(init);

function init(){
  pick_number();
  $('button').click(make_guess);
}

var the_number = null;

function pick_number(){
  var random_number = Math.floor((Math.random()*10)+1);
  the_number = random_number
  return the_number;
}

function make_guess(){
  var the_guess = Number($('#guess_input').val());

  if(the_guess === the_number){
    $('#response_div').text("You win!")
  } else if(the_guess < the_number){
    $('#response_div').text("Too low!")
  } else if(the_guess > the_number){
    $('#response_div').text("Too high!")
  }
}


