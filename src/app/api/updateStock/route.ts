// src/app/api/updateStock/route.ts
import { client } from '../../../sanity/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity } = await req.json();

    // Fetch the current stock quantity
    const product = await client.getDocument(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const currentStock = product.stockQuantity;

    if (currentStock < quantity) {
      return NextResponse.json(
        { error: `Only ${currentStock} items available in stock.` },
        { status: 400 }
      );
    }

    // Update the stock quantity
    await client
      .patch(productId)
      .set({ stockQuantity: currentStock - quantity })
      .commit();

    return NextResponse.json({ message: 'Stock updated successfully!' });
  } catch (error) {
    console.error('Error in updateStock API:', error);
    return NextResponse.json({ error: 'Update failed', details: (error as Error).message }, { status: 500 });
  }
}
