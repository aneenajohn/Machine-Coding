import { useState } from 'react'
import './App.css'

function App() {
  
  const quotes: string[] = [
    "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Don’t count the days, make the days count. – Muhammad Ali",
    "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
    "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "Strive not to be a success, but rather to be of value. – Albert Einstein",
    "Dream big and dare to fail. – Norman Vaughan",
  ];

  return (
    <div className="container">
      {/* <ol>
        {quotes.map((quote: string, index: number) => {
          return (
            <li key={quote} className="list-item">
              {quote}
            </li>
          )
        })}
      </ol> */}
      <ol>
        {quotes.map((quote: string, _: number) => (
          <li key={quote} className="list-item">
            {quote}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default App
