const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
app.use(express.json());

app.post('/openai', async (req, res) => {
  try {
    const { prompt } = req.body;
const response = await axios.post(
  'https://api.openai.com/v1/completions',
  {
    model: 'gpt-4.1-nano',
    prompt,
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  }
);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3131, () => {
  console.log('Server listening on port 3131');
});