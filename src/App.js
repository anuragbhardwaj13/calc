import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import React,{useState,useEffect,useStyles} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

function App() {
  const useStyles = makeStyles({
    button: {
      background: '#51c4d3',
      color: 'white',
      width:'90px',
      padding: '5px',
      margin:'5px'


      
    },
    
  });
  const classes = useStyles();
  let [oldExpression, setOldExpression] = useState("");
  let [expression, setExpression] = useState("0");
  let numerics = new Set("0123456789.");
  let operators = new Set("+-*/%()");
  let [prev, setPrev] = useState("ANS");
  let buttons = [
    "(",
    ")",
    "%",
    "CE",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];
  let evaluateExpression = function () {
    let evalution = eval(expression);
    setOldExpression(expression + " =");
    setExpression(String(evalution));
    // expression = evalution;
    setPrev("ANS");
  };

  let putNumerics = function (value) {
    if (prev == "ANS") {
      setOldExpression("Ans = " + expression);
      setExpression(value);
    } else {
      setExpression(expression + value);
    }
    setPrev("NUM");
  };

  let putOperator = function (value) {
    if (prev != "OP") {
      setExpression(expression + value);
    } else {
      setExpression(expression.slice(0, -1) + value);
    }
    setPrev("OP");
  };

  let putDelete = function () {
    if (expression.length >= 1) {
      setExpression(expression.slice(0, -1));
    }
    setPrev("DEL");
  };
  let handleKeyUp = function (event) {
    console.log(event.key);
    if (event.key === "Backspace") {
      putDelete();
    } else if (numerics.has(event.key)) {
      putNumerics(event.key);
    } else if (operators.has(event.key)) {
      putOperator(event.key);
    } else if (event.key === "Enter") {
      evaluateExpression();
    }
  };

  return (
    <div className="App">
      <h1 >Calculator</h1>
      <div className="textArea" tabIndex={0} onKeyUp={handleKeyUp}>
        <h6>{oldExpression}</h6>
        <h1>{expression}</h1>
      </div>
    
      <div className="buttonsPart">
      {buttons.map(function (buttonValue, idx) {
          return (
            <Button className={classes.button} size="small" variant="contained" disableElevation
            onClick={function () {
              if (buttonValue === "CE") {
                putDelete();
              } else if (numerics.has(buttonValue)) {
                putNumerics(buttonValue);
              } else if (operators.has(buttonValue)) {
                putOperator(buttonValue);
              } else if (buttonValue === "=") {
                evaluateExpression();
              }
            }}
            >
              {buttonValue}
            </Button>
          );
        })}

      </div>
    
    </div>
  );
}

export default App;
