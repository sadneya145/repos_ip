import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you have a CSS file for styles

const SalaryEstimator = () => {
  const [basicSalary, setBasicSalary] = useState('');
  const [netSalary, setNetSalary] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setBasicSalary(e.target.value);
    setNetSalary(null); // Reset net salary when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!basicSalary) {
      setError('Please enter your basic salary.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/calculate-salary', {
        basicSalary: parseFloat(basicSalary),
      });
      setNetSalary(response.data.netSalary);
    } catch (err) {
      console.error('Error calculating salary:', err);
      setError('Error calculating salary. Please try again.');
    }
  };

  return (
    <div className="salary-estimator">
      <h1>Quick Salary Estimator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="basic-salary">Enter Basic Salary:</label>
        <input
          type="number"
          id="basic-salary"
          value={basicSalary}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Calculate</button>
      </form>
      {error && <p className="error">{error}</p>}
      {netSalary !== null && (
        <div className="result">
          <h2>Estimated Net Salary: ${netSalary.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default SalaryEstimator;
