import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const membershipRoleEnum = pgEnum('membership_role', ['admin', 'member']);
export const eventTypeEnum = pgEnum('event_type', ['scan', 'click', 'visit']);

// Organizations table
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Memberships table (user ↔ org with role)
export const memberships = pgTable('memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(), // References auth.users(id)
  orgId: uuid('org_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  role: membershipRoleEnum('role').notNull().default('member'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Portals table
export const portals = pgTable('portals', {
  id: uuid('id').primaryKey().defaultRandom(),
  orgId: uuid('org_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  name: text('name'),
  slug: text('slug').unique(),
  destinationUrl: text('destination_url'),
  theme: jsonb('theme'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Portal events table
export const portalEvents = pgTable('portal_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  portalId: uuid('portal_id').notNull().references(() => portals.id, { onDelete: 'cascade' }),
  userId: uuid('user_id'), // References auth.users(id)
  eventType: eventTypeEnum('event_type').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const organizationsRelations = relations(organizations, ({ many }) => ({
  memberships: many(memberships),
  portals: many(portals),
}));

export const membershipsRelations = relations(memberships, ({ one }) => ({
  organization: one(organizations, {
    fields: [memberships.orgId],
    references: [organizations.id],
  }),
}));

export const portalsRelations = relations(portals, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [portals.orgId],
    references: [organizations.id],
  }),
  events: many(portalEvents),
}));

export const portalEventsRelations = relations(portalEvents, ({ one }) => ({
  portal: one(portals, {
    fields: [portalEvents.portalId],
    references: [portals.id],
  }),
}));

// Types
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type Membership = typeof memberships.$inferSelect;
export type NewMembership = typeof memberships.$inferInsert;
export type Portal = typeof portals.$inferSelect;
export type NewPortal = typeof portals.$inferInsert;
export type PortalEvent = typeof portalEvents.$inferSelect;
export type NewPortalEvent = typeof portalEvents.$inferInsert;

// Extended types with relations
export type OrganizationWithMembers = Organization & {
  memberships: Membership[];
};

export type PortalWithEvents = Portal & {
  events: PortalEvent[];
};

export type OrganizationWithPortals = Organization & {
  portals: Portal[];
};
