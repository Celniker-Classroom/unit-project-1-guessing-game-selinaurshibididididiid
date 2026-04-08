# Above and Beyond Features

## 1. Feedback Based on Performance
Description:
I added feedback based on how quickly the player wins:
- 1–2 guesses → Amazing  
- 3–5 guesses → Good job  
- 6+ guesses → Keep practicing  

Improvements:
This improves the game by returning feedback to players based on their performace and can encourgae players to continue playing 

Location:
Inside the makeGuess() function, or even more specific -- in the win condition (if (guess === answer)) where the quality variable is determined

---

## 2. Enter Key Support
Description:
Players can now press the Enter key instead of clicking the Guess button  

Improvements:
This improves usability by allowing faster interaction and making the game feel more responsive

Location:
In an event listener:
document.getElementById("guess").addEventListener("keypress", function(e){
    if (e.key === "Enter"){
        makeGuess();
    }
});

---

## 3. Input Validation
Description:
The game is now able to prevent invalid inputs such as:
- Non-numeric inputs  
- Out-of-range guesses  

Improvements:
This improves the user experience by preventing errors and ensuring all guesses are valid

Location:
This is at the beginning of the makeGuess() function with:

if (isNaN(guess)) { ... }
if (guess < 1 || guess > rangeValue) { ... }

---

## 4. Win Streak Tracker
Description:
The game is able to track wins and displays win streaks to the player

Improvements:
This adds a competitive element as it encourages/motivates players to maintain their streaks or aim for higher ones

Location(s):
- declared at the top: let winStreak = 0;
- Increases in the makeGuess() when the player wins (winStreak++)
- Resets in the giveUp() function (winStreak = 0)
- Displayed in the win message inside the makeGuess() function