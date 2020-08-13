import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ball, playerPaddle, computerPaddle, playingfield } from '../utils/Equipment'
import { AILvl1, AILvl2, /* Player1AI, */ resetAiCalculations } from '../utils/AI'
import {
    drawPaddles, drawball, ballHitsEdges, paddleHitsEdges,
    clearCanvas, ballHitsPaddle, startingPositions, drawInstructions, drawEndText
} from '../utils/Functions'
import '../css/Board.css'

const Board = (props) => {
    const rafID = useRef()
    const pauseButtonInfo = props.run ? 'pause' : 'continue'
    const canvas = document.getElementById('kanvaasi')
    const [playerPoints, setPlayerPoints] = useState(0)
    const [computerPoints, setComputerPoints] = useState(0)
    const difficulty = props.difficulty
    const setDifficulty = props.setDifficulty
    const setUpdate = props.setUpdate
    const setStart = props.setStart
    const setRun = props.setRun
    const gamePointLimit = 5

    const ctx = canvas.getContext('2d')
    canvas.width = playingfield.width
    canvas.height = playingfield.height
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const aiLvl = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return AILvl1(true)
            case 'normal':
                return AILvl1(false)
            case 'hard':
                return AILvl2()
            default:
                return AILvl1(true)
        }
    }

    const pausedView = useCallback(() => {
        clearCanvas(ctx, canvas)
        drawPaddles(ctx)
        drawball(ctx)
        drawInstructions(ctx, props.run, props.start, gamePointLimit)
    }, [ctx, canvas, props.run, props.start])




    const score = useCallback((ball) => {
        const resetAndPause = () => {
            startingPositions()
            resetAiCalculations()
            pausedView()
        }
        if (ball.x < -200) {
            setComputerPoints(computerPoints + 1)
            resetAndPause()
            return 'computer'
        }
        if (ball.x > playingfield.width + 200) {
            setPlayerPoints(playerPoints + 1)
            resetAndPause()
            return 'player'
        }
        return 'noscore'
    }, [computerPoints, playerPoints, pausedView])


    const endGame = useCallback((whoScored) => {
        const delayUpdate = () => {
            setTimeout(() => {
                setUpdate(true)
            }, 1500);
        }
        const drawEndGame = () => {
            setStart(false)
            setRun(false)
            setDifficulty('easy')
            clearCanvas(ctx, canvas)
            drawPaddles(ctx)
            drawball(ctx)
            drawEndText(ctx, playerPoints, computerPoints)
        }
        switch (whoScored) {
            case 'computer':
                if (computerPoints + 1 >= gamePointLimit) {
                    drawEndGame()
                    break;
                }
                delayUpdate()
                break;
            case 'player':
                if (playerPoints + 1 >= gamePointLimit) {
                    drawEndGame()
                    break;
                }
                delayUpdate()
                break;
            default:
                break;
        }
    }, [ctx, canvas, playerPoints, computerPoints, setUpdate, setStart, setRun, setDifficulty])


    const update = useCallback(() => {
        clearCanvas(ctx, canvas)
        drawPaddles(ctx)
        aiLvl(difficulty)
        /* Player1AI() */
        playerPaddle.y += playerPaddle.dy
        computerPaddle.y += computerPaddle.dy
        drawball(ctx)
        ball.x += ball.dx
        ball.y += ball.dy
        paddleHitsEdges(canvas)
        ballHitsEdges(canvas)
        ballHitsPaddle()
        const whoScored = score(ball)
        if (whoScored !== 'noscore') {
            setUpdate(false)
            endGame(whoScored)
        } else {
            rafID.current = requestAnimationFrame(update)
        }
    }, [canvas, ctx, difficulty, setUpdate, score, endGame])

    useEffect(() => {
        cancelAnimationFrame(rafID.current)
        if (props.run && props.start && props.update) {
            update()
        }
    }, [computerPoints, playerPoints, props.run, props.start, props.update, update, props.difficulty])



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

    const pauseContinue = () => {
        if (props.run === false) {
            setRun(true)
            return
        } else if (props.run === true) {
            setRun(false)
        }
    }
    const begin = () => {
        if (props.start === false) {
            update()
            setPlayerPoints(0)
            setComputerPoints(0)
            setUpdate(true)
            setRun(true)
            setStart(true)
        }
    }

    const restartGame = () => {
        cancelAnimationFrame(rafID.current)
        startingPositions()
        resetAiCalculations()
        props.setDifficulty('easy')
        pausedView()
        setStart(false)
        setRun(false)
        setComputerPoints(0)
        setPlayerPoints(0)
    }
    const touchKeyDownHandle = (direction) => {
        playerPaddle.dy = playerPaddle.speed * direction
    }
    const touchKeyUpHandle = () => {
        playerPaddle.dy = 0

    }
    const goUpTouchKey = document.getElementById('ylosnappi')
    const goDownTouchKey = document.getElementById('alasnappi')
    goUpTouchKey.addEventListener('touchstart', () => touchKeyDownHandle(-1), { passive: true })
    goUpTouchKey.addEventListener('touchend', touchKeyUpHandle)
    goDownTouchKey.addEventListener('touchstart', () => touchKeyDownHandle(1), { passive: true })
    goDownTouchKey.addEventListener('touchend', touchKeyUpHandle)




    pausedView()
    return (
        <div className='infobar'>
            <span className='infoitem'>player {playerPoints}</span> <span className='infoitem'>computer   {computerPoints}</span>
            {props.start ? <button className='infoitem basicButton' onClick={pauseContinue}>{pauseButtonInfo}</button> : null}
            {!props.start ? <button className='infoitem basicButton' onClick={begin}>start</button> :
                <button className='infoitem basicButton' onClick={restartGame}>restart</button>}
        </div>)
}


export default Board