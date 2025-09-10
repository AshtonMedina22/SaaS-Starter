import { getUserOrganization } from '@/lib/db/queries';

export async function GET() {
  const organization = await getUserOrganization();
  return Response.json(organization);
}
