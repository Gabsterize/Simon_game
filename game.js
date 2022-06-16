alert("Hello");

var buttonColours = ["red", "green", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$("body").keydown(function(){

    if (started == false){

        $("h1").text("Level " + level)
        nextSequence();
        started = true;
    }});


$(".btn").click(function() {
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);

   pattern(userClickedPattern.length - 1);
});


function pattern(CurrentLevel){


    if (gamePattern[CurrentLevel] === userClickedPattern[CurrentLevel]){
        if (userClickedPattern.length === gamePattern.length){
             setTimeout(function() {
                nextSequence();
               }, 2000);
            console.log("right");
            
        }}
    else{
           $("h1").text("Game over. Press any key to restart");
           console.log("wrong");
           $("body").addClass("game-over");
           setTimeout(function() {
            $("body").removeClass("game-over");
           }, 500);

           var Wrong = new Audio('sounds/wrong.mp3');
           Wrong.play();

           restart();
           
        }
    };

function nextSequence() { 

    userClickedPattern = []; 
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
   
};



function playSound(name){

    var Colour = new Audio('sounds/' + name + '.mp3');
    Colour.play();

};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $(".btn").removeClass("pressed");
      }, 100);

};

function restart(){
    level = 0;
    gamePattern = [];
    started = false;
}