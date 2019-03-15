/*document.addEventListener("load", function(){*/
$(document).ready(function() {
    /*set my global scope variables*/
    var guess = "";
    /*string of alphabet used to check vaid input */
    var alaphabet = "abcdefghijklmnopqrstuvwxyz";
    /*list of teams that are words we are trying to find */
    var teams = ["Bruins", "Sabres", "RedWings", "Panthers", "Canadiens", "Senators", "Lightning", "Leafs", "Hurricanes", "BlueJackets", "Devils", "Islanders", "Rangers", "Flyers", "Penguins", "Capitals", "Blackhawks", "Avalanche", "Stars", "Wild", "Predators", "Blues", "Jets", "Ducks", "Coyotes", "Flames", "Oilers", "Kings", "Sharks", "Canucks", "Knights", "Seattle"]
    /*Goal is an object where the magic happens 
        pname is an array of Letter objects that makes up the word to guess
        displayStr a string we build to display 
        winner boolean used to test if the game is over and the user won
        guessCount used to count guesses and see if the user lost
        used letter is a list of letters that have been guessed */
    var goal = {
        pname:[],
        displayStr: "",
        winner:  true,
        wins: 0,
        guessCount: 0,
        usedLetter: "",
    
        //Get the program in the proper state to run
        init:function(){
            //reset the team we are guessing(teamname)
            //reset 
            var letters = 0;
            var teamName = "";

            //remove the letter objects from pname so we can start fresh
            for(var i = 0; i != goal.pname.length && goal.pname.length !=0;){
                goal.pname.pop();
            }
            /* Get the team name we are trying to guess*/
            teamName = teams[Math.floor(Math.random()*32)];    

            /* walk through the team name create a letter object for each letter in the name
            guessed should be false for all letters ecause the user has not made a guess yet */
            for(letters=0; letters< teamName.length; letters++){ 
                /* the declaration for the letter object has to be in the array
                if not we get an array (goal.pname) that has serveral pointers to the same object
                putting the declaration inside the loop gets us a new onject for each letter */
                var letter = {
                    value: "",
                    guessed: false
                };  
                /*set the letter value of the object*/
                letter.value = teamName.substring(letters, letters+1);

                /* add the letter object to the goal.pname array */
                goal.add(letter);     
            };
            // reset guess count to max 8 and update the screen
            goal.guessCount = 8;
            updateHtml("guess", 8);
            
            //set the used letter string to null and update the string 
            goal.usedLetter = "";
            updateHtml("used", "*");

            //display the underscores for each letter in the team name we are guessing
            goal.display();

            //clear the song name
            updateHtml("songTitle", "");

            // set the nhl logo back in out image while we are playing
            document.getElementById("pic").src = "assets\\images\\nhl.png";
        },
        isWin: function(){
            //text to see if we have a win if we do update the screena nd try to play a song
            if(goal.winner){

                //update html to shoe song title and play a song
                updateHtml("songTitle", "Brass Bonaza by Jack Say")

                //Increment win count and display updated count
                goal.wins++;
                updateHtml("wins", "Wins: " + goal.wins);

                /*set guess count to zero
                this is needed to restart the next game in the keep up event*/
                goal.guessCount = 0;
                
                //display the team logo of the team that was just guessed
                document.getElementById("pic").src = "assets\\images\\" + goal.displayStr.toLowerCase() + ".png";
            }
        },
        isLoss: function(){
            //check to see if the user is out of guesses
            //if they are display the whole team name we are guessing
            if(goal.guessCount == 0){
                //change guess count to out of guesses
                updateHtml("guess", "Out of guesses.")
                /*set all the letter objects guessed attribute to true so we can 
                  display the team name */
                goal.pname.forEach(function(elem){
                    elem.guessed = true;
                })

                //display the team name
                goal.display;
            }
        },
        display: function(){
            /* clear out the display string so that we can build it with our new string 
            and test to see if we have a winner
            we are doing both to save a loop through the word*/
            goal.displayStr = "";

            /*set gaol.winner to true to be used in the test for a winner
            as we step through the goal.pname array to build the display string
            check the guessed flag if all the guessed flags are true 
            WE HAVE A WINNER*/
            if(goal.guessCount > 0){
                goal.winner = true;
            }
            //reset the display string
            goal.displayStr = "";

            /*take each letter object in the goal.pname array and if the letter is guessed
            put the letter in the display string if it is not guessed yet put a underscore
            in the display string*/

            goal.pname.forEach(function(elem){
                if(elem.guessed){
                    goal.displayStr = goal.displayStr + elem.value;
                }else{
                    goal.displayStr = goal.displayStr + "_ ";
                }

                /*goal.winner comes into the loop as true 
                so a logical and will stay true if the letter has been guessed and thus if it is true
                at the end of the loop  WE HAVE A WINNER 
                if one of the letter objects have guessed set to false goal.winner will
                be set to false and we will keep playing*/
                goal.winner = goal.winner && elem.guessed;
            });
            //update the HTML with the updated goal.display screen
            updateHtml("goal", goal.displayStr)
        },
        //push letter object onto the pname array
        add: function(letter){
            this.pname.push(letter);
        },

        //check will check the letter entered in the key up event to see if it is in the teamname
        check: function(char){
            //initialize newtrue boolean variable
            var newTrue = false;

            //check to see if we have a valid key pressed
            //we only wat to deal with letters
            if(alaphabet.indexOf(char) >= 0){
                //once we are sure we have a valid letter see if it is in the teamname
                goal.pname.forEach(function(elem){
                    if(elem.value.toLowerCase() == char){
                        //we have a valid letter update the guessed attribute 
                        //of the letter object and set our new true variable to true
                        elem.guessed = true;
                        newTrue = true;
                    };
                });
                /*we are using new true to see if the letter was in the word
                we cannot use an else structure here or it will execute everytime the entered letter
                doesnt match the current letter witht he newtrue flag we work our way through the 
                whole word before declaring the letter is not in the word */
                if(!newTrue){
                    /*OH NO the letter is not in the word
                    update the used letter list and display it
                    decrement the count of remaining guesses and update the html
                    check to see if the game has been lost*/
                    if(goal.usedLetter.indexOf(char) == -1){
                        goal.usedLetter = goal.usedLetter + char;
                        goal.guessCount --;
                        updateHtml("guess",goal.guessCount)
                        goal.updateUsed(char);
                        goal.isLoss();
                    };
                }
            }
        },
        //update the list of used characters
        updateUsed(char){
            var name;
            var guessesLink = document.getElementById("used")
            name = guessesLink.innerText;
            //if this is the first guess replace the * with the letter
            //if not just append the letter
            if(name == "*"){
                name = char;    
            }else{
                name = name + " " + char
            
            }   
            updateHtml("used", name);
        }
    };

    // listener for keystrokes
    document.onkeyup = function(event) {
        /*if the guess count is zero start the game
        if it is not 0 convert the key to lowercase
        check it to see if it is in the word 
        update the screen based on our guess
        check to see if the user won the game*/
        if(goal.guessCount != 0) {
            var userText = event.key.toLowerCase;
            guess = event.key.toLowerCase();
            goal.check(guess);
            goal.display();
            goal.isWin();
        /*teamLink.innerText = goal.displayStr;*/
        }else{
            goal.init();
        }
    };

    /*generic function to update the HTML
    pass in the id tag and value and update the HTML document
    */

    function updateHtml(tag, update){
        var Link = document.getElementById(tag);
        Link.innerText = update;
    };

    /*Start the program */
    goal.init();
})

