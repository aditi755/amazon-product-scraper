'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductData {
  name: string;
  rating: string;
  numberOfRatings: string;
  price: string;
  discount: string;
  aboutThisItem: string[];
  productInformation: Record<string, string>;
  productImages: string[];
  aiSummary: string;
  bankOffers?: string[];
  manufacturerImages?: string[];
}

export default function Home() {
  const [url, setUrl] = useState<string>('');
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    if (!url) {
      alert('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const data = await response.json();
      if (data.success) {
        setProductData(data.data);
      } else {
        setError('No data found for the given URL');
      }
    } catch (error) {
      setError('Error fetching product data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-500">Amazon Product Scraper</h1>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Amazon product URL"
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            onClick={handleFetchData}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch Data'}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {productData && (
          <div className="mt-4">
            <h2 className="text-xl font-bold text-black">{productData.name}</h2>
            <p className="text-gray-600">⭐ {productData.rating} ({productData.numberOfRatings} ratings)</p>
            <p className="text-lg font-semibold mt-2 text-black">Price: ₹{productData.price}</p>
            <p className="text-green-500 font-semibold">Discount: {productData.discount}</p>

            {/* Bank Offers */}
            <h3 className="mt-4 font-semibold text-black">Bank Offers:</h3>
            {productData.bankOffers && productData.bankOffers.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {productData.bankOffers.map((offer, index) => (
                  <li key={index}>{offer}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No bank offers found for this product.</p>
            )}

            {/* About This Item */}
            <h3 className="mt-4 font-semibold text-black">About This Item:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {productData.aboutThisItem.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {/* Product Images */}
            <h3 className="mt-4 font-semibold text-black">Product Images:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {productData.productImages.slice(0, 6).map((img, index) => (
                <Image width={32} height={32} key={index} src={img} alt="Product" className="w-full h-32 object-cover rounded-lg" />
              ))}
            </div>

            {/* Manufacturer Images */}
            <h3 className="mt-4 font-semibold text-black">Manufacturer Images:</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {productData.manufacturerImages && productData.manufacturerImages.length > 0 ? (
                productData.manufacturerImages
                  .filter((img) => !img.includes('grey-pixel.gif')) // Filter out placeholder images
                  .slice(0, 3)
                  .map((img, index) => (
                    <Image width={32} height={32} key={index} src={img} alt="Manufacturer" className="w-full h-32 object-cover rounded-lg" />
                  ))
              ) : (
                <p className="text-sm text-gray-500">No manufacturer images found.</p>
              )}
            </div>

            {/* AI Summary */}
            <h3 className="mt-4 font-semibold text-black">AI Summary of all customer reviews:</h3>
            <p className="text-sm text-gray-700">{productData.aiSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
