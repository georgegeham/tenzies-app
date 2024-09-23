import React from "react";
export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die-container" onClick={props.handleDice} style={styles}>
            <h2 className="dice" >{props.value}</h2 >
        </div>
    )
}