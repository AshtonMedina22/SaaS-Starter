import { desc, and, eq } from 'drizzle-orm';
import { db } from './drizzle';
import { organizations, memberships, portals, portalEvents } from './schema';
import { getUser } from '@/lib/auth/session';

export async function getUserOrganization() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const result = await db.query.memberships.findFirst({
    where: eq(memberships.userId, user.id),
    with: {
      organization: {
        with: {
          memberships: {
            with: {
              organization: true
            }
          },
          portals: true
        }
      }
    }
  });

  return result?.organization || null;
}

export async function getUserMemberships() {
  const user = await getUser();
  if (!user) {
    return [];
  }

  return await db.query.memberships.findMany({
    where: eq(memberships.userId, user.id),
    with: {
      organization: true
    }
  });
}

export async function getOrganizationPortals(orgId: string) {
  return await db.query.portals.findMany({
    where: eq(portals.orgId, orgId),
    with: {
      events: {
        orderBy: desc(portalEvents.createdAt),
        limit: 10
      }
    }
  });
}

export async function getPortalEvents(portalId: string) {
  return await db.query.portalEvents.findMany({
    where: eq(portalEvents.portalId, portalId),
    orderBy: desc(portalEvents.createdAt),
    limit: 50
  });
}

export async function createPortal(orgId: string, portalData: {
  name: string;
  slug: string;
  destinationUrl: string;
  theme?: any;
}) {
  const [portal] = await db.insert(portals).values({
    orgId,
    ...portalData
  }).returning();

  return portal;
}

export async function createPortalEvent(portalId: string, eventData: {
  userId?: string;
  eventType: 'scan' | 'click' | 'visit';
  metadata?: any;
}) {
  const [event] = await db.insert(portalEvents).values({
    portalId,
    ...eventData
  }).returning();

  return event;
}

export async function updatePortal(portalId: string, updates: {
  name?: string;
  slug?: string;
  destinationUrl?: string;
  theme?: any;
}) {
  const [portal] = await db.update(portals)
    .set(updates)
    .where(eq(portals.id, portalId))
    .returning();

  return portal;
}

export async function deletePortal(portalId: string) {
  await db.delete(portals).where(eq(portals.id, portalId));
}

export async function getOrganizationMembers(orgId: string) {
  return await db.query.memberships.findMany({
    where: eq(memberships.orgId, orgId),
    with: {
      organization: true
    }
  });
}

export async function addOrganizationMember(orgId: string, userId: string, role: 'admin' | 'member' = 'member') {
  const [membership] = await db.insert(memberships).values({
    orgId,
    userId,
    role
  }).returning();

  return membership;
}

export async function removeOrganizationMember(orgId: string, userId: string) {
  await db.delete(memberships).where(
    and(
      eq(memberships.orgId, orgId),
      eq(memberships.userId, userId)
    )
  );
}

export async function updateMemberRole(orgId: string, userId: string, role: 'admin' | 'member') {
  const [membership] = await db.update(memberships)
    .set({ role })
    .where(
      and(
        eq(memberships.orgId, orgId),
        eq(memberships.userId, userId)
      )
    )
    .returning();

  return membership;
}
