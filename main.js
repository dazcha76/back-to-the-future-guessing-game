$(document).ready(init);

function init(){
  document.getElementById("theme").play();
  $('.skip').click(removeModal)
  $('button').click(make_guess);
  $('.game_area').hide();
  pick_number();
  intro(); 
}

var the_number = null;
var guesses = 0;

var theme = 'sounds/themesong.mp3';

var sounds = [
  'sounds/peel_out.mp3',
  'sounds/damn.mp3', 
  'sounds/damndamn.mp3',
  'sounds/thinkmcfly.mp3',
]; 

function playSound(soundIndex){
  var sound = sounds[soundIndex];
  var player = new Audio( sound );
  player.play();
}

function intro(){
  showText(0);
  setTimeout(emptyH1, 6000);
  setTimeout(function(){
    showText(1)
  }, 6000);
  setTimeout(emptyH1, 11000);
  setTimeout(function(){
    showText(2)
  }, 11000);
  setTimeout(emptyH1, 16000);
  setTimeout(function(){
    showText(3)
  }, 16000);
  setTimeout(emptyH1, 19000);
  setTimeout(backToTheFuture, 19000);
  setTimeout(removeModal, 22000);
}

function showText(introIndex) {
  var introText = [
    "marty has corrected the changes to the space time continuum and has to return to 1985, but the delorean is out of plutonium.",
    "guess the right number between 1 and 10 to help power the delorean with 1.21 gigawatts.",
    "you have 3 chances to guess the correct number or he will be stuck here in 1955.",
    "i'm counting on you to help me send marty..."
  ];
  $('.intro_modal').addClass('flex');
  $('#intro').text(introText[introIndex].toUpperCase());
}

function emptyH1(){
  $('h1').empty();
}

function backToTheFuture(){
  var back = $('<img>').attr('src', 'images/back.png').addClass("back");
  var future = $('<img>').attr('src', 'images/future.png').addClass("future");
  $('.intro_modal').empty().removeClass('flex').append(back, future).css({'text-align': 'center', 'margin-top': '10vh', 'padding': '5%'});
}

function removeModal(){
  $('.intro_modal').hide();
  $('.game_area').show();
  $('#guess_input').focus();
  document.getElementById("theme").pause();
}

function pick_number(){
  var random_number = Math.floor((Math.random()*10)+1);
  the_number = random_number;
  console.log(the_number)
  return the_number;
}

function make_guess(){
  var the_guess = $('#guess_input').val();
  var numGuess = Number(the_guess);

  if(numGuess < 1 || numGuess > 10 || the_guess.match(/[a-zA-Z]/)){
    $('#response_div').text("THAT'S INVALID!");
  } else {
    guesses++
    if(numGuess === the_number){
      $('#response_div').text("YOU WIN!");
      $('.delorean_container').addClass('animate_car');
      playSound(0);
      $('input').prop("disabled", true);
    } else {
      $('#guess_input').val("");
      $('#guess_input').focus();
      if(numGuess < the_number){
        $('#response_div').text("TOO LOW!")
      } else if(numGuess > the_number){
        $('#response_div').text("TOO HIGH!")
      }

      if(guesses === 1){
        playSound(1);
      } else if(guesses === 2){
        playSound(2);
      } else if(guesses === 3){
        playSound(3);
        $('#response_div').text("YOU LOSE!");
        $('input').prop("disabled", true).val('X');
      }
    }
  } 
}

