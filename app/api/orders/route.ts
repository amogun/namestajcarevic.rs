import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storage } from '@/lib/storage';
import { createOrderSchema } from '@/shared/schema';

async function sendOrderEmail(order: any) {
  // If env vars are set, use nodemailer, otherwise just log
  if (process.env.EMAIL_SMTP && process.env.SALON_EMAIL) {
    try {
      // Very basic SMTP setup parsing (assuming standard connection string or similar)
      // For now, let's just log that we would send it
      console.log(`[EMAIL] To Customer (${order.email}) & Salon (${process.env.SALON_EMAIL}): Order #${order.id} received for ${order.totalCents / 100} RSD.`);

      // Actual implementation would go here with nodemailer.createTransport(...)
    } catch (e) {
      console.error('Failed to send email:', e);
    }
  } else {
    console.log(`[MOCK EMAIL] To: ${order.email}, Subject: Potvrda porudžbine #${order.id}`);
    console.log(`[MOCK EMAIL] To Salon: Nova porudžbina #${order.id}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const input = createOrderSchema.parse(body);

    const order = await storage.createOrder(input);

    // Send email (async, don't block response)
    sendOrderEmail(order).catch(console.error);

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