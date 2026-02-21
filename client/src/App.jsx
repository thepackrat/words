import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [word, setWord] = useState('');
  const [words, setWords] = useState(null);

  async function addWord() {
    const trimmed = word.trim();
    if (!trimmed) return;
    await axios.post('/api/words', { text: trimmed });
    setWord('');
  }

  async function showWords() {
    const res = await axios.get('/api/words');
    setWords(res.data);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addWord();
  }

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Words</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a word"
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button onClick={addWord} style={{ padding: '8px 16px', fontSize: 16 }}>
          Add
        </button>
        <button onClick={showWords} style={{ padding: '8px 16px', fontSize: 16 }}>
          Show
        </button>
      </div>
      {words && (
        <ul style={{ marginTop: 16 }}>
          {words.map((w) => (
            <li key={w.id}>
              {w.text} <small style={{ color: '#888' }}>({new Date(w.createdAt).toLocaleString()})</small>
            </li>
          ))}
          {words.length === 0 && <li>No words yet.</li>}
        </ul>
      )}
    </div>
  );
}
