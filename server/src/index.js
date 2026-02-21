import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/words', async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Word is required' });
  }
  const word = await prisma.word.create({
    data: { text: text.trim() },
  });
  res.status(201).json(word);
});

app.get('/api/words', async (req, res) => {
  const words = await prisma.word.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });
  res.json(words);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
