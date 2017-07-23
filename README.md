# matching-game
This is a simple memory game. The player has to match pairs of tiles, displaying the same image. If the image is different, the tiles turn back, otherwise they remain opened. Upon opening all pairs the player will see a modal, displaying the game performance.

## Gameplay
Upon starting the game, the user is prompted to select one of three game modes. This determines the types of values they have to match inside of the tiles.
After completing a session the user is greeted with a modal, detailing their performance, including time taken, number of moves, stars (between 1 and 3, based on moves) and the name of the difficulty they had chosen.

## Logo
You can find the game logo as a favicon in the main directory. Further icons for different sizes are grouped in the folder "icons".

## How to contribute
If you've found any mistakes, or have optimization suggestions, please clone this repository, edit it locally and then submit a pull request.

1. Open a terminal and navigate to a folder of your choice. Then paste in the following:
```
git clone https://github.com/evgeni-chankov/matching-game
```
2. After you have edited the files and pushed thenm to your copy, please issue a [pull request](https://help.github.com/articles/creating-a-pull-request/).

## Dependencies
The game uses two separate [google fonts](https://fonts.googleapis.com/css?family=Quicksand:300%7CYanone+Kaffeesatz:300):
1.  Quicksand
    -   used for headings
2.  Yanone Kaffeesatz
    -   used for text

In addition, all tile images are [Font Awesome icons](http://fontawesome.io/icons/).

## Future Developments
- include an OMG mode (hardest difficulty, including a countdown timer, instead of a regular one.)
- various effects based on progressing time and player performance
- additional tile content

## Licence
The contents of this repository are covered under the [MIT License](LICENCE.md).

## To play
http://evgeni-chankov.github.io
