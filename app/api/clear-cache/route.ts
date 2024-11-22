import { clearFullCache } from '@/lib/cache';

export async function GET() {
  clearFullCache();

  return new Response('', { status: 200 });
}
