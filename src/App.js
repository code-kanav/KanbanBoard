import React, { useState, useEffect } from 'react';
import DisplayOptions from './components/DisplayOptions';
import SortOptions from './components/SortOptions';
import KanbanBoard from './components/KanbanBoard';
import Navbar from './components/Navbar';
import "./global.css"
function App() {
  const [tickets, setTickets] = useState([]);
  const [displayOption, setDisplayOption] = useState('status'); // Default display option
  const [sortOption, setSortOption] = useState('priority'); // Default sort option

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => setTickets(data));
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <DisplayOptions displayOption={displayOption} setDisplayOption={setDisplayOption} />
      <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
      <KanbanBoard tickets={tickets.tickets} users={tickets.users} displayOption={displayOption} sortOption={sortOption} />
    </div>
  );
}

export default App;
