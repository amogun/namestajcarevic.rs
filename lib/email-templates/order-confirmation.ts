import { type Order } from '@/shared/schema';

interface OrderEmailData {
  order: Order;
  items: Array<{
    title: string;
    quantity: number;
    priceCents: number;
  }>;
}

export function generateOrderConfirmationEmail(data: OrderEmailData): string {
  const { order, items } = data;

  // Format date
  const orderDate = order.created_at ? new Date(order.created_at).toLocaleDateString('sr-RS', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : new Date().toLocaleDateString('sr-RS');

  // Generate items rows
  const itemsRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px; border-bottom:1px solid #eee;">${item.title}</td>
          <td align="center" style="padding:8px; border-bottom:1px solid #eee;">${item.quantity}</td>
          <td align="right" style="padding:8px; border-bottom:1px solid #eee;">${(item.priceCents / 100).toLocaleString('sr-RS')} RSD</td>
        </tr>
      `
    )
    .join('');

  // Format estimated total
  const estimatedTotal = `${(order.total_cents / 100).toLocaleString('sr-RS')} RSD`;

  // Parse address (assuming format: "Street, City")
  const addressParts = order.address.split(',').map(s => s.trim());
  const street = addressParts[0] || order.address;
  const city = addressParts[1] || '';

  // Generate notes section if notes exist
  const notesSection = order.notes
    ? `
    <h2 style="font-family:'Playfair Display', Georgia, serif; margin-top:32px;">Vaša napomena</h2>
    <p style="background-color:#f6f0e9; padding:16px; border-radius:4px;">${order.notes}</p>
    `
    : '';

  return `
<div style="background-color:#f6f0e9; padding:32px 16px; font-family:Inter, Arial, sans-serif; color:#352c29;">
  <div style="max-width:640px; margin:0 auto; background-color:#ffffff; padding:32px; border-radius:8px;">

    <h1 style="margin-top:0; margin-bottom:8px; font-family:'Playfair Display', Georgia, serif; color:#352c29;">Nameštaj Carević</h1>
    <p style="margin-top:0; margin-bottom:24px; color:#b88f42; font-weight:600;">Potvrda prijema narudžbine</p>

    <p>Zdravo <strong>${order.customer_name}</strong>,</p>

    <p>Hvala vam na interesovanju za <strong>Nameštaj Carević</strong>. Obaveštavamo vas da smo <strong>uspešno primili vašu narudžbinu</strong>.</p>

    <p style="background-color:#f6f0e9; padding:16px; border-left:4px solid #b88f42;">
      <strong>Važno:</strong> Ova narudžbina još uvek nije konačna. Naš tim će vas <strong>kontaktirati u najkraćem mogućem roku</strong> radi usmene potvrde, dogovora oko detalja i konačne cene.
    </p>

    <h2 style="font-family:'Playfair Display', Georgia, serif; margin-top:32px;">Pregled zahteva</h2>
    <p><strong>Zahtev #${order.id}</strong> (${orderDate})</p>

    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse; margin-top:16px;">
      <thead>
        <tr style="background-color:#f6f0e9;">
          <th align="left" style="border-bottom:1px solid #ddd;">Proizvod / Usluga</th>
          <th align="center" style="border-bottom:1px solid #ddd;">Količina</th>
          <th align="right" style="border-bottom:1px solid #ddd;">Procena cene</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" align="right" style="padding-top:12px;"><strong>Procena ukupno:</strong></td>
          <td align="right" style="padding-top:12px;"><strong>${estimatedTotal}</strong></td>
        </tr>
      </tfoot>
    </table>

    <h2 style="font-family:'Playfair Display', Georgia, serif; margin-top:32px;">Podaci o kupcu</h2>
    <p style="line-height:1.6;">
      ${order.customer_name}<br/>
      ${street}<br/>
      ${city}<br/>
      ${order.phone}<br/>
      ${order.email}
    </p>

    <h2 style="font-family:'Playfair Display', Georgia, serif; margin-top:32px;">Sledeći koraci</h2>
    <ul style="padding-left:18px;">
      <li>Kontaktiraćemo vas telefonom ili putem emaila</li>
      <li>Dogovorićemo detalje, mere i materijale</li>
      <li>Potvrdićemo konačnu cenu i rok izrade</li>
    </ul>

    ${notesSection}

    <p style="margin-top:32px;">Hvala na poverenju,</p>
    <p style="font-family:'Playfair Display', Georgia, serif; font-size:18px; margin-bottom:0;"><strong>Nameštaj Carević</strong></p>

    <p style="font-size:12px; color:#777; margin-top:24px;">© 2025 Nameštaj Carević. Sva prava zadržana.</p>

  </div>
</div>
  `.trim();
}
