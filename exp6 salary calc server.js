const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Calculate net salary (for example, deducting a fixed percentage)
app.post('/calculate-salary', (req, res) => {
  const { basicSalary } = req.body;
  
  if (typeof basicSalary !== 'number' || basicSalary < 0) {
    return res.status(400).json({ error: 'Invalid basic salary.' });
  }

  // Example calculation: deduct 20% as tax
  const taxRate = 0.20;
  const netSalary = basicSalary * (1 - taxRate);

  res.json({ netSalary });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
