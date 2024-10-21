// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let contacts = []; // In-memory contact storage

// GET request to retrieve contacts
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

// POST request to add a new contact
app.post('/api/contacts', (req, res) => {
  const { name, phone } = req.body;
  const newContact = { id: contacts.length + 1, name, phone };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
