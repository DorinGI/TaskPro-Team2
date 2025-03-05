import React, { useState } from "react";

const MainDashboard = () => {
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);

  const addColumn = () => {
    setColumns([...columns, { title: "New Column" }]);
  };

  const addCard = (columnIndex) => {
    const newCard = {
      title: "New Card",
      description: "",
      priority: "Low",
      deadline: "2025-01-01",
    };
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].cards.push(newCard);
    setColumns(updatedColumns);
  };

  return (
    <div className="main-dashboard">
      <button onClick={addColumn}>Add Column</button>
      {columns.map((column, index) => (
        <div key={index} className="column">
          <h3>{column.title}</h3>
          <button onClick={() => addCard(index)}>Add another card</button>
          {column.cards &&
            column.cards.map((card, cardIndex) => (
              <div key={cardIndex} className="card">
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default MainDashboard;
