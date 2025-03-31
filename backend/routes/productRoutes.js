const express = require('express');
const scrapeAmazonProduct = require('../utils/scraper');

const router = express.Router();

// POST /api/scrape
router.post('/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required!' });
  }

  console.log(`Scraping URL: ${url}`);
  const data = await scrapeAmazonProduct(url);

  if (data) {
    res.status(200).json({
      success: true,
      data,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Failed to scrape data. Please try again!',
    });
  }
});

module.exports = router;
