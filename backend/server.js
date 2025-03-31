const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const scrapeRoute = require('./routes/productRoutes');


// Explicitly set the path to .env in the root directory
// dotenv.config({ path: path.resolve(__dirname, './.env') });
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({ origin: 'http://localhost:3001' })); // Allow frontend requests adjust as per your frontend port
app.use(express.json());
app.use('/api', scrapeRoute);

app.get('/', (req, res) => {
  res.send('Amazon Scraper API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

