# Amazon Product Scraper with AI-Powered customer reviews Summarizer

A robust web scraper that extracts product data from Amazon using **Node.js, Express, Puppeteer, and TypeScript**. The application features a **Next.js frontend** for a smooth user experience and leverages the **Google Gemini AI API** to generate insightful summaries of customer reviews.

### How it works : watch demo [here](https://www.loom.com/share/92e6730ebf794e0e864f810c5bbffb66?sid=7332776b-1e29-4c45-956b-d99917662ad1)
---

## Features

- Scrapes product data from Amazon efficiently.  
- Extracts key product details, including name, price, rating, and more.  
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
- **Database:** MongoDB (optional for persistent data)

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
```

---


