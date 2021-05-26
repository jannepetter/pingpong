import React from 'react';
import '../css/scorepanel.css'

const ScorePanel = ({ scores, show }) => {

    if (show !== true || !scores) {
        return null
    }

    return (
        <div className="scorePanelContainer">
            <h3>Highscores</h3>
            {scores.map(p => <div className="scoreInfoDiv" key={p._id}><div className="scoreInfoName">{p.playername}</div><div className="scoreInfoScore">{": "}{p.score}</div></div>)}

        </div>)
}

export default ScorePanel