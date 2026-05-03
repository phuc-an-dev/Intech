import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { error } = await resend.emails.send({
    from: 'Intech Global Academy <support@intechisc.com>',
    to,
    replyTo,
    subject,
    html,
  });
  if (error) throw new Error(error.message);
}
