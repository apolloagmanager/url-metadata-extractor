const express = require('express');
const { html } = require('html-metadata');

const app = express();
const port = process.env.PORT || 3000;

app.get('/metadata', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }
    
    const metadata = await html(url);
    res.json({
      success: true,
      metadata: {
        title: metadata.general.title,
        description: metadata.general.description,
        image: metadata.general.image,
        siteName: metadata.general.siteName,
        language: metadata.general.language
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to extract metadata' 
    });
  }
});

app.listen(port, () => {
  console.log(`Metadata extractor API running on port ${port}`);
});