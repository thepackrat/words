import { useState } from 'react';
import axios from 'axios';

function sanitize(input) {
  return input.replace(/[^a-zA-Z0-9-]/g, '');
}

export default function App() {
  const [word, setWord] = useState('');
  const [words, setWords] = useState(null);

  async function addWord() {
    const clean = sanitize(word.trim());
    if (!clean) return;
    await axios.post('/api/words', { text: clean });
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
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif' }}>
      <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '3rem', fontWeight: 400, margin: '0 0 0.5rem' }}>
        words
      </h1>
      <p style={{ color: '#666', lineHeight: 1.5, marginBottom: '1.5rem' }}>
        A quiet collector of words found wandering the internet.
        Each one noted, timestamped, and preserved — because every word
        deserves to be remembered at least once.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(sanitize(e.target.value))}
          onKeyDown={handleKeyDown}
          placeholder="Enter a word"
          style={{ flex: 1, padding: '8px 12px', fontSize: 14, border: '1px solid #ccc', borderRadius: 4, outline: 'none' }}
        />
        <button onClick={addWord} style={{
          padding: '8px 20px', fontSize: 14, fontWeight: 500,
          background: '#222', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer',
        }}>
          Add
        </button>
        <button onClick={showWords} style={{
          padding: '8px 20px', fontSize: 14, fontWeight: 500,
          background: '#fff', color: '#222', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer',
        }}>
          Show
        </button>
      </div>
      {words && (
        <div style={{
          marginTop: 16,
          border: '1px solid #ddd',
          borderRadius: 6,
          padding: 16,
          background: '#fafafa',
        }}>
          {words.length === 0 ? (
            <p style={{ color: '#999', margin: 0 }}>No words yet.</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {words.map((w) => (
                <li key={w.id} style={{ marginBottom: 4 }}>
                  {w.text}{' '}
                  <small style={{ color: '#888' }}>
                    ({new Date(w.createdAt).toLocaleString()})
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
