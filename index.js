const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/get-shoti', async (req, res) => {
  try {
    const response = await axios.get('https://shoti.fbbot.org/api/get-shoti');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});