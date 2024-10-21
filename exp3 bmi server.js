const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Calculate BMI with input validation
app.post('/calculate-bmi', (req, res) => {
  const { weight, height } = req.body;

  // Validate weight and height
  if (typeof weight !== 'number' || typeof height !== 'number' || weight <= 0 || height <= 0) {
    return res.status(400).json({ error: 'Invalid weight or height. Weight and height must be positive numbers.' });
  }
  
  // Set reasonable limits for weight and height
  if (weight > 300) {
    return res.status(400).json({ error: 'Weight exceeds the maximum limit of 300 kg.' });
  }
  if (height > 3) {
    return res.status(400).json({ error: 'Height exceeds the maximum limit of 3 m.' });
  }

  // Calculate BMI
  const bmi = weight / (height * height);
  let category = '';

  // Determine BMI category
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obesity';
  }

  res.json({ bmi, category });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
