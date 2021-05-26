import React, { useEffect, useState } from 'react';
import './css/App.css';
import Board from './components/Board';
import OptionPanel from './components/OptionPanel';
import { getScores } from './services/scoreService';
import ScorePanel from './components/ScorePanel';

function App() {
  const [run, setRun] = useState(false)
  const [start, setStart] = useState(false)
  const [difficulty, setDifficulty] = useState('easy')
  const [update, setUpdate] = useState(false)
  const [scores, setScores] = useState([])
  const [show, setShow] = useState(false)

  const scoresorter = (a, b) => {
    return parseInt(b.score) - parseInt(a.score)
  }

  useEffect(() => {
    console.log('loading')
    getScores().then(sc => setScores(sc[0]?.scores?.sort((a, b) => scoresorter(a, b))))
  }, [])
  if (!scores) {
    setScores([])
  }

  return (
    <div className="App">
      <OptionPanel show={show} setShow={setShow} setDifficulty={setDifficulty} start={start}></OptionPanel>
      <ScorePanel show={show} scores={scores}></ScorePanel>
      <Board setScores={setScores} scores={scores} show={show} run={run} setRun={setRun} start={start} setStart={setStart}
        difficulty={difficulty} setDifficulty={setDifficulty}
        update={update} setUpdate={setUpdate}></Board>
    </div>
  );
}

export default App;
