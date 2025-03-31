'use client';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/product';
import {API_URL} from '../utils/config';

export default function AllProducts() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch directly from backend route
        console.log("API_URL", API_URL);
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className=" bg-white mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <img 
              src={product.productImages[0]}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold text-black">{product.name}</h2>
            <p className="text-gray-600">Rating: {product.rating} ({product.numberOfRatings})</p>
            <p className="text-lg font-bold text-green-600">₹{product.price}</p>
            <p className="text-sm text-red-500">{product.discount} off</p>
            <p className="text-sm text-black">{product.aboutThisItem} off</p>

          </div>
        ))}
      </div>
    </div>
  );
}
