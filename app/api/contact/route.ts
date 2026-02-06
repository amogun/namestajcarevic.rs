import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storage } from '@/lib/storage';
import { createContactMessageSchema } from '@/shared/schema';
import { sendContactReplyEmail } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const input = createContactMessageSchema.parse(body);

    const message = await storage.createContactMessage(input);

    // Send auto-reply email (await to ensure it sends in serverless)
    try {
      const emailResult = await sendContactReplyEmail({
        customerName: message.name,
        email: message.email,
        message: message.message,
        messageId: message.id, // Pass UUID string directly
        createdAt: message.created_at ? new Date(message.created_at) : new Date(),
      });
      console.log('[Contact API] Email result:', emailResult);
    } catch (error) {
      console.error('[Contact API] Failed to send reply email:', error);
    }

    return NextResponse.json(
      { success: true, messageId: message.id },
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

    console.error('Contact message creation failed:', error);
    return NextResponse.json(
      { message: 'Failed to create contact message' },
      { status: 500 }
    );
  }
}
