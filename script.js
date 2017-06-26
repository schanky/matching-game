 //Initialize variables
var memoryArray = ['fa fa-motorcycle','fa fa-motorcycle','fa fa-bath','fa fa-bath','fa fa-car','fa fa-car','fa fa-bell-o','fa fa-bell-o','fa fa-bug','fa fa-bug','fa fa-bomb','fa fa-bomb','fa fa-university','fa fa-university','fa fa-key','fa fa-key'];
//Temporary array keeping track of tile values being clicked; emptied after every turn
var memoryValues = [];
//Temporary array keeping track of tile ids being clicked; emptied after every turn
var memoryTileIds = [];
//Variable keeping track of successfully opened tile pairs
var tilesFlipped = 0;
//Variable keeping track of number of turns made
var turns = 0;

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
    randomizeCardTypes(memoryArray);
    for(var i=0; i < memoryArray.length; i++){
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memoryArray[i]+'\')"></div>';
    }
    //autoRefreshDiv("#stars", );
    setInterval('showPerformance(turns)', 1000);
    // showPerformance(turns);
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
                if(tilesFlipped == memoryArray.length){
                    alert("Board cleared. Generating new board...");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
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
        console.log("Turns equals " + turns + " so we are showing three stars.");
    }
    else if (turns > 10 && turns <= 14) {
        //show two stars and one empty star
        document.getElementById('stars').innerHTML = '<ul><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li></ul>';
        console.log("Turns equals " + turns + " so we are showing two stars.");
    }
    else {
        //show one star and two empty stars
        var insertStars = document.getElementById('stars').innerHTML = '<ul><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star-o" aria-hidden="true"></i></li><li><i class="fa fa-star" aria-hidden="true"></i></li></ul>';
        console.log("Turns equals " + turns + " so we are showing one star.");
    }
}

//Refresh game data div every second
function autoRefreshDiv(divName, functionName) {
    $(divName).load(functionName);
    console.log("Refreshed game data!");
}