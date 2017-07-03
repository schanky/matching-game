//Initialize variables regular difficulty
var memoryArrayEasy = ['fa fa-motorcycle','fa fa-motorcycle','fa fa-bath','fa fa-bath','fa fa-car','fa fa-car','fa fa-bell-o','fa fa-bell-o','fa fa-bug','fa fa-bug','fa fa-bomb','fa fa-bomb','fa fa-university','fa fa-university','fa fa-key','fa fa-key'];
//Initialize variables touchy feely difficulty
var memoryArrayTouchy = ['fa fa-handshake-o', 'fa fa-handshake-o', 'fa fa-hand-lizard-o', 'fa fa-hand-lizard-o', 'fa fa-hand-scissors-o', 'fa fa-hand-scissors-o', 'fa fa-hand-o-left', 'fa fa-hand-o-left', 'fa fa-hand-o-right', 'fa fa-hand-o-right', 'fa fa-hand-peace-o', 'fa fa-hand-peace-o', 'fa fa-hand-spock-o', 'fa fa-hand-spock-o', 'fa fa-hand-paper-o', 'fa fa-hand-paper-o'];
//Initialize variables marriage wars difficulty
var memoryArrayMarriage = ['fa fa-mars-stroke', 'fa fa-mars-stroke', 'fa fa-mars-stroke-h', 'fa fa-mars-stroke-h', 'fa fa-mars-stroke-v', 'fa fa-mars-stroke-v', 'fa fa-mercury', 'fa fa-mercury', 'fa fa-venus-mars', 'fa fa-venus-mars', 'fa fa-mars-double', 'fa fa-mars-double', 'fa fa-neuter', 'fa fa-neuter', 'fa fa-transgender', 'fa fa-transgender'];
//Initialize variables hard difficulty
var memoryArrayOmg = ['fa fa-motorcycle', 'fa fa-motorcycle', 'fa fa-bath', 'fa fa-bath', 'fa fa-car', 'fa fa-car', 'fa fa-bell-o', 'fa fa-bell-o', 'fa fa-bug', 'fa fa-bug', 'fa fa-bomb', 'fa fa-bomb', 'fa fa-university', 'fa fa-university', 'fa fa-key', 'fa fa-key'];
//Temporary array keeping track of tile values being clicked; emptied after every turn
var memoryValues = [];
//Temporary array keeping track of tile ids being clicked; emptied after every turn
var memoryTileIds = [];
//Variable keeping track of successfully opened tile pairs
var tilesFlipped = 0;
//Variable keeping track of number of turns made
var turns = 0;
//Variable showing player performance in terms of stars
var stars = 3;
//Variables for the timer
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
var startClock = true;
var startClockOnPlayerClick = [];
//Save game difficulty in a variable
var gameDifficulty = getGameMode();

/**
 * @description Determines game mode
 */
function getGameMode() {
    var gameDifficulty = document.getElementById("game-options").value;
    document.getElementById("show-difficulty").innerHTML = gameDifficulty;
	console.log('Game difficulty is defined as: '+gameDifficulty);
	return gameDifficulty;
}

/**
 * @description Method used to shuffle an array of objects randomly.
 * @param {array} aCardArraz - any of the available arrays related to the different game modes
 */
function randomizeCardTypes(aCardArray) {
    var currentIndex = aCardArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = aCardArray[currentIndex];
        aCardArray[currentIndex] = aCardArray[randomIndex];
        aCardArray[randomIndex] = temporaryValue;
        }
    console.log("Cards have been randomized.");
    return aCardArray;
}

/**
 * @description Determines which array will be used in the shuffle function
 * Depends on chosen game mode on introduction screen.
 * @param {string} gameMode - This is the chosen game mode from the introduction screen
 */
function determineMemoryArray(gameMode){
	if(gameMode == 'regular'){
		memoryArray = memoryArrayEasy;
	} else if(gameMode == 'touchy-feely'){
		memoryArray = memoryArrayTouchy;
	} else if(gameMode == 'marriage-wars') {
		memoryArray = memoryArrayMarriage;
	} else{
		memoryArray = memoryArrayOmg;// TODO: add OMG play mode
	}
	return memoryArray;
}

/**
 * @description The main function being called at the end of the html page.
 * It generates a new board based on the chosen game mode and array respectively.
 */
