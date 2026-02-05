interface ContactEmailData {
  customerName: string;
  email: string;
  phone?: string;
  message: string;
  messageId: string | number;
  createdAt: Date;
}

export function generateContactReplyEmail(data: ContactEmailData): string {
  const { customerName, email, phone, message, messageId, createdAt } = data;

  // Format date
  const messageDate = new Date(createdAt).toLocaleDateString('sr-RS', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<div style="background-color:#f6f0e9; padding:32px 16px; font-family:Inter, Arial, sans-serif; color:#352c29;">
  <div style="max-width:640px; margin:0 auto; background-color:#ffffff; padding:32px; border-radius:8px;">

    <h1 style="margin-top:0; margin-bottom:8px; font-family:'Playfair Display', Georgia, serif; color:#352c29;">Nameštaj Carević</h1>
    <p style="margin-top:0; margin-bottom:24px; color:#b88f42; font-weight:600;">Potvrda prijema poruke</p>

    <p>Zdravo <strong>${customerName}</strong>,</p>

    <p>Hvala vam što ste nas kontaktirali. Obaveštavamo vas da smo <strong>uspešno primili vašu poruku</strong>.</p>

    <p style="background-color:#f6f0e9; padding:16px; border-left:4px solid #b88f42;">
      <strong>Važno:</strong> Naš tim će vas <strong>kontaktirati u najkraćem mogućem roku</strong> kako bismo odgovorili na vaš upit i pružili vam sve potrebne informacije.
    </p>

    <h2 style="font-family:'Playfair Display', Georgia, serif; margin-top:32px;">Vaša poruka</h2>
    <p><strong>Poruka #${messageId}</strong> (${messageDate})</p>

    <div style="background-color:#f6f0e9; padding:16px; border-radius:4px; margin-top:16px;">
      <p style="margin:0; white-space:pre-wrap;">${message}</p>
    </div>

    <h2 style="font-family:'Playfair Display', Georgia, serif; margin-top:32px;">Vaši kontakt podaci</h2>
    <p style="line-height:1.6;">
      ${customerName}<br/>
      ${email}${phone ? `<br/>${phone}` : ''}
    </p>

    <h2 style="font-family:'Playfair Display', Georgia, serif; margin-top:32px;">Sledeći koraci</h2>
    <ul style="padding-left:18px;">
      <li>Pregledaćemo vašu poruku</li>
      <li>Kontaktiraćemo vas telefonom ili putem emaila</li>
      <li>Odgovorićemo na sva vaša pitanja</li>
    </ul>

    <p style="margin-top:32px;">Hvala na poverenju,</p>
    <p style="font-family:'Playfair Display', Georgia, serif; font-size:18px; margin-bottom:0;"><strong>Nameštaj Carević</strong></p>

    <hr style="border:none; border-top:1px solid #ddd; margin:32px 0;" />

    <h3 style="font-family:'Playfair Display', Georgia, serif; margin-top:24px; margin-bottom:12px;">Kontaktirajte nas</h3>
    <p style="line-height:1.6; margin:0;">
      <strong>Email:</strong> namestajcarevic@gmail.com<br/>
      <strong>Adresa:</strong> Nameštaj Carević, Srbija
    </p>

    <p style="font-size:12px; color:#777; margin-top:24px;">© 2025 Nameštaj Carević. Sva prava zadržana.</p>

  </div>
</div>
  `.trim();
}
