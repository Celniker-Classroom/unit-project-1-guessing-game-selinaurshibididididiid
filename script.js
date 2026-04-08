//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];
let rangeValue = 3;

//Player Name
let playerName = prompt("Enter your name:");
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

//Date function
function time() {
    let now = new Date();

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[now.getMonth()];

    let day = now.getDate();

    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";

    let year = now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    return `${month} ${day}${suffix}, ${year} ${hours}:${minutes}:${seconds}`;
}

document.getElementById("date").textContent = time();

//clock
setInterval(function(){
    document.getElementById("date").textContent = time();
}, 1000);

//Play
document.getElementById("playBtn").addEventListener("click", function(){
    let radios = document.getElementsByName("level")
    let range = 3;

    for (let i=0; i < radios.length; i++){
        if(radios[i].checked){
            range = parseInt(radios[i].value);
        }
    }

    rangeValue = range;

    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    startTime = new Date().getTime();

    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
    document.getElementById("guess").value="";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    let levelRadios = document.getElementsByName("level");
    for (let i=0; i < levelRadios.length; i++) {
        levelRadios[i].disabled = true; 
    }
});

//guessing
document.getElementById("guessBtn").addEventListener("click", makeGuess);

function makeGuess(){
    let guessInput = document.getElementById("guess").value;
    let guess = parseInt(guessInput);

    if (isNaN(guess)){
        document.getElementById("msg").textContent = playerName + ", please enter a number";
        return;
    }

    if (guess < 1 || guess > rangeValue){
        document.getElementById("msg").textContent = playerName + ", stay within range";
        return;
    }

    guessCount++;

    let msg = "";

    if (guess > answer){
        msg = "too high";
    } else if (guess < answer){
        msg = "too low";
    } else {
        msg = "correct";
    }

    if (guess !== answer){
        let diff = Math.abs(guess - answer);

        if (diff <= 2){
            msg += " and hot";
        } else if (diff <= 5){
            msg += " and warm";
        } else {
            msg += " and cold";
        }
    }

    // correct guess
    if (guess === answer){
        totalWins++;
        totalGuesses += guessCount;
        scores.push(guessCount);
        winStreak++;

        let quality = "";
        if (guessCount <= 2){
            quality = " Amazing!";
        } else if (guessCount <= 5){
            quality = " Good job!";
        } else {
            quality = " Keep practicing!";
        }

        document.getElementById("msg").textContent =
            playerName + ", correct in " + guessCount + " guesses!" + quality + " Streak: " + winStreak;

        updateScore();
        updateTimers(new Date().getTime());

        document.getElementById("guessBtn").disabled = true;
        reset();
        return;
    }

    document.getElementById("msg").textContent = playerName + ", " + msg;
}

//give up btn
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function giveUp(){
    let score = rangeValue;

    totalWins++; 
    totalGuesses += score;

    scores.push(score);
    updateScore();
    updateTimers(new Date().getTime());

    winStreak = 0; 

    document.getElementById("msg").textContent = playerName + ", you gave up";

    document.getElementById("guessBtn").disabled = true;

    reset();
}

//scoring update
function updateScore(){
    document.getElementById("wins").textContent = "Total wins: " + totalWins;

    if (totalWins > 0){
        let avg = totalGuesses / totalWins;
        document.getElementById("avgScore").textContent = "Average Score: " + avg;
    }

    scores.sort(function(a,b){ return a-b });

    let list = document.getElementsByName("leaderboard");

    for (let i = 0; i < list.length; i++){
        if (scores[i] !== undefined){
            list[i].textContent = scores[i];
        } else {
            list[i].textContent = "--";
        }
    }
}

//timers
function updateTimers(endMs){
    let elapsed = (endMs - startTime) / 1000;

    gamesPlayed++;
    totalTime += elapsed;

    if (fastestTime === null || elapsed < fastestTime){
        fastestTime = elapsed;
    }

    document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime.toFixed(2);
    document.getElementById("avgTime").textContent = "Average Time: " + (totalTime / gamesPlayed).toFixed(2);
}

//Reset
function reset(){
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    let levelRadios = document.getElementsByName("level");
    for (let i=0; i < levelRadios.length; i++) {
        levelRadios[i].disabled = false; 
    }
}
