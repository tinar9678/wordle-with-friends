import React, {useRef, useState, useEffect} from 'react';
import './App.css';

const TILE_COUNT = 5;
const LINE_COUNT = 6;

function App() {
  const [guesses, setGuesses] = useState(new Array(TILE_COUNT).fill(''));
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState("");
  const currentGuessesIndex = useRef(0);

  useEffect(() => {
    setSolution("HELLO");
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (guesses.includes(solution) || guesses[LINE_COUNT-1] !== '') {
        return;
      }
      const key = e.key;
      const charcode = key.toLowerCase().charCodeAt(0);
      const isLetter = key.length === 1 && (charcode >= 'a'.charCodeAt(0) && charcode <= 'z'.charCodeAt(0));
      if (isLetter && currentGuess.length < TILE_COUNT) {
        // Add the key to the current guess.
        setCurrentGuess(currentGuess+key);
      } else if (e.key === 'Backspace') {
        if (currentGuess.length > 0) {
          setCurrentGuess(currentGuess.slice(0, currentGuess.length-1));
        }
      } else if (e.key === 'Enter') {
        if (currentGuess.length === TILE_COUNT) {
          const guessesCopy = [...guesses];
          guessesCopy[currentGuessesIndex.current] = currentGuess;
          setGuesses(guessesCopy);
          currentGuessesIndex.current+=1;
          setCurrentGuess("");
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [solution, guesses, currentGuess]);

  return (
    <div className="App">
      {
        guesses.map((guessLine, index) => {
          return <Line 
                    key={index} 
                    lineString={currentGuessesIndex === index ? guessLine.padEnd(TILE_COUNT) : guessLine.padEnd(TILE_COUNT)} 
                    solution={solution} 
                    isFinished={index < currentGuessesIndex.current}>
                  </Line>
        })
      }
    </div>
  );
}

function Line({lineString, solution, isFinished}) {
  return (
    <div className='line'>
    {
      lineString.split('').map((character, index) => {
        const tileClassName = "tile";
        if (isFinished) {
          // set classes
        }
        return <div key={index} className={tileClassName}>{character}</div>
      })
    }
  </div>
  )
}

export default App;
