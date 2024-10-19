import React, { useState } from 'react';
import Card from '../components/card';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

interface CardInfo {
  id: number;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [count, setCount] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCard = () => {
    if (projectName) {
      const newCard: CardInfo = {
        id: count,
        title: projectName,
        description: `This is the description for ${projectName}`,
      };

      setCards([...cards, newCard]);
      setCount(count + 1);
      setProjectName(''); // Reset the project name
      handleClose(); // Close the dialog
    }
  };

  return (
    <div className="relative flex flex-col items-center h-screen bg-[#dce4ef]">
      {/* Search Bar with Add Button */}
      <div className="flex justify-center items-center w-full p-6 bg-[#dce4ef]">
        <div className="flex items-center w-3/4 rounded-full px-2 py-2 shadow-md relative" style={{ backgroundColor: '#5E6D8C' }}>
          <SearchTwoToneIcon className="text-white absolute left-4" />
          <input
            type="text"
            placeholder="Search for a workflow..."
            className="w-full bg-transparent text-white outline-none placeholder-white text-center pl-10"
          />
          <button className="ml-4 text-white" onClick={handleClickOpen}>
            <AddCircleTwoToneIcon style={{ fontSize: 30 }} />
          </button>
        </div>
      </div>

      {/* Dialog for Adding Card */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#5E6D8C', // Background color for the dialog
            color: 'white', // Text color for the dialog
          },
        }}
      >
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the project name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="projectName"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            InputProps={{
              style: {
                color: 'white', 
                backgroundColor: '#41506D', 
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white', // Label color
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#dce4ef' }}>
            Cancel
          </Button>
          <Button onClick={handleAddCard} style={{ color: '#dce4ef' }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Card Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full max-w-screen-lg justify-items-center">
        {cards.map((card) => (
          <div key={card.id} className="flex justify-center items-center w-full">
            <Card id={card.id} title={card.title} description={card.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
