import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
            //Toggle this to stop game
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        

        if (isLose()) {
            changeColor()
            handleLose()
        }
    }
    
    lastTime = time
    
    window.requestAnimationFrame(update)
}

export function changeColor() {
    document.documentElement.style.setProperty("--hue", Math.floor(Math.random() * 361))
}

function isLose() {
    const rect = ball.rect()
    return (rect.right >= window.innerWidth || rect.left <= 0)
}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)