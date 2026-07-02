import { useState, useRef, useEffect } from 'react'
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

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    if(!rootRef.current) {
      return;
    }

    const options = {
      root: rootRef.current as HTMLDivElement, 
      rootMargin: '0px',
      threshold: 1
    }
    const observer = new IntersectionObserver((entries) => {
      console.log('Entries', entries);
      if(entries[0].isIntersecting) {
        const element = entries[0].target;
        console.log(`The intersecting element ${element.innerHTML}`)
      }
    }, options)

    if(triggerRef.current) {
      observer.observe(triggerRef.current as HTMLLIElement)
    }

    return () => {
      observer.disconnect();
    }
  }, []);

  return (
    <div className="container" ref={rootRef}>
      <ol>
        {quotes.map((quote: string, _: number) => (
          <li key={quote} className="list-item">
            {quote}
          </li>
        ))}
        <li className="trigger" ref={triggerRef}>Load more ...</li>
      </ol>
    </div>
  )
}

export default App
