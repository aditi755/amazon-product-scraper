const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const scrapeRoute = require('./routes/productRoutes');


// Explicitly set the path to .env in the root directory
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });

// Middleware
//app.use(cors({ origin: 'http://localhost:3001' })); // Allow frontend requests adjust as per your frontend port

//if want to allow dev and prod frontend endpoint 
app.use(
  cors({
    origin: ['http://localhost:3001', 'https://amazon-product-scraper-etko.vercel.app']
  })
);

app.use(express.json());
app.use('/api', scrapeRoute);

app.get('/', (req, res) => {
  res.send('Amazon Scraper API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

