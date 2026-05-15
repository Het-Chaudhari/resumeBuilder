import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { pool } from '../db.js';

dotenv.config();

const createUser = async (email, password) => {
  try {
    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING',
      [email, password]
    );
    console.log(`Created user: ${email}`);
  } catch (error) {
    console.error(`Failed to create user: ${email}`, error.message);
  }
};

export const seedUsers = async (req, res) => {
  try {
    for (let i = 1; i <= 166; i++) {
      const roll = i.toString().padStart(3, '0');
      const email = `u22ec${roll}@eced.svnit.ac.in`;
      const password = uuidv4();

      await createUser(email, password);
    }

    res.status(200).json({ message: 'All users seeded successfully.' });
  } catch (err) {
    console.error('Error during seeding:', err.message);
    res.status(500).json({ error: 'Failed to seed users.' });
  }
};
