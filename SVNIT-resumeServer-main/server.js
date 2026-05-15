import express from 'express';
import { pool } from './db.js'; 
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes.js'
import authRoutes from './routes/authRoutes.js'
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user-resumes', resumeRoutes);
app.use('/api/auth',authRoutes);

pool.connect(err => {
  if (err) console.log(err);
  console.log("Connected to PostgreSQL ");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
