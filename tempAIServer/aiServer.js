const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

// More detailed CORS setup
app.use(cors({
  origin: '*', // Allow all origins for testing. In production, specify your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' })); // Increase payload limit for large prompts

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI server is running' });
});

app.post('/openai', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-mini',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
      }
    );
    
    console.log('OpenAI API response received');
    console.log(response.data.choices[0].message.content); // Log the response content
    res.json(response.data);
  } catch (error) {
    console.error('Error from OpenAI API:', error.message);
    
    // Enhanced error reporting
    if (error.code === 'ECONNREFUSED') {
      console.error('Failed to connect to OpenAI API - check your internet connection');
      return res.status(503).json({ error: 'Failed to connect to OpenAI API service' });
    }
    
    if (error.response) {
      console.error('Error details:', error.response.data);
      return res.status(error.response.status).json({ error: error.response.data });
    }
    
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3131;
app.listen(PORT, '0.0.0.0', () => { // Listen on all network interfaces
  console.log(`AI Server listening on port ${PORT}`);
  console.log(`Test server with: http://localhost:${PORT}/health`);
});