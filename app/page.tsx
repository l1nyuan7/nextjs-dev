// app/page.tsx
import { headers } from 'next/headers'

export default async function HomePage() {
  const headersList = await headers(); // ✅ async!
  const ip = headersList.get('x-forwarded-for') || 'unknown';
  const ua = headersList.get('user-agent') || 'unknown';

  await fetch('http://120.46.36.170/receive', { // ✅ http 或自签证书处理
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ip,
      ua,
      time: new Date().toISOString(),
    }),
    cache: 'no-store', // 确保 SSR 执行
  });

  return (
    <main>
      <h1>Hello from server</h1>
    </main>
  );
}
