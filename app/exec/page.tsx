// app/exec/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ExecPage() {
  const [user, setUser] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/exec')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
        else setError(data.error || 'Unknown error');
      })
      .catch(err => setError(err.toString()));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>whoami 命令输出:</h1>
      {error ? <p style={{ color: 'red' }}>错误: {error}</p> : <p>{user}</p>}
    </div>
  );
}
