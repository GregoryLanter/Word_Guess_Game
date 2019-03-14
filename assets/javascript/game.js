/*document.addEventListener("load", function(){*/
$(document).ready(function() {
    var guess = "";
    var alaphabet = "abcdefghijklmnopqrstuvwxyz";
    var teams = ["Bruins", "Sabres", "Red Wings", "Panthers", "Canadiens", "Senators", "Lightning", "Leafs", "Hurricanes", "BlueJackets", "Devils", "Islanders", "Rangers", "Flyers", "Penguins", "Capitals", "Blackhawks", "Avalanche", "Stars", "Wild", "Predators", "Blues", "Jets", "Ducks", "Coyotes", "Flames",	"Oilers", "Kings", "Sharks", "Canucks", "Knights", "Seattle"]
    var goal = {
        pname:[],
        displayStr: "",
        winner:  true,
        wins: 0,
        guessCount: 0,
    //Get the mystery word
        init:function(){
            var letters = 0;
            var teamName = "";
    
            teamName = teams[Math.floor(Math.random()*32)];    
            alert(teamName);
            for(letters=0; letters< teamName.length; letters++){ 
                var letter = {
                    value: "",
                    guessed: false
                };     
                letter.value = teamName.substring(letters, letters+1);
                goal.add(letter);     
            };
            goal.guessCount = goal.length + 6;

            goal.display();
        },
        isWin: function(){
            if(goal.winner){
                alert("You Win");
                goal.wins++;
                updateHtml("wins", goal.wins);
                /* var winLink = document.getElementById("wins");
                winLink.innerText = "Wins "+ goal.wins; */
            }
        },
        display: function(){
            var teamLink = document.getElementById("goal");
            goal.displayStr = "";
            goal.winner = true;
            goal.displayStr = "";
            goal.pname.forEach(function(elem){
                if(elem.guessed){
                    goal.displayStr = goal.displayStr + elem.value;
                }else{
                    goal.displayStr = goal.displayStr + "_ ";
                }
                goal.winner = goal.winner && elem.guessed;
            });
            teamLink.innerText = goal.displayStr;
        },
        add: function(letter){
            this.pname.push(letter);
        },
        check: function(char){
            var newTrue = false;
            goal.pname.forEach(function(elem){
                if(elem.value.toLowerCase() == char){
                    elem.guessed = true;
                    newTrue = true;
                };
            });
            if(!newTrue){
                goal.guessCount --;
                updateHtml("guess",goal.guessCount)
            };
        },
        setGoal(char){
            var name;
            var guessesLink = document.getElementById("guess")
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
    var used = {
        Letter:[],
        add: function(guess) {
            if(alaphabet.search(guess) > 0){
            this.Letter[this.Letter.length] = guess;
            return true;
            }else{
                return false;
            }
        }
    };


    document.onkeyup = function(event) {

        var userText = event.key.toLowerCase;
        guess = event.key.toLowerCase();
        goal.check(guess);
        goal.display();
        goal.isWin();
        /*teamLink.innerText = goal.displayStr;*/
    };


    function setGuessCount(guessCount){
        updateHTML("guess", guessCount);
    };
    function updateHtml(tag, update){
        var Link = document.getElementById(tag);
        Link.innerText = update;
    };
    goal.setGoal();
})
//check if the letter is already used
//check if the letter is in the word
//update the word
//update the image
//update scores

