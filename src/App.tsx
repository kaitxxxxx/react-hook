import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { CurrentInterface } from './Interface';
import ReactDOM from 'react-dom';

function App() {

  //三目並べ
  const [isNext, setIsNext] = useState(false);
  const [value, setValue] = useState('○');
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleSquare(num: number) {

    //すでに入力済みの場合は処理中断
    if(squares[num] || winner) return;

    setIsNext(!isNext);
    setValue(isNext ? '○' : '×');
    squares[num] = value;
    setSquares(squares);

    console.log(11);

  }

  const winner: string | null = calculateWinner(squares);
  const status = winner ? 'winner'+ winner : `next player ${isNext ? 'x' : '○'}`;

  return (
    <div>
      <span>{status}</span>
      <Board onClick={(i) => handleSquare(i)} squares={squares}/>
    </div>
  )
}

/**
 * 
 * ボードコンポーネント
 */
function Board(
  props: {
    onClick: (num: number) => void
    squares: string[]
  }) {

  function updateSquare(i: number): JSX.Element {
    return <Square onClick={() => props.onClick(i)} value={props.squares[i]}/>;
  }

  return (
    <div className="App">
      <div className="Row">
        {updateSquare(0)}
        {updateSquare(1)}
        {updateSquare(2)}
      </div>
      <div className="Row">
        {updateSquare(3)}
        {updateSquare(4)}
        {updateSquare(5)}
      </div>
      <div className="Row">
        {updateSquare(6)}
        {updateSquare(7)}
        {updateSquare(8)}
      </div>
    </div>
  );
}

/**
 * 一つ一つの正方形
 */
function Square(
  props: { 
    onClick: () => void;
    value: string;
  }) {
  return (
    <button className="square" value='' 
      onClick={props.onClick}
    >
      <span className="number">
        {props.value}
      </span>
    </button>
  )
}

/**
 * 勝ちかどうか判定する。
 */

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;

}


export default App;
// ReactDOM.render(<App />, document.getElementById("root"));
