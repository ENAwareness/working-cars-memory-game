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
      <h1>🚗Working Car Memory Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
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
