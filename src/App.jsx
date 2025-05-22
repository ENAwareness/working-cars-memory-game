import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';

// shuffle an array
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetch('/working-cars.json')
      .then((res) => res.json())
      .then((data) => setCards(shuffle(data)))
      .catch((err) => console.error('Failed to load', err));
  }, []);

  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      setScore(0);
      setClickedIds([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setBestScore((prev) => (newScore > prev ? newScore : prev));
      setClickedIds([...clickedIds, id]);
    }

    setCards(shuffle(cards));
  };

  return (
    <div className="app">
      <div className="header">
        <div className="header-left-section">
          <h1>🚗Working Car Memory Game</h1>
          <p className="game-instructions">
            Get points by clicking on an image but don't click on any more than once!
          </p>
        </div>
        <div className="header-right-section">
          <Scoreboard score={score} bestScore={bestScore} />
        </div>
      </div>
      <div className="card-grid">
        {cards.map((car) => (
          <Card
            key={car.id}
            image={car.image}
            name={car.name}
            onClick={() => handleCardClick(car.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
