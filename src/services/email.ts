import { Request, Response } from 'express';
import { sendSignupEmail } from './resend';
import { addUser } from '../models/user';

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    // Store user (in-memory for now)
    addUser({ email, password });
    // Send email to admin
    try {
        await sendSignupEmail(email, password);
        res.status(201).json({ message: 'Signup successful.' });
    } catch (err) {
        res.status(500).json({ message: 'Signup failed to send email.' });
    }
}; 