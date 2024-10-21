import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([{ name: '', quantity: 1, cost: 0 }]);
  const [totalCost, setTotalCost] = useState(0);

  const handleItemChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, cost: 0 }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/calculate', { items });
      setTotalCost(response.data.totalCost);
    } catch (error) {
      console.error('Error calculating total cost:', error);
    }
  };

  return (
    <div className="app">
      <h1>Bill Calculator</h1>
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <input
              type="text"
              name="name"
              value={item.name}
              placeholder="Item Name"
              onChange={(event) => handleItemChange(index, event)}
              required
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              placeholder="Quantity"
              min="1"
              onChange={(event) => handleItemChange(index, event)}
              required
            />
            <input
              type="number"
              name="cost"
              value={item.cost}
              placeholder="Cost per Item"
              min="0"
              onChange={(event) => handleItemChange(index, event)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit">Calculate Total</button>
      </form>
      <h2>Total Cost: ${totalCost}</h2>
    </div>
  );
}

export default App;
