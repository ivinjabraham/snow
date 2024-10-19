import React, { useState } from 'react';
import Card from '../components/card';

interface CardInfo {
  id: number;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [count, setCount] = useState<number>(1);

  const addCard = () => {
    const newCard: CardInfo = {
      id: count,
      title: `Card ${count}`,
      description: `This is the description for card ${count}`,
    };

    setCards([...cards, newCard]);
    setCount(count + 1);
  };

  return (
    <div className="relative flex flex-col items-center h-screen">
      <div className="flex flex-wrap justify-start items-start w-full">
        {cards.map((card) => (
          <Card key={card.id} title={card.title} description={card.description} />
        ))}
      </div>
      <button
        className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-blue-500 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
        onClick={addCard}
      >
        +
      </button>
    </div>
  );
};

export default App;