function newBoard(){
    tilesFlipped = 0;
    var output = '';
    turns = 0;
    stars = 3;
	//var gameMode = getGameMode();
	var gameMode = document.getElementById('show-difficulty').innerHTML;
	console.log('newBoard ran and gameMode is '+ gameMode);
	memoryArray = determineMemoryArray(gameMode);
	console.log('based on the chosen game mode, the memory array is: '+ memoryArray);
    randomizeCardTypes(memoryArray);
    for(var i=0; i < memoryArray.length; i++){
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memoryArray[i]+'\');"></div>';
    }
	setInterval('showPerformance(turns)', 100);
    document.getElementById('memory_board').innerHTML = output;
	return gameMode;
}

/**
 * @description Used to empty current board upon completion, as well as generating a new board.
 */
function reloadBoard(){
	document.getElementById('memory_board').innerHTML = "";
    location.reload(true);
    newBoard();
}

/**
 * @description Used to display a modal based on use case.
 * Use case 1: The user is greeted with an introduction screen, allowing them to choose a game mode.
 * Use case 2: The user completes a game and is shown their performance in a modal.
 * @param {string} achievedTime - The time it took the user to complete the session.
 * @param {int} numberStars - The amount of remaining stars upon session completion.
 * @param {int} numberMoves - The amount of moves the user took in order to complete the game.
 * @param {string} gameDifficulty - The chosen difficulty at game start.
 */
function showModal(achievedTime, numberStars, numberMoves, gameDifficulty){
	var modal = document.getElementById('display_performance').style.display = "block";
	document.getElementById('modal-body').innerHTML = 'Board cleared in '+achievedTime+' and with '+numberStars+' stars on '+gameDifficulty+' difficulty. You made '+numberMoves+' moves.';
}

/**
 * @description Close modal after displaying gamer performance in current session
 */
function closeModal(){
	document.getElementById('display_performance').style.display = "none";
}

/**
 * @description Close the modal used at game start to choose game difficulty
 */
function closeModeModal(){
	document.getElementById('get_playing_mode').style.display = "none";
}

/**
 * @description Used to display correct choice animation upon choosing two tiles.
 * @param {string} tileId1
 * @param {string} tileId2 
 */
function animateCorrect(tileId1, tileId2){
	document.getElementById(tileId1).className += ' tile-correct';
	document.getElementById(tileId2).className += ' tile-correct';
}

/**
 * @description Used to display wrong choice animation upon choosing two tiles.
 * @param {string} tileId1
 * @param {string} tileId2 
 */
function animateWrong(tileId1, tileId2){
	document.getElementById(tileId1).className += ' tile-wrong';
	document.getElementById(tileId2).className += ' tile-wrong';
}

/**
 * @description Used to check if an element has a certain class.
 * @param {string} el - the element to check
 * @param {string} className  
 */
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

/**
 * @description Used to add a class to an element.
 * @param {string} el - the element to check
 * @param {string} className  
 */
function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

/**
 * @description Used to remove a class from an element.
 * @param {string} el - the element to check
 * @param {string} className  
 */
function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

/**
 * @description This function uses the three previously described functions
 * to determine whether to add or remove a defined class from a tile.
 * This is used in order to solve adding and removing the same class to a tile
 * after the user selects it wrongly multiple times.
 * @param {string} el1 - the element to check
 * @param {string} el2 - className  
 */
function addOrRemoveClass(el1,el2){
	if(hasClass(el1, 'tile-wrong')){
		addClass(el1,'tile-wrong');
		setTimeout(function() {
		removeClass(el1,'tile-wrong');
		}, 1000);
		console.log("Removed and added tile-wrong to first tile");
	} else if (hasClass(el2, 'tile-wrong')) {
		addClass(el2,'tile-wrong');
		setTimeout(function() {
		removeClass(el2,'tile-wrong');
		}, 1000);
		console.log("Removed and added tile-wrong to second tile");
	} else {
		addClass(el1,'tile-wrong');
		setTimeout(function() {
		removeClass(el1,'tile-wrong');
		}, 1000);
		
		addClass(el2,'tile-wrong');
		setTimeout(function() {
		removeClass(el2,'tile-wrong');
		}, 1000);
		console.log("Added tile-wrong to first and second tile");
	}
}

/**
 * @description Used to turn both chosen tiles back after determining they dont have the same value.
 */
