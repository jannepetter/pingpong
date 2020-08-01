export const playingfield = {
    width: 600,
    height: 400
}
export const ball = {
    x: 300,
    y: 200,
    size: 10,
    dx: 5,
    dy: 3
}
export const playerPaddle = {
    x: 20,
    y: 150,
    width: 15,
    height: 70,
    speed: 6,
    dy: 0
}
export const computerPaddle = {
    x: playingfield.width - 30,
    y: playingfield.height - 150,
    width: 15,
    height: 70,
    speed: 6,
    dy: 0
}