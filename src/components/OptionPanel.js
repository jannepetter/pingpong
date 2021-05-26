import React from 'react';
import '../css/OptionPanel.css'


const OptionPanel = (props) => {

    // if (props.start) {
    //     return (<div></div>)
    // }
    const handleScores = () => {
        props.setShow(!props.show)
    }
    return (
        <div className='optionpanelcontainer'>
            <div >
                difficulty:
                <input disabled={props.start} onChange={e => props.setDifficulty(e.target.value)}
                    name="jee" type="radio" id="radio1" defaultChecked value="easy"></input>
                <label htmlFor="radio1" >easy</label>

                <input disabled={props.start} onChange={e => props.setDifficulty(e.target.value)}
                    name="jee" type="radio" id="radio2" value="normal"></input>
                <label htmlFor="radio2" >normal</label>

                <input disabled={props.start} onChange={e => props.setDifficulty(e.target.value)}
                    name="jee" type="radio" id="radio3" value="hard"></input>
                <label htmlFor="radio3" >real pro</label>
                <button hidden={props.start} className="scoreButton" onClick={() => handleScores()}>scores</button>

            </div>
        </div>)
}

export default OptionPanel