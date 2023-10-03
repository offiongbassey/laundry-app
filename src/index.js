import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { responseHandler } from './helpers/responseHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    responseHandler(res, 200, true, 'Backend Successfully Connected');
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Sever is running on port ${ PORT }`);
});
