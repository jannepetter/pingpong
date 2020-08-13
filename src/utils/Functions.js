import { ball, playerPaddle, computerPaddle, playingfield } from '../utils/Equipment'
const ballStartingSpeedX = playingfield.width / 100
const ballStartingSpeedY = playingfield.height / 100

export const startingPositions = () => {
    ball.x = playingfield.width / 2
    ball.y = playingfield.height / 2
    ball.dx = ballStartingSpeedX
    ball.dy = ballStartingSpeedY
    playerPaddle.y = playingfield.height / 2.5
    computerPaddle.y = playingfield.height / 2.5
}
export const drawInstructions = (ctx, run, start, points) => {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    if (start && !run) {
        ctx.fillText("Paused", playingfield.width / 2.2, playingfield.height / 4.4);
    } else if (!start && !run) {
        ctx.fillText("Press start to begin game", playingfield.width / 2.6, playingfield.height / 4.4);
        ctx.fillText("Move paddle up, arrowUp key", playingfield.width / 2.6, playingfield.height / 3.8);
        ctx.fillText("Move paddle down, arrowDown key", playingfield.width / 2.6, playingfield.height / 3.3);
        ctx.fillText("Mobile touchkeys, appear in landscapeview", playingfield.width / 2.6, playingfield.height / 2.95);
        ctx.fillText(`Who gets ${points} points first wins`, playingfield.width / 2.6, playingfield.height / 2.65);
    } else if (run && start) {
        ctx.fillText("Get ready!", playingfield.width / 2.2, playingfield.height / 4.4);
    }
}
export const drawEndText = (ctx, playerPoints, computerPoints) => {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    if (playerPoints > computerPoints) {
        ctx.fillText("You won! Play again?", playingfield.width / 2.4, playingfield.height / 4.4);
    } else if (computerPoints > playerPoints) {
        ctx.fillText("You lose! Try again?", playingfield.width / 2.4, playingfield.height / 4.4);
    }
}

export const drawPaddles = (ctx) => {
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height)
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height)
}

export const drawball = (ctx) => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.fill()
}
export const ballHitsEdges = (canvas) => {
    const ballDy = Math.abs(ball.dy)
    if (ball.y > canvas.height - ballDy) {
        ball.y = canvas.height
        ball.dy *= -1
    }
    if (ball.y < ballDy) {
        ball.y = 0
        ball.dy *= -1
    }
}
export const paddleHitsEdges = (canvas) => {
    if (playerPaddle.y < 0) {
        playerPaddle.y = 0
    }
    if (playerPaddle.y + playerPaddle.height > canvas.height) {
        playerPaddle.y = canvas.height - playerPaddle.height
    }
    if (computerPaddle.y < 0) {
        computerPaddle.y = 0
    }
    if (computerPaddle.y + computerPaddle.height > canvas.height) {
        computerPaddle.y = canvas.height - computerPaddle.height
    }
}
export const clearCanvas = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export const ballHitsPaddle = () => {
    const edgeBounce = 2
    const centerBounce = Math.round(Math.random() * (computerPaddle.height / 20))
    const speedIncrease = 1.02
    const maxSpeed = 30

    const accBounce = (paddle, ball) => {
        const info = ball.dx > 0 ? 'right' : 'left'
        switch (info) {
            case 'right':
                ball.x = paddle.x - ball.size
                ball.dx *= -speedIncrease
                break;
            case 'left':
                ball.x = paddle.x + paddle.width + ball.size
                ball.dx *= -speedIncrease
                break;
            default:
                break;
        }

        const third = paddle.height / 3
        if (ball.y >= paddle.y - ball.size && ball.y <= paddle.y + third) {
            ball.dy <= -maxSpeed ? ball.dy = -maxSpeed : ball.dy -= edgeBounce
        }
        if (ball.y >= paddle.y + third && ball.y <= paddle.y + third * 2) {
            centerBounce % 2 === 0 ? ball.dy += centerBounce : ball.dy -= centerBounce
        }
        if (ball.y >= paddle.y + third * 2 && ball.y <= paddle.y + ball.size + third * 3) {
            ball.dy >= maxSpeed ? ball.dy = maxSpeed : ball.dy += edgeBounce
        }



    }

    const xRange = (paddle, ball) => {
        const positiveSpeed = ball.dx > 0 ? true : false
        const ballXplusSpeed = ball.x + ball.dx
        const paddlePlusWidth = paddle.x + paddle.width
        if (positiveSpeed && ballXplusSpeed >= paddle.x && ballXplusSpeed <= paddlePlusWidth) {
            return true
        }
        if (!positiveSpeed && ballXplusSpeed - ball.size <= paddlePlusWidth && ballXplusSpeed >= paddle.x) {
            return true
        }
        return false
    }

    const yRange = (paddle, ball) => {
        if (ball.y >= paddle.y - ball.size && ball.y <= paddle.y + paddle.height + ball.size) {
            return true
        }
        return false
    }

    if (xRange(playerPaddle, ball) &&
        yRange(playerPaddle, ball)) {
        accBounce(playerPaddle, ball)
    }
    if (xRange(computerPaddle, ball) &&
        yRange(computerPaddle, ball)) {
        accBounce(computerPaddle, ball)
    }
}