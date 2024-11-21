// import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';

import { TierNames, subscriptionTiers } from '@/data/subscriptionTiers';

export const TierEnum = pgEnum(
  'tier',
  Object.keys(subscriptionTiers) as [TierNames]
);

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  clerkId: text('clerkId').notNull().unique(),
  bio: text('bio'),
  profilePictureId: text('profile_picture_id'),
  website: text('website'),
  facebook: text('facebook'),
  instagram: text('instagram'),
  twitter: text('twitter'),
  memberSince: timestamp('member_since').notNull(),
  tier: TierEnum('tier').notNull()
});

export const artCategory = pgTable('art_category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull()
});

export const material = pgTable('material', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull()
});

export const art = pgTable('art', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id),
  artCategoryId: uuid('art_category_id')
    .references(() => artCategory.id)
    .unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  imageId: text('image_id'),
  onSale: boolean('on_sale').notNull().default(true),
  originalPrice: real('original_price').notNull().default(0),
  price: real('price').notNull().default(0),
  available: boolean('available').notNull().default(true),
  width: real('width').notNull().default(0),
  height: real('height').notNull().default(0),
  depth: real('depth').default(0),
  materialId: uuid('material_id').references(() => material.id),
  material: text('material'),
  weight: real('weight').default(0),
  creationDate: timestamp('creation_date').notNull(),
  onSaleSince: timestamp('on_sale_since')
});

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

export type ArtCategory = typeof artCategory.$inferSelect;
export type NewArtCategory = typeof artCategory.$inferInsert;

export type Art = typeof art.$inferSelect;
export type NewArt = typeof art.$inferInsert;

export type Material = typeof material.$inferSelect;
export type NewMaterial = typeof material.$inferInsert;
