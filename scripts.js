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

// adding functions to announcement buttons
resetBtn.addEventListener("click", () => {
    round = 1;
    comWon = 0;
    playerWon = 0;
    choose();
})
nextBtn.addEventListener("click", () => {
    round++;
    console.log(round)
    choose();
})

// adding function to player buttons
playerBtns.forEach(element => {
element.style.display = "inline";
element.addEventListener("click", e => {
    play(e);
    })
})

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
    // show player buttons
    playerBtns.forEach(element => {
        element.style.display = "inline";
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
}

// play function
function play(e){
    // player's choice
    let playerChoice = e.target.className.toString().slice(0,1).toUpperCase() + e.target.className.toString().slice(1,-3);
    let comChoice = images[Math.floor(Math.random()*3)].slice(0,-4)
    // hide all buttons
    playerBtns.forEach(element => {
        element.style.display = "none"
    })
    // some text for waiting
    announcement.textContent = "The computer is choosing random!"

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