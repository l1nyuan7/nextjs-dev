import fs from 'fs/promises';
import path from 'path';

const filePath = path.join('./', 'vercel-test.txt');

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const write = searchParams.get('write');

  let fileContent = null;
  let writeMessage = null;
  let errorMessage = null;

  try {
    if (write === 'true') {
      const timestamp = new Date().toISOString();
      const content = `Hello from Vercel at ${timestamp}\n`;
      await fs.appendFile(filePath, content, 'utf-8');
      writeMessage = 'Data appended to file';
    }

    try {
      fileContent = await fs.readFile(filePath, 'utf-8');
    } catch (readError) {
      errorMessage = 'File not found';
    }
  } catch (error) {
    console.error('File operation error:', error);
    errorMessage = 'Failed to perform file operation';
  }

  const responseData = {
    writeMessage: writeMessage,
    content: fileContent,
    errorMessage: errorMessage,
  };

  return new Response(JSON.stringify(responseData), {
    status: errorMessage ? (writeMessage ? 200 : 404) : 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}