function flipToBack(){
	var firstTile = document.getElementById(memoryTileIds[0]);
	var secondTile = document.getElementById(memoryTileIds[1]);
	addOrRemoveClass(firstTile,secondTile);
	firstTile.style.background = '#2B3E4A';
	firstTile.innerHTML = '';
	secondTile.style.background = '#2B3E4A';
	secondTile.innerHTML = '';
	turns += 1;
	//console.log("Unsuccessful turn! Adding one to turns to a total of: "+turns);
	//Empty both arrays
	memoryValues = [];
	memoryTileIds = [];
}

/**
 * @description Used to flip two consecutive tiles, determine if they contain the same value
 * and keep them opened if they do. If not, the previous function is called (flipToBack). It keeps going 
 * until all pairs have been flipped. Then it displays a summary of session performance. 
 * @param {string} tile - contains the tile id of the chosen (flipped) tile.
 * @param {string} val - value is the font-awesome icon class used in the respective array  
 */
function memoryFlipTile(tile, val){
    if(tile.innerHTML == '' && memoryValues.length < 2){
        tile.style.background = '#00BCC0';
        tile.style.transition = 'background 0.1s ease-in 0s';
        val = '<div><i class="'+val+'" aria-hidden="true" style="color:#fff;"></i></div>';
        tile.innerHTML = val;
        if(memoryValues.length == 0){
            memoryValues.push(val);
			startClockOnPlayerClick.push(val);
            memoryTileIds.push(tile.id);
        }else if(memoryValues.length == 1){
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
            //If the last two flipped cards are the same
            if(memoryValues[0] == memoryValues[1]){
                tilesFlipped += 2;
                turns += 1;
				animateCorrect(memoryTileIds[0],memoryTileIds[1]);
                //Empty both arrays
                memoryValues = [];
                memoryTileIds = [];
                //Check to see if whole board is cleared
                if (tilesFlipped == memoryArray.length) {
                    clearInterval(timerVar);
                    var achievedTime = clock.innerHTML;
					var gameDifficulty = document.getElementById('show-difficulty').innerHTML;
					showModal(achievedTime,stars,turns,gameDifficulty);
                }
            //If the last two flipped cards are not the same, flip them back over
            } else {
                setTimeout(flipToBack, 500);
            }
        }
    }
}

/**
 * @description Displays a message based on number of turns taken to complete current board.
 * @param {int} turns 
 */
function showPerformance(turns) {
    if (turns <= 10) {
        //show three stars
        document.getElementById('stars').innerHTML = '<ul><li><i class="fa fa-star" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li></ul>';
        document.getElementById('moves').innerHTML = turns +' Moves';
        //console.log("Turns equals " + turns + " so we are showing three stars.");
        stars = 3;
    }
    else if (turns > 10 && turns <= 14) {
        //show two stars and one empty star
        document.getElementById('stars').innerHTML = '<ul><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li></ul>';
        document.getElementById('moves').innerHTML = turns + ' Moves';
        //console.log("Turns equals " + turns + " so we are showing two stars.");
        stars = 2;
    }
    else {
        //show one star and two empty stars
        var insertStars = document.getElementById('stars').innerHTML = '<ul><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li></ul>';
        document.getElementById('moves').innerHTML = turns + ' Moves';
        //console.log("Turns equals " + turns + " so we are showing one star.");
        stars = 1;
    }
}

/**
 * @description Used to display a countdown timer in the OMG game mode. Not entirely implemented yet.
 * Has to eventually be refactored, to avoid the closure.
 * TODO: implement this function in OMG mode.
 * @param {string} duration - countdown duration, or starting point.
 * @param {string} display - the name of the element in the DOM, the clock should be displayed in. 
 */
/*var time = 60 * 1;
var display = document.querySelector('#clock');
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        console.log(display.textContent);
    }, 1000);
}*/

/**
 * @description Starts counting time if control variable startClock is set to true and if the
 * startClockOnPlayerClick array is empty.
 */
function countTimer() {
	if(startClock && startClockOnPlayerClick.length > 0){
		++totalSeconds;
		var hour = Math.floor(totalSeconds /3600);
		var minute = Math.floor((totalSeconds - hour*3600)/60);
		var seconds = totalSeconds - (hour*3600 + minute*60).toFixed(2);
		var clock = minute + ":" + seconds; //To add if hours needed: hour + ":" +
		document.getElementById("clock").innerHTML = clock;// to add in case of required pause or stop functionlity + ' ' +'<i class="fa fa-pause-circle-o" aria-hidden="true" onclick="clearInterval(timerVar);"></i>'
		//console.log('countTimer function ran.');
		return clock;
	}
}
