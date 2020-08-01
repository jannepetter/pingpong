import React from 'react';
import './css/App.css';
import { ball, playerPaddle, computerPaddle, playingfield } from './utils/Equipment'
import { AILvl1, AILvl2, Player1AI } from './utils/AI'

//ai ei torju kaikkia max nopeuksilla, testaa että kaikki toimii eri nopeuksilla
//pistelaskut, pauset halutessaan ja pisteen alussa, vaikeustason valinta

function App() {
  const canvas = document.getElementById('kanvaasi')
  const ctx = canvas.getContext('2d')
  canvas.width = playingfield.width
  canvas.height = playingfield.height

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const drawPaddles = () => {
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height)
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height)
  }

  const drawball = () => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.fill()
  }
  const ballHitsEdges = () => {
    if (ball.x > canvas.width - ball.size || ball.x < ball.size) {
      ball.dx *= -1
    }
    if (ball.y > canvas.height - ball.size || ball.y < ball.size) {
      ball.dy *= -1
    }
  }
  const paddleHitsEdges = () => {
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
  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const update = () => {
    clearCanvas()
    drawPaddles()
    AILvl2()
    Player1AI()
    playerPaddle.y += playerPaddle.dy
    computerPaddle.y += computerPaddle.dy
    drawball()
    ball.x += ball.dx
    ball.y += ball.dy
    paddleHitsEdges()
    ballHitsEdges()
    ballHitsPaddle()
    requestAnimationFrame(update)
  }
  const ballHitsPaddle = () => {
    const edgeBounce = 2
    const centerBounce = Math.round(Math.random() * 2) - 1
    const speedIncrease = 1
    const maxSpeed = 30
    const xRange = (min, max, x) => {
      if (x >= min && x <= max) {
        return true
      }
      return false
    }
    const yRange = (paddle, ball) => {
      const third = paddle.height / 3
      if (ball.y >= paddle.y && ball.y <= paddle.y + third) {
        ball.dy <= -maxSpeed ? ball.dy = -maxSpeed : ball.dy -= edgeBounce
        return true
      }
      if (ball.y >= paddle.y + third && ball.y <= paddle.y + third * 2) {
        ball.dy += centerBounce
        return true
      }
      if (ball.y >= paddle.y + third * 2 && ball.y <= paddle.y + third * 3) {
        ball.dy >= maxSpeed ? ball.dy = maxSpeed : ball.dy += edgeBounce
        return true
      }
      return false
    }

    if (xRange(playerPaddle.x, playerPaddle.x + playerPaddle.width, ball.x) &&
      yRange(playerPaddle, ball)) {
      ball.dx *= -speedIncrease
    }
    if (xRange(computerPaddle.x, computerPaddle.x + computerPaddle.width, ball.x) &&
      yRange(computerPaddle, ball)) {
      ball.dx *= -speedIncrease
    }

    /* if ((playerPaddle.x + playerPaddle.width >= ball.x && playerPaddle.x <= ball.x) &&
      (ball.y >= playerPaddle.y && ball.y <= playerPaddle.y + playerPaddle.height)) {
      ball.dx *= -1
    }
    if ((computerPaddle.x <= ball.x && computerPaddle.x + computerPaddle.width >= ball.x) &&
      (ball.y >= computerPaddle.y && ball.y <= computerPaddle.y + computerPaddle.height)) {
      ball.dx *= -1
    } */
  }


  const keyDown = (e) => {
    if (e.key === 'ArrowUp') {
      playerPaddle.dy = playerPaddle.speed * -1
    }
    if (e.key === 'ArrowDown') {
      playerPaddle.dy = playerPaddle.speed
    }
  }
  const keyUp = (e) => {
    if (e.key === 'ArrowUp') {
      playerPaddle.dy = 0
    }
    if (e.key === 'ArrowDown') {
      playerPaddle.dy = 0
    }
  }

  document.addEventListener('keydown', keyDown)
  document.addEventListener('keyup', keyUp)
  update()


  return (
    <div className="App">
      hello wello
    </div>
  );
}

export default App;
