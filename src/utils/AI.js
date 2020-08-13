import { ball, computerPaddle, playerPaddle, playingfield } from './Equipment'

let calculatedAI = false
let calcspotAI
let player1calculatedAI = false
let calcspotPlayer1AI

export const resetAiCalculations = () => {
    calculatedAI = false
    player1calculatedAI = false
}

const centerPaddle = (paddle, speed) => {
    if (Math.abs(paddle.y + (paddle.height / 2) - playingfield.height / 2) < 6) {
        paddle.dy = 0
    } else if (paddle.y + (paddle.height / 2) > playingfield.height / 2) {
        paddle.dy = speed * -1
    } else if (paddle.y + (paddle.height / 2) < playingfield.height / 2) {
        paddle.dy = speed
    }
}

const smoothspeed = (ball, paddle) => {
    const height = Math.abs(ball.y - (paddle.y + paddle.height / 2))
    const usespeed = Math.min(Math.abs(ball.dy) + 1, paddle.speed)
    const ballXspeed = Math.abs(ball.dx)
    const ballYspeed = Math.abs(ball.dy)
    if (ballXspeed > 8 || ballYspeed > 8) {
        return paddle.speed
    }
    if (height < paddle.height / 2) {
        return usespeed
    }
    return paddle.speed
}
export const AILvl1 = (weak) => {
    let handicap = 0
    if (weak) {
        handicap = computerPaddle.speed / 3
    }
    const speed = smoothspeed(ball, computerPaddle) - handicap
    const balldirectionX = ball.dx > 0 ? 'incoming' : 'outgoing'
    const ballPaddleRelation = ball.y > (computerPaddle.y + computerPaddle.height / 2) ? 'down' : 'up'
    const closeEnuf = ball.y > (computerPaddle.y + computerPaddle.height / 2) - computerPaddle.speed &&
        ball.y < (computerPaddle.y + computerPaddle.height / 2) + computerPaddle.speed
    const info = closeEnuf ? balldirectionX + 'towards' : balldirectionX + ballPaddleRelation
    switch (info) {
        case 'incomingdown':
            computerPaddle.dy = speed
            break;
        case 'incomingup':
            computerPaddle.dy = speed * -1
            break;
        case 'incomingtowards':
            computerPaddle.dy = 0
            break;
        default:
            centerPaddle(computerPaddle, speed)
            break;
    }

}

const reflectLeftoverFromWall = (start, leftover, goingUp) => {
    if (goingUp) {
        return Math.abs(start - (leftover))
    }
    if (!goingUp) {
        const dist = start + (leftover)
        if (dist > playingfield.height) {
            return playingfield.height - (dist - playingfield.height)
        }
        return dist
    }
}
const getXlength = (startx) => {
    const totW = playingfield.width
    if (startx > totW / 2) {
        return totW - (totW - startx) - (playerPaddle.x + playerPaddle.width)
    } else {
        return totW - startx - (totW - computerPaddle.x)
    }
}

const landingSpotY = (startx, starty, speedx, speedy) => {
    const xlength = getXlength(startx)
    const time = xlength / speedx
    const ylength = Math.abs(time * speedy)
    const numberOfHeightCrossings = Math.floor(ylength / (playingfield.height))
    const leftover = (ylength % (playingfield.height))
    if (ylength === 0) {
        return ball.y
    }
    if (numberOfHeightCrossings % 2 === 0 && speedy < 0) {
        return reflectLeftoverFromWall(starty, leftover, true)
    }
    if (numberOfHeightCrossings % 2 === 0 && speedy > 0) {
        return reflectLeftoverFromWall(starty, leftover, false)
    }
    if (numberOfHeightCrossings % 2 === 1 && speedy < 0) {
        const reverseStartY = playingfield.height - starty
        return reflectLeftoverFromWall(reverseStartY, leftover, false)
    }
    if (numberOfHeightCrossings % 2 === 1 && speedy > 0) {
        const reverseStartY = playingfield.height - starty
        return reflectLeftoverFromWall(reverseStartY, leftover, true)
    }
}

export const AILvl2 = () => {
    const speed = computerPaddle.speed
    const balldirectionX = ball.dx > 0 ? 'incoming' : 'outgoing'
    if (balldirectionX === 'outgoing' && calculatedAI === true) {
        calculatedAI = false
    }
    if (balldirectionX === 'incoming' && calculatedAI === false) {
        calcspotAI = landingSpotY(ball.x, ball.y, ball.dx, ball.dy)
        calculatedAI = true
    }

    let ballPaddleRelation = calcspotAI > (computerPaddle.y + computerPaddle.height / 2) ? 'down' : 'up'
    if (calcspotAI < (computerPaddle.y + computerPaddle.height / 2) + computerPaddle.speed &&
        calcspotAI > (computerPaddle.y + computerPaddle.height / 2) - computerPaddle.speed) {
        ballPaddleRelation = 'towards'
    }
    const info = balldirectionX + ballPaddleRelation

    switch (info) {
        case 'incomingdown':
            computerPaddle.dy = speed
            break;
        case 'incomingup':
            computerPaddle.dy = speed * -1
            break;
        case 'incomingtowards':
            computerPaddle.dy = 0
            break;
        default:
            centerPaddle(computerPaddle, speed)
            break;
    }
}
export const Player1AI = () => {
    const speed = playerPaddle.speed
    const balldirectionX = ball.dx > 0 ? 'outgoing' : 'incoming'
    if (balldirectionX === 'outgoing' && player1calculatedAI === true) {
        player1calculatedAI = false
    }
    if (balldirectionX === 'incoming' && player1calculatedAI === false) {
        calcspotPlayer1AI = landingSpotY(ball.x, ball.y, ball.dx, ball.dy)
        player1calculatedAI = true
    }

    let ballPaddleRelation = calcspotPlayer1AI > (playerPaddle.y + playerPaddle.height / 2) ? 'down' : 'up'
    if (calcspotPlayer1AI < (playerPaddle.y + playerPaddle.height / 2) + 5 &&
        calcspotPlayer1AI > (playerPaddle.y + playerPaddle.height / 2) - 5) {
        ballPaddleRelation = 'towards'
    }
    const info = balldirectionX + ballPaddleRelation

    switch (info) {
        case 'incomingdown':
            playerPaddle.dy = speed
            break;
        case 'incomingup':
            playerPaddle.dy = speed * -1
            break;
        case 'incomingtowards':
            playerPaddle.dy = 0
            break;
        default:
            centerPaddle(playerPaddle, speed)
            break;
    }

}