
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
  const { items } = req.body;

  // Calculate the total cost based on quantity and cost per item
  const totalCost = items.reduce((total, item) => {
    return total + item.quantity * item.cost;
  }, 0);

  res.json({ totalCost });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
