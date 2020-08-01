import { ball, computerPaddle, playerPaddle, playingfield } from './Equipment'

let calculatedAI = false
let calcspotAI
let player1calculatedAI = false
let calcspotPlayer1AI

const centerPaddle = (paddle, speed) => {
    if (Math.abs(paddle.y + (paddle.height / 2) - playingfield.height / 2) < 6) {
        paddle.dy = 0
    } else if (paddle.y + (paddle.height / 2) > playingfield.height / 2) {
        paddle.dy = speed * -1
    } else if (paddle.y + (paddle.height / 2) < playingfield.height / 2) {
        paddle.dy = speed
    }
}
const smoothspeed = (ballYspeed, ballXspeed, paddlespeed) => {
    if (Math.abs(ballXspeed) > 4 || ballYspeed === 0) {
        return paddlespeed
    }
    const usespeed = Math.min(Math.abs(ballYspeed), paddlespeed)
    return usespeed
}
export const AILvl1 = () => {
    const speed = smoothspeed(ball.dy, ball.dx, computerPaddle.speed)
    const balldirectionX = ball.dx > 0 ? 'incoming' : 'outgoing'
    const ballPaddleRelation = ball.y > (computerPaddle.y + computerPaddle.height / 2) ? 'down' : 'up'
    const info = balldirectionX + ballPaddleRelation

    switch (info) {
        case 'incomingdown':
            computerPaddle.dy = speed
            break;
        case 'incomingup':
            computerPaddle.dy = speed * -1
            break;
        default:
            centerPaddle(computerPaddle, speed)
            break;
    }

}

const reflectLeftoverFromWall = (start, leftover, goingUp) => {
    if (goingUp) {
        return Math.abs(start - (leftover - ball.size))
    }
    if (!goingUp) {
        const dist = start + (leftover - ball.size)
        if (dist > playingfield.height) {
            return playingfield.height - (dist - playingfield.height)
        }
        return dist
    }
}
const getXlength = (startx) => {
    const speedFactor = Math.abs(ball.dy) > 24 ? 33 : 0
    const totW = playingfield.width + speedFactor
    if (startx > totW / 2) {
        return totW - (totW - startx) - (playerPaddle.x + playerPaddle.width) + ball.size - speedFactor
    } else {
        return totW - startx - (totW - computerPaddle.x - ball.size) - speedFactor
    }
}

const landingSpotY = (startx, starty, speedx, speedy) => {
    const xlength = getXlength(startx)
    /* const xlength = playingfield.width - startx - (playingfield.width - computerPaddle.x - ball.size) */ //kerta riittää
    console.log(xlength, 'äksä')
    const ballSizeSpeed = ball.dy > 25 ? ball.size * 3 : ball.size * 2
    const time = xlength / speedx
    const ylength = Math.abs(time * speedy)
    console.log(ylength, 'yy')
    const leftover = ylength % (playingfield.height - ballSizeSpeed)
    const numberOfHeightCrossings = Math.floor(ylength / (playingfield.height - ballSizeSpeed))
    if (ylength === 0) {
        return ball.y
    }
    if (numberOfHeightCrossings % 2 === 0 && speedy < 0) {
        console.log('yks')
        return reflectLeftoverFromWall(starty, leftover - numberOfHeightCrossings * ballSizeSpeed, true)
    }
    if (numberOfHeightCrossings % 2 === 0 && speedy > 0) {
        console.log('kaks')
        return reflectLeftoverFromWall(starty, leftover - numberOfHeightCrossings * ballSizeSpeed, false)
    }
    if (numberOfHeightCrossings % 2 === 1 && speedy < 0) {
        console.log('koli')
        const reverseStartY = playingfield.height - starty
        return reflectLeftoverFromWall(reverseStartY, leftover - numberOfHeightCrossings * ballSizeSpeed, false)
    }
    if (numberOfHeightCrossings % 2 === 1 && speedy > 0) {
        console.log('neli')
        const reverseStartY = playingfield.height - starty
        return reflectLeftoverFromWall(reverseStartY, leftover - numberOfHeightCrossings * ballSizeSpeed, true)
    }
}

export const AILvl2 = () => {
    const speed = smoothspeed(ball.dy, ball.dx, computerPaddle.speed)
    const balldirectionX = ball.dx > 0 ? 'incoming' : 'outgoing'
    if (balldirectionX === 'outgoing' && calculatedAI === true) {
        calculatedAI = false
    }
    if (balldirectionX === 'incoming' && calculatedAI === false) {
        calcspotAI = landingSpotY(ball.x, ball.y, ball.dx, ball.dy)
        calculatedAI = true
    }

    let ballPaddleRelation = calcspotAI > (computerPaddle.y + computerPaddle.height / 2) ? 'down' : 'up'
    if (calcspotAI < (computerPaddle.y + computerPaddle.height / 2) + 5 &&
        calcspotAI > (computerPaddle.y + computerPaddle.height / 2) - 5) {
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
    const speed = smoothspeed(ball.dy, ball.dx, playerPaddle.speed)
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