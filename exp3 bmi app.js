import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you have a CSS file for styles

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'weight') {
      setWeight(value);
    } else if (id === 'height') {
      setHeight(value);
    }
    setBmiResult(null); // Reset BMI result when input changes
    setCategory('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!weight || !height) {
      setError('Please enter both weight and height.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/calculate-bmi', {
        weight: parseFloat(weight),
        height: parseFloat(height),
      });
      setBmiResult(response.data.bmi);
      setCategory(response.data.category);
    } catch (err) {
      console.error('Error calculating BMI:', err);
      setError('Error calculating BMI. Please try again.');
    }
  };

  return (
    <div className="bmi-calculator">
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="height">Height (m):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Calculate BMI</button>
      </form>
      {error && <p className="error">{error}</p>}
      {bmiResult !== null && (
        <div className="result">
          <h2>Your BMI: {bmiResult.toFixed(2)}</h2>
          <h3>Health Category: {category}</h3>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
