import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import cors from 'cors';

dotenv.config();

const app = express();
const allowedOrigins = ['https://uptive.vercel.app'];
app.use(cors({
    origin: allowedOrigins
}));
app.use(express.json());

app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 