import React, { useState } from 'react';
import './css/App.css';
import Board from './components/Board';
import OptionPanel from './components/OptionPanel';

function App() {
  const [run, setRun] = useState(false)
  const [start, setStart] = useState(false)
  const [difficulty, setDifficulty] = useState('easy')
  const [update, setUpdate] = useState(false)


  return (
    <div className="App">
      <OptionPanel setDifficulty={setDifficulty} start={start}></OptionPanel>
      <Board run={run} setRun={setRun} start={start} setStart={setStart}
        difficulty={difficulty} setDifficulty={setDifficulty}
        update={update} setUpdate={setUpdate}></Board>
    </div>
  );
}

export default App;
