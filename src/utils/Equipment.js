let baseWidth = 1600

export const changeBaseWidth = (width) => {
    playingfield.width = width
    playingfield.height = width * (2 / 3)

    ball.x = playingfield.width / 2
    ball.y = playingfield.height / 2
    ball.size = playingfield.height / 40
    ball.dx = playingfield.width / 100
    ball.dy = playingfield.height / 100

    playerPaddle.x = playingfield.width / 30
    playerPaddle.y = playingfield.height / 2.5
    playerPaddle.width = playingfield.width / 40
    playerPaddle.height = playingfield.height / 5.5
    playerPaddle.speed = width / 100

    computerPaddle.x = playingfield.width - playingfield.width / 20
    computerPaddle.y = playingfield.height / 2.5
    computerPaddle.width = playingfield.width / 40
    computerPaddle.height = playingfield.height / 5.5
    computerPaddle.speed = width / 100

}

export const playingfield = {
    width: baseWidth,
    height: baseWidth * (2 / 3)
}

export const ball = {
    x: playingfield.width / 2,
    y: playingfield.height / 2,
    size: playingfield.height / 40,
    dx: playingfield.width / 100,
    dy: playingfield.height / 100
}
export const playerPaddle = {
    x: playingfield.width / 30,
    y: playingfield.height / 2.5,
    width: playingfield.width / 40,
    height: playingfield.height / 5.5,
    speed: baseWidth / 100,
    dy: 0
}
export const computerPaddle = {
    x: playingfield.width - playingfield.width / 20,
    y: playingfield.height / 2.5,
    width: playingfield.width / 40,
    height: playingfield.height / 5.5,
    speed: baseWidth / 100,
    dy: 0
}