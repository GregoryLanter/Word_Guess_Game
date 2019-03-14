/*document.addEventListener("load", function(){*/
$(document).ready(function() {
    var guess = "";
    var alaphabet = "abcdefghijklmnopqrstuvwxyz";
    var teams = ["Bruins", "Sabres", "RedWings", "Panthers", "Canadiens", "Senators", "Lightning", "Leafs", "Hurricanes", "BlueJackets", "Devils", "Islanders", "Rangers", "Flyers", "Penguins", "Capitals", "Blackhawks", "Avalanche", "Stars", "Wild", "Predators", "Blues", "Jets", "Ducks", "Coyotes", "Flames", "Oilers", "Kings", "Sharks", "Canucks", "Knights", "Seattle"]
    var goal = {
        pname:[],
        displayStr: "",
        winner:  true,
        wins: 0,
        guessCount: 0,
        usedLetter: "",
    //Get the mystery word
        init:function(){
            var letters = 0;
            var teamName = "";
            /*goal.pname.forEach(function(elem){
                goal.pname.pop();
                alert(goal.pname.length);
            });*/
            for(var i = 0; i != goal.pname.length && goal.pname.length !=0;){
                goal.pname.pop();
                /*alert(goal.pname.length);*/
            }
            teamName = teams[Math.floor(Math.random()*32)];    
            /*alert(teamName);*/
            /*goal.setGoal();*/
            for(letters=0; letters< teamName.length; letters++){ 
                var letter = {
                    value: "",
                    guessed: false
                };  
                letter.value = teamName.substring(letters, letters+1);
                goal.add(letter);     
            };
            goal.guessCount = 8;
            updateHtml("guess", 8);
            goal.usedLetter = "";
            updateHtml("used", "*");
            goal.display();
            updateHtml("songTitle", "");
            document.getElementById("pic").src = "assets\\images\\nhl.png";
        },
        isWin: function(){
            if(goal.winner){
                updateHtml("songTitle", "Brass Bonaza by Jack Say")
                var song = document.getElementById("myAudio");
                song.load();

                song.setAttribute("volume", 200);

                song.play;    
                /*alert("You Win");*/
                goal.wins++;
                updateHtml("wins", "Wins: " + goal.wins);
                goal.guessCount = 0;
                document.getElementById("pic").src = "assets\\images\\" + goal.displayStr.toLowerCase() + ".png";
                /* var winLink = document.getElementById("wins");
                winLink.innerText = "Wins "+ goal.wins; */
            }
        },
        isLoss: function(){
            if(goal.guessCount == 0){
                updateHtml("guess", "Out of guesses.")
                goal.pname.forEach(function(elem){
                    elem.guessed = true;
                })
                goal.display;
            }
        },
        display: function(){
            /* var teamLink = document.getElementById("goal"); */
            goal.displayStr = "";
            if(goal.guessCount > 0){
                goal.winner = true;
            }
            goal.displayStr = "";
            goal.pname.forEach(function(elem){
                if(elem.guessed){
                    goal.displayStr = goal.displayStr + elem.value;
                }else{
                    goal.displayStr = goal.displayStr + "_ ";
                }
                goal.winner = goal.winner && elem.guessed;
            });
            updateHtml("goal", goal.displayStr)
            /*teamLink.innerText = goal.displayStr;*/
        },
        add: function(letter){
            this.pname.push(letter);
        },
        check: function(char){
            var newTrue = false;
            if(alaphabet.indexOf(char) >= 0){
                goal.pname.forEach(function(elem){
                    if(elem.value.toLowerCase() == char){
                        elem.guessed = true;
                        newTrue = true;
                    };
                });
                if(!newTrue){
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
        updateUsed(char){
            var name;
            var guessesLink = document.getElementById("used")
            name = guessesLink.innerText;
            if(name == "*"){
                name = char;    
            }else{
                name = name + " " + char
                /*guessedLink.innerText = guessedLink.innerText + " " + event.key;
                updateHTML("guess", )*/
            }   
            updateHtml("used", name);
        }
    };
/*    var used = {
        Letter:[],
        add: function(guess) {
            if(alaphabet.search(guess) > 0){
            this.Letter[this.Letter.length] = guess;
            return true;
            }else{
                return false;
            }
        }
    }; */


    document.onkeyup = function(event) {
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


    function setGuessCount(guessCount){
        updateHtml("guess", guessCount);
    };
    function updateHtml(tag, update){
        var Link = document.getElementById(tag);
        Link.innerText = update;
    };
    goal.init();
})
//check if the letter is already used
//check if the letter is in the word
//update the word
//update the image
//update scores

