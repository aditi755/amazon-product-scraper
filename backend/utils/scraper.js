const puppeteer = require('puppeteer');
const generateAISummary = require('./aiSummary');

const scrapeAmazonProduct = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Scrape Product Name
    const name = await page.$eval('#productTitle', (el) => el.innerText.trim());

    // Scrape Rating & Number of Ratings
    const rating = await page.$eval('.a-icon-alt', (el) => el.innerText.trim());
    const numberOfRatings = await page.$eval('#acrCustomerReviewText', (el) =>
      el.innerText.split(' ')[0]
    );

    // Scrape Price & Discount
    const price = await page.$eval('.a-price-whole', (el) => el.innerText);
    const discount = await page.evaluate(() => {
      const el = document.querySelector('.savingsPercentage');
      return el ? el.innerText.trim() : 'No discount';
    });

    // Scrape Bank Offers
    const bankOffers = await page.$$eval(
      '.a-unordered-list.a-nostyle.a-vertical.a-spacing-none.detail-bullet-list li',
      (items) => items.map((el) => el.innerText.trim())
    );

    // Scrape "About This Item"
    const aboutThisItem = await page.$$eval(
      '#feature-bullets ul li',
      (items) => items.map((el) => el.innerText.trim())
    );

    // Scrape Product Information
    const productInformation = await page.$$eval(
      '#productDetails_techSpec_section_1 tr',
      (rows) => {
        const info = {};
        rows.forEach((row) => {
          const key = row.querySelector('th')?.innerText?.trim();
          const value = row.querySelector('td')?.innerText?.trim();
          if (key && value) info[key] = value;
        });
        return info;
      }
    );

    // Scrape Product Images
    const productImages = await page.$$eval(
      '#altImages img',
      (imgs) => imgs.map((img) => img.src.replace('_SS40_', '_SL1000_'))
    );

    // Scrape Manufacturer Images
    const manufacturerImages = await page.$$eval(
      '#aplus img',
      (imgs) => imgs.map((img) => img.src)
    );

    // Scrape Customer Reviews
    const reviews = await page.$$eval(
      '.review-text-content span',
      (items) => items.map((el) => el.innerText.trim()).slice(0, 10) // Get top 10 reviews
    );
    //sned only 5 reviews
    console.log("reviews", reviews, reviews.length)

    // Generate AI summary of customer reviews
    const aiSummary = reviews.length
      ? await generateAISummary(reviews.join('\n\n'))
      : 'No reviews available to summarize';

    await browser.close();

    return {
      name,
      rating,
      numberOfRatings,
      price,
      discount,
      bankOffers,
      aboutThisItem,
      productInformation,
      productImages,
      manufacturerImages,
      aiSummary,
    };
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

module.exports = scrapeAmazonProduct;


// // Test with your provided URL
// // const testUrl = 'https://amzn.in/d/0XhCJk9';

// // scrapeAmazonProduct(testUrl).then((data) => {
// //   console.log('Scraped Data:', data);
// // });
