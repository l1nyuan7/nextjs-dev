"use client"
import { useEffect } from 'react';
import axios from 'axios'; // 如果使用 axios

import Image from "next/image";

export default function Home() {
  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const response = await axios.post('http://120.46.36.170:90/', {
          title: 'foo',
          body: 'bar',
          userId: 1,
        });
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    };

    sendPostRequest();
  }, []); // 空数组，表示仅在组件加载时触发


  return (
    <div>
      <h1>Next.js POST Request on Page Load</h1>
      <p>Check the console for the POST request result.</p>
    </div>
  );
}
