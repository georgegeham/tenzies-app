import './App.css';
import Dice from './Dice';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
// import Confetti from 'confetti-react/dist/Confetti';
import Confetti from 'confetti-react';
function App() {
  function genDice() {
    let numberArray = [];
    for (let i = 0; i < 10; i++) {
      numberArray.push(genNumber());
    }
    return numberArray
  }
  function genNumber() {
    const randNumber = Math.ceil(Math.random() * 6);
    return {
      id: nanoid(),
      value: randNumber,
      isHeld: false
    };
  }
  //States

  const [dice, setDice] = useState(() => genDice());
  const [tenzie, setTenzie] = useState(false);
  const [rolls, setRolls] = useState(0);

  function reGen() {
    setRolls(prevRoll => prevRoll + 1)
    if (tenzie) {

      setRolls(0);
      setTenzie(false);
      console.log("tenzie is false")
      setDice(genDice);
    } else {
      setDice(prevDice => {
        return prevDice.map(dice => {
          if (dice.isHeld)
            return dice;
          else
            return genNumber();
        })
      })
    }
  }
  function holdDice(diceId) {
    setDice(prevDice => {
      return prevDice.map(dice => dice.id === diceId ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    })
  }
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const sameNumber = dice.every(die => die.value === dice[0].value);
    if (allHeld && sameNumber) {
      setTenzie(true);
    }
  }, [dice])
  // useEffect(() => {
  //   if (tenzie) {
  //     setTenzie(false);
  //   }
  // }, [tenzie])
  const dices = dice.map(number => <Dice value={number.value} key={number.id} handleDice={() => holdDice(number.id)} isHeld={number.isHeld} />);
  return (
    <div className="App">
      {tenzie && <Confetti
        drawShape={ctx => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
        recycle={false}
      />}
      <div className='info'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <span className='roleNumber'>{rolls}</span>
      </div>
      <div className='dice-container'>
        {dices}
      </div>
      <button className='btn' onClick={reGen}>{!tenzie ? "Roll" : "Play Again"}</button>
    </div>
  );
}

export default App;
