const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/api/generate-voice', async (req, res) => {
    try {
        const { text, voice } = req.body;
        
        // Call Speechify API (example - check their actual API docs)
        const response = await axios.post('https://api.speechify.com/generate', {
            text: text,
            voice: voice
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.SPEECHIFY_API_KEY}`
            }
        });
        
        res.json({ audioUrl: response.data.audioUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate speech' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));