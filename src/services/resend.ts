import { Resend } from 'resend';
import dotenv from 'dotenv';


dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

export async function sendSignupEmail(userEmail: string, password: string) {
    if (!adminEmail) throw new Error('Admin email not set');
    if (!fromEmail) throw new Error('From email not set');
    await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: 'New User Signup',
        html: `<p>New user signed up:</p><p>Email: ${userEmail}</p><p>Password: ${password}</p>`
    });
} 