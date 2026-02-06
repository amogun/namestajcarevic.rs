import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storage } from '@/lib/storage';
import { createOrderSchema } from '@/shared/schema';
import { sendOrderConfirmationEmail } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const input = createOrderSchema.parse(body);

    const order = await storage.createOrder(input);

    // Prepare order items for email with real product details
    const productIds = input.items.map(item => item.productId);
    let productsMap = new Map();

    try {
      const products = await storage.getProductsByIds(productIds);
      products.forEach(p => productsMap.set(p.id, p));
    } catch (e) {
      console.error('[Orders API] Failed to fetch products for email:', e);
      // Continue with placeholders if fetch fails
    }

    const orderItems = input.items.map((item) => {
      const product = productsMap.get(item.productId);
      // Use price from valid product or 0 as fallback
      // ideally we should have price snapshots in order_items but for now we look up current price
      return {
        title: product ? product.title : 'Proizvod',
        quantity: item.quantity,
        priceCents: product ? product.priceCents : 0,
      };
    });

    // Send order confirmation email (async, but await to ensure it sends in serverless)
    // Now safe to call as it catches errors internally
    try {
      const emailResult = await sendOrderConfirmationEmail({
        order: order,
        items: orderItems,
      });
      console.log('[Orders API] Email result:', emailResult);
    } catch (e) {
      console.error('[Orders API] Final catch for email sending:', e);
    }

    return NextResponse.json(
      { success: true, orderId: order.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: error.errors[0].message,
          field: error.errors[0].path.join('.'),
        },
        { status: 400 }
      );
    }

    console.error('Order creation failed:', error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
}