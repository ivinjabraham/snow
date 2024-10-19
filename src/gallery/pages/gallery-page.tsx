import React, { useState } from 'react';
import Card from '../components/card';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

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
    <div className="relative flex flex-col items-center h-screen bg-[#dce4ef]" >
      {/* Search Bar with Add Button */}
      <div className="flex justify-center items-center w-full p-6 bg-[#dce4ef] " >
        <div className="flex items-center w-3/4 rounded-full px-2 py-2 shadow-md relative" style={{ backgroundColor: '#5E6D8C' }}>
          <SearchTwoToneIcon className="text-white absolute left-4" />
          <input
            type="text"
            placeholder="Search for a workflow..."
            className="w-full bg-transparent text-white outline-none placeholder-white text-center pl-10"
          />
          <button
            className="ml-4 text-white"
            onClick={addCard}
          >
            <AddCircleTwoToneIcon style={{ fontSize: 30 }} />
          </button>
        </div>
      </div>

      {/* Card Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full max-w-screen-lg justify-items-center">
          {cards.map((card) => (
            <div key={card.id} className="flex justify-center items-center w-full">
              <Card title={card.title} description={card.description} />
            </div>
             ))}
             </div>
    </div>
  );
};

export default App;
