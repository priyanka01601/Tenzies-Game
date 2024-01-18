import React from "react";
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function Main(){
    const [dice,setDice]=React.useState(allNewDice())
    const[tenzies,setTenzies]=React.useState(false)
    React.useEffect(()=>{
        const allHeld=dice.every(die=>die.isHeld)
        const firstValue=dice[0].value
        const allSame=dice.every(die=>die.value===firstValue);
        if(allSame && allHeld)
        {   
            setTenzies(true)
           
        }
        // console.log("Dice state changed")
    },[dice])
    function holdDice(id)
    {
        setDice(oldDice=>oldDice.map(die=>{
            return die.id===id?{...die,isHeld:!die.isHeld}:die
        }))
        // console.log(id);
    }
    function allNewDice()
    {
         const dicearray=[];
            for(let i=1;i<=10;i++)
            {
                dicearray.push(
                    generateNewDice());
            }
            return dicearray
    
        
       
    }
    function generateNewDice()
    {
        return {
                
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()
    }

    }

    function RollDice(){
        if(!tenzies)
        {
            setDice(oldDice=>oldDice.map(die=>{
                return die.isHeld===true?die:generateNewDice();
            
            }))
        }
        else{
            setTenzies(false);
            setDice(allNewDice());
        }
        
        // setDice(allNewDice());
    }
    const diceElements=dice.map(die=>
            <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>
    )
    
    return(
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die--container">
            {diceElements}
            {/* <Die value="1"/>
            <Die value="1"/>
            <Die value="1"/>
            <Die value="1"/>
            <Die value="1"/>
            <Die value="1"/>
            <Die value="1"/>
            <Die value="1"/>
            <Die value="1"/>
            <Die value="1"/> */}
            </div>
           <button className="RollButton" onClick={RollDice}>{!tenzies?"Roll":"New Game"}</button>
           
        </main>
    )
}