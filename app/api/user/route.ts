import { getUser } from '@/lib/auth/session';

export async function GET() {
  const user = await getUser();
  return Response.json(user);
}
