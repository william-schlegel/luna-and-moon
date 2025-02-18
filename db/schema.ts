// import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';

import { TierNames, subscriptionTiers } from '@/data/subscriptionTiers';

/*

    USER tables

*/

export const TierEnum = pgEnum(
  'tier',
  Object.keys(subscriptionTiers) as [TierNames]
);

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  bio: text('bio'),
  profilePictureId: text('profile_picture_id'),
  website: text('website'),
  facebook: text('facebook'),
  instagram: text('instagram'),
  twitter: text('twitter'),
  memberSince: timestamp('member_since').notNull(),
  tier: TierEnum('tier').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  role: text('role'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires')
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by')
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
});

/*

    Art tables

*/

export const ArtCategoryTable = pgTable('art_category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull()
});

export const MaterialTable = pgTable('material', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull()
});

export const ArtTable = pgTable(
  'art',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    artCategoryId: uuid('art_category_id')
      .references(() => ArtCategoryTable.id)
      .unique(),
    name: text('name').notNull(),
    description: text('description'),
    imageId: text('image_id'),
    onSale: boolean('on_sale').default(true),
    originalPrice: real('original_price').default(0),
    price: real('price').default(0),
    available: boolean('available').notNull().default(true),
    width: real('width').default(0),
    height: real('height').default(0),
    depth: real('depth').default(0),
    materialId: uuid('material_id').references(() => MaterialTable.id),
    material: text('material'),
    weight: real('weight').default(0),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
    onSaleSince: timestamp('on_sale_since')
  },
  (table) => [
    index('user_art.user_id_index').on(table.userId)
    // stripeCustomerIdIndex: index(
    //   "user_subscriptions.stripe_customer_id_index"
    // ).on(table.stripeCustomerId),
  ]
);

/**
 * RELATIONSHIPS
 *
 * Here you can define drizzle relationships between table which helps improve the type safety
 * in your code.
 */

// export const postsRelationships = relations(posts, ({ one }) => ({
//   user: one(users, { fields: [posts.userId], references: [users.id] }),
//   group: one(groups, { fields: [posts.groupId], references: [groups.id] }),
// }));

// export const followingRelationship = relations(following, ({ one }) => ({
//   foreignProfile: one(profiles, {
//     fields: [following.foreignUserId],
//     references: [profiles.userId],
//   }),
//   userProfile: one(profiles, {
//     fields: [following.userId],
//     references: [profiles.userId],
//   }),
// }));

/**
 * TYPES
 *
 * You can create and export types from your schema to use in your application.
 * This is useful when you need to know the shape of the data you are working with
 * in a component or function.
 */

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type ArtCategory = typeof ArtCategoryTable.$inferSelect;
export type NewArtCategory = typeof ArtCategoryTable.$inferInsert;

export type Art = typeof ArtTable.$inferSelect;
export type NewArt = typeof ArtTable.$inferInsert;

export type Material = typeof MaterialTable.$inferSelect;
export type NewMaterial = typeof MaterialTable.$inferInsert;
