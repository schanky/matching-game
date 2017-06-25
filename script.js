 //Initialize variables
var memoryArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
var memoryValues = [];
var memoryTileIds = [];
var tilesFlipped = 0;

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
    document.getElementById('memory_board').innerHTML = output;
}

//Create flip tile function
function memoryFlipTile(tile, val){
    if(tile.innerHTML == '' && memoryValues.length < 2){
        tile.style.background = '#00BCC0';
        tile.style.transition = 'background 0.1s ease-in 0s';
        
        /*tile.style.background = '#00BCC0';*/
        tile.innerHTML = val;
        if(memoryValues.length == 0){
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
        }else if(memoryValues.length == 1){
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
            if(memoryValues[0] == memoryValues[1]){
                tilesFlipped += 2;
                //Empty both arrays
                memoryValues = [];
                memoryTileIds = [];
                //Check to see if whole board is cleared
                if(tilesFlipped == memoryArray.length){
                    alert("Board cleared. Generating new board...");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flipToBack(){
                    //If the tiles are not the same flip them back over
                    var firstTile =document.getElementById(memoryTileIds[0]);
                    var secondTile = document.getElementById(memoryTileIds[1]);
                    firstTile.style.background = '#2B3E4A';
                    firstTile.innerHTML = '';
                    secondTile.style.background = '#2B3E4A';
                    secondTile.innerHTML = '';
                    //Empty both arrays
                    memoryValues = [];
                    memoryTileIds = [];
                }
                setTimeout(flipToBack, 700);
            }
        }
    }
}