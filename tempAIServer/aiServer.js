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

// New endpoint for Google Gemini
app.post('/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Use API key from environment variable or the one from the curl example
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyADsYf47wjeqYvRARDrrKHNlYZs_mqCn7g';
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{ text: prompt }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Gemini API response received');
    
    // Extract and log the text content from the structured response
    if (response.data.candidates && 
        response.data.candidates[0] && 
        response.data.candidates[0].content && 
        response.data.candidates[0].content.parts && 
        response.data.candidates[0].content.parts[0] &&
        response.data.candidates[0].content.parts[0].text) {
      console.log('Response text:', response.data.candidates[0].content.parts[0].text);
    }
    
    // Format the response to include simpler access to the text content
    const formattedResponse = {
      ...response.data,
      // Add a convenience field with just the text content
      text: response.data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      // Include metadata about the model and tokens
      modelVersion: response.data.modelVersion,
      tokenUsage: response.data.usageMetadata
    };
    
    res.json(formattedResponse);
  } catch (error) {
    console.error('Error from Gemini API:', error.message);
    
    // Enhanced error reporting
    if (error.code === 'ECONNREFUSED') {
      console.error('Failed to connect to Gemini API - check your internet connection');
      return res.status(503).json({ error: 'Failed to connect to Gemini API service' });
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