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

export const TierEnum = pgEnum(
  'tier',
  Object.keys(subscriptionTiers) as [TierNames]
);

export const UserTable = pgTable('user', {
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
    clerkUserId: text('clerk_user_id').notNull(),
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
    creationDate: timestamp('creation_date').default(new Date()),
    onSaleSince: timestamp('on_sale_since')
  },
  (table) => ({
    clerkUserIdIndex: index('user_art.clerk_user_id_index').on(
      table.clerkUserId
    )
    // stripeCustomerIdIndex: index(
    //   "user_subscriptions.stripe_customer_id_index"
    // ).on(table.stripeCustomerId),
  })
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

export type User = typeof UserTable.$inferSelect;
export type NewUser = typeof UserTable.$inferInsert;

export type ArtCategory = typeof ArtCategoryTable.$inferSelect;
export type NewArtCategory = typeof ArtCategoryTable.$inferInsert;

export type Art = typeof ArtTable.$inferSelect;
export type NewArt = typeof ArtTable.$inferInsert;

export type Material = typeof MaterialTable.$inferSelect;
export type NewMaterial = typeof MaterialTable.$inferInsert;
