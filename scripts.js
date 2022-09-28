let choices = ["rock", "paper", "scissors"];
let player_win = com_win = 0;
let message;

// Greet
alert("Hello! Welcome to Rock Paper Scissors Game!!!\nRules: First to 5 wins!");
choose();

function choose(){
    if (player_win>=5){
        player_final_won();
    }else if (com_win>=5){
        com_final_won();
    }else{
        // Player choose
        let player_choice = prompt("Please choose Rock Paper Scissors?").toLowerCase();
        // Random Com
        let com_choice = choices[Math.floor(Math.random()*choices.length)]

        // call compare
        compare(player_choice, com_choice);
    }  
}

// Compare
function compare(player_choice, com_choice){
    // Wrong Typed
    if (!choices.includes(player_choice)){
        message = "Sorry what you chose was not in  the choices!";
    }else{
        // Tie
        if (player_choice === com_choice){
            message = "Woah! It was a tie";
        }
        // Rock VS Paper
        else if ([choices[0],choices[1]].includes(player_choice) && [choices[0],choices[1]].includes(com_choice)){
            if(player_choice === "paper"){
                player_round_win();
            }else if(com_choice === "paper"){
                com_round_win();
            }
        }
        // Paper VS Scissors
        else if ([choices[1],choices[2]].includes(player_choice) && [choices[1],choices[2]].includes(com_choice)){
            if(player_choice === "scissors"){
                player_round_win();
            }else if(com_choice === "scissors"){
                com_round_win();
            }
        }
        // Rock VS Scissors
        else if ([choices[0],choices[2]].includes(player_choice) && [choices[0],choices[2]].includes(com_choice)){
            if(player_choice === "rock"){
                player_round_win();
            }else if(com_choice === "rock"){
                com_round_win();
            }
        }
        message += `\nYou chose "${player_choice}" and Computer chose "${com_choice}"\nWin: ${player_win}  Lose: ${com_win}`
    }
    
    alert(message);
    choose();
}


// Result
function player_round_win(){
    player_win++;
    message = "Yay! You won!"
}
function com_round_win(){
    com_win++;
    message = "Oops! You lost!"
}

// Final Result
function player_final_won(){
    alert("Wow! You finally won!!! Congratulations!!!")
}
function com_final_won(){
    alert("Oh NO!!! You lost!!! Better luck next time!")
}