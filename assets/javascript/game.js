var goal = "";
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
var guess = "";
var alaphabet = "abcdefghijklmnopqrstuvwxyz";

// Let's start by grabbing a reference to the <span> below.
setGoal();
// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function(event) {

    var userText = document.getElementById("KeyPress");
    
    userText.textContent = event.key;
    guess = event.key.toLowerCase();
    if(used.add(guess)){
        alert(event.key + "has already been guessed");    
    }else{
        
    };
};

//Get the mystery word
function setGoal(){
    goal = "alligator"
}

//check if the letter is already used
//check if the letter is in the word
//update the word
//update the image
//update scores


