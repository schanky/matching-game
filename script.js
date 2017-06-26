//Initialize variables easy difficulty
var memoryArray = ['fa fa-motorcycle','fa fa-motorcycle','fa fa-bath','fa fa-bath','fa fa-car','fa fa-car','fa fa-bell-o','fa fa-bell-o','fa fa-bug','fa fa-bug','fa fa-bomb','fa fa-bomb','fa fa-university','fa fa-university','fa fa-key','fa fa-key'];
//Initialize variables medium difficulty
//var memoryArrayMedium = ['fa fa-motorcycle', 'fa fa-motorcycle', 'fa fa-bath', 'fa fa-bath', 'fa fa-car', 'fa fa-car', 'fa fa-bell-o', 'fa fa-bell-o', 'fa fa-bug', 'fa fa-bug', 'fa fa-bomb', 'fa fa-bomb', 'fa fa-university', 'fa fa-university', 'fa fa-key', 'fa fa-key'];
//Initialize variables hard difficulty
//var memoryArrayHard = ['fa fa-motorcycle', 'fa fa-motorcycle', 'fa fa-bath', 'fa fa-bath', 'fa fa-car', 'fa fa-car', 'fa fa-bell-o', 'fa fa-bell-o', 'fa fa-bug', 'fa fa-bug', 'fa fa-bomb', 'fa fa-bomb', 'fa fa-university', 'fa fa-university', 'fa fa-key', 'fa fa-key'];
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

//Create shuffle method and assign to Array objects
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

//Create new board
function newBoard(){
    tilesFlipped = 0;
    var output = '';
    turns = 0;
    stars = 3;
    countTimer();
    randomizeCardTypes(memoryArray);
    for(var i=0; i < memoryArray.length; i++){
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memoryArray[i]+'\')"></div>';
    }
    setInterval('showPerformance(turns)', 1000);
    document.getElementById('memory_board').innerHTML = output;
}

//Create flip tile function
function memoryFlipTile(tile, val){
    if(tile.innerHTML == '' && memoryValues.length < 2){
        tile.style.background = '#00BCC0';
        tile.style.transition = 'background 0.1s ease-in 0s';
        val = '<div><i class="'+val+'" aria-hidden="true" style="color:#fff;"></i></div>';
        tile.innerHTML = val;
        if(memoryValues.length == 0){
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
        }else if(memoryValues.length == 1){
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
            //If the last two flipped cards are the same
            if(memoryValues[0] == memoryValues[1]){
                tilesFlipped += 2;
                turns += 1;
                console.log("Successful turn! We add one to turns, to a total of: "+turns);
                //Empty both arrays
                memoryValues = [];
                memoryTileIds = [];
                //Check to see if whole board is cleared
                if (tilesFlipped == memoryArray.length) {
                    clearInterval(timerVar);
                    var achievedTime = clock.innerHTML;
                    console.log(achievedTime);
                    console.log(stars);
                    var finished = confirm("Board cleared in "+achievedTime+" and with "+stars+" stars. Would you like to play again or stay for a bit on this screen and revel in your awesomeness?");
                    if (finished) {
                        document.getElementById('memory_board').innerHTML = "";
                        location.reload(true);
                        newBoard();
                    }
                }
            //If the last two flipped cards are not the same, flip them back over
            } else {
                function flipToBack(){
                    var firstTile =document.getElementById(memoryTileIds[0]);
                    var secondTile = document.getElementById(memoryTileIds[1]);
                    firstTile.style.background = '#2B3E4A';
                    firstTile.innerHTML = '';
                    secondTile.style.background = '#2B3E4A';
                    secondTile.innerHTML = '';
                    turns += 1;
                    console.log("Unsuccessful turn! Adding one to turns to a total of: "+turns);
                    //Empty both arrays
                    memoryValues = [];
                    memoryTileIds = [];
                }
                setTimeout(flipToBack, 700);
            }
        }
    }
}

//Manage player performance
function showPerformance(turns) {
    if (turns <= 10) {
        //show three stars
        document.getElementById('stars').innerHTML = '<ul><li><i class="fa fa-star" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li></ul>';
        document.getElementById('moves').innerHTML = turns +' Moves';
        console.log("Turns equals " + turns + " so we are showing three stars.");
        stars = 3;
    }
    else if (turns > 10 && turns <= 14) {
        //show two stars and one empty star
        document.getElementById('stars').innerHTML = '<ul><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li></ul>';
        document.getElementById('moves').innerHTML = turns + ' Moves';
        console.log("Turns equals " + turns + " so we are showing two stars.");
        stars = 2;
    }
    else {
        //show one star and two empty stars
        var insertStars = document.getElementById('stars').innerHTML = '<ul><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li></ul>';
        document.getElementById('moves').innerHTML = turns + ' Moves';
        console.log("Turns equals " + turns + " so we are showing one star.");
        stars = 1;
    }
}

//start timer countdown (not completely functional yet)
//TODO: implement countdown option
var time = 60 * 1;
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
}

//Regular time counter
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds /3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    var seconds = totalSeconds - (hour*3600 + minute*60);
    var clock = hour + ":" + minute + ":" + seconds;
    document.getElementById("clock").innerHTML = clock;// to add in case of required pause or stop functionlity + ' ' +'<i class="fa fa-pause-circle-o" aria-hidden="true" onclick="clearInterval(timerVar);"></i>'
    return clock;
}

//Refresh game data div every second
function autoRefreshDiv(divName, functionName) {
    $(divName).load(functionName);
    console.log("Refreshed game data!");
}