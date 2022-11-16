// get round and wins
let roundSpan = document.querySelector('.round')
let round = 1;
let playerWonDiv = document.querySelector('.playerWon')
let comWonDiv = document.querySelector('.comWon')
let playerWon = 0, comWon = 0;

// get layers
let comLayer = document.querySelector('.comLayer')
let playerLayer = document.querySelector('.playerLayer')

// get announcement and player btns
let announcement = document.querySelector('.announcement')
let announceBtns = document.querySelectorAll('.announceBtns > button')
let resetBtn = document.querySelector('.resetBtn')
let nextBtn = document.querySelector('.nextBtn')
let playerBtns = document.querySelectorAll('.playerBtns > button')

// make com div's width same as player div's, since player div's width is chaning due to buttons
let comDiv = document.querySelector('.comDiv')
let playerDiv = document.querySelector('.playerDiv')
comDiv.style.width = playerDiv.offsetWidth + "px";

// animation function (changing images)
let comImg = document.querySelector('.comImg')
let playerImg = document.querySelector('.playerImg')
let i = 0;
let images = ["Rock.png", "Paper.png", "Scissors.png"]
function animate(img, imager){
    img.src = "./images/" + imager + images[i%3];
    i++;
}

// choose function
let comAnimating, playerAnimating;
function choose(){
    // show current round
    roundSpan.textContent = round;
    // show wins
    comWonDiv.textContent = comWon;
    playerWonDiv.textContent = playerWon;
    // hide layers
    comLayer.style.display = "none";
    playerLayer.style.display = "none";
    // start both animations
    comAnimating = setInterval(() => animate(comImg, "com"), 150);
    playerAnimating = setInterval(() => animate(playerImg, "player"), 150);
    // change announcement "tell player to choose"
    announcement.textContent = "Please Choose Rock OR Paper OR Scissors!"
    // hide announcement buttons
    announceBtns.forEach(element => {
        element.style.display = "none";
    });
    // when player click one of the player buttons
    playerBtns.forEach(element => {
        element.style.display = "inline";
        element.addEventListener("click", e => {
            play(e);
        })
    })
}

// Tie
function tie(){
    comLayer.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
    comLayer.style.display = "block";
    playerLayer.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
    playerLayer.style.display = "block";
    announcement.textContent = "Oh! It is a Tie!"
    roundEnd();
}
// Win
function win(){
    comLayer.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    comLayer.style.display = "block";
    playerLayer.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    playerLayer.style.display = "block";
    announcement.textContent = "Yayyy! You Won!"
    playerWon++;
    roundEnd();
}
// Lost
function lost(){
    comLayer.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    comLayer.style.display = "block";
    playerLayer.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    playerLayer.style.display = "block";
    announcement.textContent = "Oops! You Lost!"
    comWon++;
    roundEnd();
}
// round end, wait for rematch or next round
function roundEnd(){
    announceBtns.forEach(element => {
        element.style.display = "block";
    });
    comWonDiv.textContent = comWon;
    playerWonDiv.textContent = playerWon;
    resetBtn.addEventListener("click", () => {
        round = 1;
        comWon = 0;
        playerWon = 0;
        choose();
    })
    nextBtn.addEventListener("click", () => {
        round++;
        choose();
    })
}


// play function
function play(e){
    // player's choice
    let playerChoice = e.target.className.toString().slice(0,1).toUpperCase() + e.target.className.toString().slice(1,-3);
    let comChoice = images[Math.floor(Math.random()*3)].slice(0,-4)
    console.log(playerChoice == comChoice)
    // hide all buttons
    playerBtns.forEach(element => {
        element.style.display = "none"
    })

    // stop player image fast animation
    // clearInterval(playerAnimating);
    // // stop com fast animation
    // clearInterval(comAnimating);
    // why the speed is not the same for 2 setintervals???
    // I found out that has something to do with you stopping one interval but kept running the other
    // Because if you comment out the below line(also set player setInterval to same ms as com), you will see they run at the same time
    // clearInterval(comAnimating);
    // playerAnimating is still not working correctly, so I slowed both
    // playerAnimating = setInterval(() => animate(playerImg, "player"), 130);
    // // slow com animation
    // comAnimating = setInterval(() => animate(comImg, "com"), 130);

    // because of annoying different speeds(above code), I just stopped without slowing
    // after 2 sec stop player animation at player choice
    setTimeout(function(){
        clearInterval(playerAnimating);
        playerImg.src = "./images/player" + playerChoice.slice(0,1).toUpperCase() + playerChoice.slice(1,) + ".png";    
        // after another 2 sec stop com animation at com choice
        setTimeout(function(){
            clearInterval(comAnimating);
            comImg.src = "./images/com" + comChoice + ".png";
            // compare results
            if(playerChoice == comChoice){
                tie();
            }else if((playerChoice == "Rock" && comChoice == "Scissors") 
                    || (playerChoice == "Paper" && comChoice == "Rock")
                    || (playerChoice == "Scissors" && comChoice == "Paper")){
                win();
            }else{
                lost();
            }
        }, 2000)
    }, 500)
}

choose();

// let choices = ["rock", "paper", "scissors"];
// let player_win = com_win = 0;
// let message;

// // Greet
// alert("Hello! Welcome to Rock Paper Scissors Game!!!\nRules: First to 5 wins!");
// choose();

// function choose(){
//     if (player_win>=5){
//         player_final_won();
//     }else if (com_win>=5){
//         com_final_won();
//     }else{
//         // Player choose
//         let player_choice = prompt("Please choose Rock Paper Scissors?").toLowerCase();
//         // Random Com
//         let com_choice = choices[Math.floor(Math.random()*choices.length)]

//         // call compare
//         compare(player_choice, com_choice);
//     }
// }

// // Compare
// function compare(player_choice, com_choice){
//     // Wrong Typed
//     if (!choices.includes(player_choice)){
//         message = "Sorry what you chose was not in  the choices!";
//     }else{
//         // Tie
//         if (player_choice === com_choice){
//             message = "Woah! It was a tie";
//         }
//         // Rock VS Paper
//         else if ([choices[0],choices[1]].includes(player_choice) && [choices[0],choices[1]].includes(com_choice)){
//             if(player_choice === "paper"){
//                 player_round_win();
//             }else if(com_choice === "paper"){
//                 com_round_win();
//             }
//         }
//         // Paper VS Scissors
//         else if ([choices[1],choices[2]].includes(player_choice) && [choices[1],choices[2]].includes(com_choice)){
//             if(player_choice === "scissors"){
//                 player_round_win();
//             }else if(com_choice === "scissors"){
//                 com_round_win();
//             }
//         }
//         // Rock VS Scissors
//         else if ([choices[0],choices[2]].includes(player_choice) && [choices[0],choices[2]].includes(com_choice)){
//             if(player_choice === "rock"){
//                 player_round_win();
//             }else if(com_choice === "rock"){
//                 com_round_win();
//             }
//         }
//         message += `\nYou chose "${player_choice}" and Computer chose "${com_choice}"\nWin: ${player_win}  Lose: ${com_win}`
//     }
    
//     alert(message);
//     choose();
// }


// // Result
// function player_round_win(){
//     player_win++;
//     message = "Yay! You won!"
// }
// function com_round_win(){
//     com_win++;
//     message = "Oops! You lost!"
// }

// // Final Result
// function player_final_won(){
//     alert("Wow! You finally won!!! Congratulations!!!")
// }
// function com_final_won(){
//     alert("Oh NO!!! You lost!!! Better luck next time!")
// }