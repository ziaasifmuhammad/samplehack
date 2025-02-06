// delete-data.mjs
import { createClient } from '@sanity/client';

import dotenv from 'dotenv';

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' })

// Environment variables access karein
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error('Environment variables missing. Please check your .env.local file.');
}

// Sanity client configure karein
const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false, // CDN use na karein taake real-time changes reflect ho
});

// Saari products delete karne ka function
async function deleteAllProducts() {
  try {
    // Saari products fetch karein
    const products = await client.fetch('*[_type == "order"]');

    if (products.length === 0) {
      console.log('Koi products nahi mili.');
      return;
    }

    // Har product ko delete karein
    const deletePromises = products.map((product) =>
      client.delete(product._id)
    );

    // Saare delete operations ko execute karein
    await Promise.all(deletePromises);

    console.log(`Total ${products.length} products delete ho gayi hain.`);
  } catch (error) {
    console.error('Products delete karne mein error:', error);
  }
}

// Function ko call karein
deleteAllProducts();