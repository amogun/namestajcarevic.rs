import { Resend } from 'resend';
import { generateOrderConfirmationEmail } from './email-templates/order-confirmation';
import { generateContactReplyEmail } from './email-templates/contact-reply';
import type { Order } from '@/shared/schema';

// Initialize Resend client lazily to prevent crash if env var is missing
const getResend = () => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.warn('[RESEND] RESEND_API_KEY is missing. Email sending will be skipped.');
        return null;
    }
    return new Resend(apiKey);
};

const SALON_BCC_LIST = [
    'carevicnamestaj@gmail.com',
    'radecarevic2018@gmail.com',
    'dcarevic.kg@gmail.com'
];

interface OrderEmailData {
    order: Order;
    items: Array<{
        title: string;
        quantity: number;
        priceCents: number;
    }>;
}

interface ContactEmailData {
    customerName: string;
    email: string;
    phone?: string;
    message: string;
    messageId: string | number;
    createdAt: Date;
}

/**
 * Send order confirmation email to customer
 */
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
    try {
        const resend = getResend();
        if (!resend) {
            return { warning: 'Email skipped - no API key' };
        }

        const htmlContent = generateOrderConfirmationEmail(data);

        const result = await resend.emails.send({
            from: 'ponuda@naruci.namestajcarevic.online',
            to: data.order.email,
            bcc: SALON_BCC_LIST,
            subject: `Potvrda prijema narudžbine #${data.order.id}`,
            html: htmlContent,
        });

        console.log(`[RESEND] Order confirmation email sent to ${data.order.email} (BCC'd salon):`, result);
        return result;
    } catch (error) {
        console.error('[RESEND] Failed to send order confirmation email:', error);
        // Don't throw, just log to prevent breaking the order flow
        return { error: error instanceof Error ? error.message : String(error) };
    }
}

/**
 * Send contact form reply email to customer
 */
export async function sendContactReplyEmail(data: ContactEmailData) {
    try {
        const resend = getResend();
        if (!resend) {
            return { warning: 'Email skipped - no API key' };
        }

        const htmlContent = generateContactReplyEmail(data);

        const result = await resend.emails.send({
            from: 'kontakt@naruci.namestajcarevic.online',
            to: data.email,
            bcc: SALON_BCC_LIST,
            subject: `Potvrda prijema poruke #${data.messageId}`,
            html: htmlContent,
        });

        console.log(`[RESEND] Contact reply email sent to ${data.email} (BCC'd salon):`, result);
        return result;
    } catch (error) {
        console.error('[RESEND] Failed to send contact reply email:', error);
        // Don't throw, just log
        return { error: error instanceof Error ? error.message : String(error) };
    }
}
