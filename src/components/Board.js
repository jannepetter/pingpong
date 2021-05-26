import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ball, playerPaddle, computerPaddle, playingfield } from '../utils/Equipment'
import { AILvl1, AILvl2, /* Player1AI, */ resetAiCalculations } from '../utils/AI'
import {
    drawPaddles, drawball, ballHitsEdges, paddleHitsEdges,
    clearCanvas, ballHitsPaddle, startingPositions, drawInstructions, drawEndText
} from '../utils/Functions'
import '../css/Board.css'
import { postScores } from '../services/scoreService'

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
    const setScores = props.setScores
    const gamePointLimit = 10
    let baseScore
    if (difficulty === 'easy') {
        baseScore = 100
    } else if (difficulty === 'normal') {
        baseScore = 200
    } else {
        baseScore = 600
    }

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

    const scoresorter = (a, b) => {
        return parseInt(b.score) - parseInt(a.score)
    }

    const calculatePoints = useCallback(async (scores, base) => {
        if (scores && playerPoints > computerPoints) {
            console.log(scores, scores.length, 'tarkistus')
            const minscore = parseInt(scores[scores.length - 1]?.score)
            const playerScore = (1 + playerPoints - computerPoints) * base
            if (scores.length < 10 || (playerScore > minscore)) {
                const playerName = window.prompt('New highscore')
                const playserNameAndScore = { playername: playerName, score: playerScore.toString() }
                const newscores = []
                newscores.push(playserNameAndScore)
                scores.forEach(element => {
                    delete element._id
                    newscores.push(element)
                });
                const body = {
                    gamename: 'pong',
                    scores: newscores.sort((a, b) => scoresorter(a, b)).slice(0, 10)
                }
                const response = await postScores(body)
                const responseScores = response.scores ? response.scores : []
                setScores(responseScores)
            }
        }
    }, [computerPoints, playerPoints, setScores])
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
                    calculatePoints(props.scores, baseScore)
                    break;
                }
                delayUpdate()
                break;
            case 'player':
                if (playerPoints + 1 >= gamePointLimit) {
                    drawEndGame()
                    calculatePoints(props.scores, baseScore)
                    break;
                }
                delayUpdate()
                break;
            default:
                break;
        }
    }, [ctx, canvas, playerPoints, computerPoints, setUpdate, setStart, setRun, setDifficulty, baseScore, calculatePoints, props.scores])


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

    if (props.show) {
        return null
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
    const touchKeyDownHandle = (e, direction) => {
        if (e.cancelable) {
            e.preventDefault(); /* scroll prevent while pressing the button */
        }
        playerPaddle.dy = playerPaddle.speed * direction
    }
    const touchKeyUpHandle = (e) => {
        if (e.cancelable) {
            e.preventDefault(); /* scroll prevent while pressing the button */
        }
        playerPaddle.dy = 0

    }

    const goUpTouchKey = document.getElementById('ylosnappi')
    const goDownTouchKey = document.getElementById('alasnappi')


    goUpTouchKey.addEventListener('touchstart', (e) => touchKeyDownHandle(e, -1), { passive: false })
    goUpTouchKey.addEventListener('touchend', (e) => touchKeyUpHandle(e))
    goDownTouchKey.addEventListener('touchstart', (e) => touchKeyDownHandle(e, 1), { passive: false })
    goDownTouchKey.addEventListener('touchend', (e) => touchKeyUpHandle(e))




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