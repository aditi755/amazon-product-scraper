# Amazon Product Scraper with AI-Powered customer reviews Summarizer

A robust web scraper that extracts product data from Amazon using **Node.js, Express, Puppeteer, and TypeScript**. The application features a **Next.js frontend** for a smooth user experience and leverages the **Google Gemini AI API** to generate insightful summaries of customer reviews.

### How it works : watch demo [here](https://www.loom.com/share/1c0bd390c85d469d80806e1be541fa2b?sid=f84a2559-5e06-4db1-8719-75ac9d096ec7)
Live link: https://amazon-product-scraper-etko.vercel.app

Note: Puppeteer works locally because it downloads Chrome automatically, but in production (on Vercel), serverless environments don't include a pre-installed Chrome binary. As a result, the scraper might not work in production in most cases. To fix this in the future, I plan to use @sparticuz/chromium, a lightweight version of Chromium designed for AWS Lambda and Vercel, along with puppeteer-core to ensure seamless deployment.

![Screenshot (146)](https://github.com/user-attachments/assets/68d5291c-d197-47cb-92d6-02452b0938cd)

---

## Features

- Scrapes product data from Amazon efficiently.  
- Extracts key product details, including name, price, rating, and more.
- Saves the extracted data as well.
- Generates AI-powered review summaries with Google Gemini API.  
- Displays extracted data on a clean and responsive Next.js frontend.  
- Supports bank offers, manufacturer images, and additional information.

---

##  Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Components:** TailwindCSS

### Backend
- **Server:** Node.js + Express.js
- **Scraper:** Puppeteer for web scraping
- **AI API:** Google Gemini API for review summaries
- **Database** Mongodb

## Setup 
```
git clone https://github.com/aditi755/amazon-product-scraper.git
# frontend install
cd amazon-product-scraper
npm install
# Backend
cd backend
npm install
```
- Create a .env file in the root directory and add the following and adjust .env file configuration if reuired
```
GEMINI_API_KEY=your-gemini-api-key
PORT=5000
MONGO_URI=your_db_key
```

- To run frontend
- ```
  npm run dev
  ```

- to run backend
- ```
  cd backend
  node server.js
  ```
---


