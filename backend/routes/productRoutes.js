const express = require('express');
const scrapeAmazonProduct = require('../utils/scraper');
const Product = require('../models/Product');

const router = express.Router();

// POST /api/scrape
router.post('/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required!' });
  }

  console.log(`🔎 Scraping URL: ${url}`);
  const data = await scrapeAmazonProduct(url);

  if (data) {
    try {
      // Save scraped data to MongoDB
      const newProduct = new Product(data);
      await newProduct.save();

      res.status(200).json({
        success: true,
        message: '✅ Product data scraped and saved successfully!',
        data: newProduct,
      });
    } catch (err) {
      console.error('❌ Error saving data:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to save data in MongoDB!',
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: 'Failed to scrape data. Please try again!',
    });
  }
});

// GET /api/products - Get all saved products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products.',
    });
  }
});

module.exports = router;
