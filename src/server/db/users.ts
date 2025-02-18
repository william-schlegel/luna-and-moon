import { TierNames } from '@/data/subscriptionTiers';
import { CACHE_TAGS, dbCache, getGlobalTag, getIdTag } from '@/lib/cache';

import { db } from '../../../db/db';

export function getUsers(tier?: TierNames | TierNames[]) {
  const cacheFn = dbCache(() => getUsersInternal(tier), {
    tags: [getGlobalTag(CACHE_TAGS.user)]
  });

  return cacheFn();
}

async function getUsersInternal(tier?: TierNames | TierNames[]) {
  const data = await db.query.user.findMany({
    where: tier
      ? ({ tier }, { eq, or }) =>
          Array.isArray(tier)
            ? or(...tier.map((t) => eq(tier, t)))
            : eq(tier, tier)
      : undefined,
    orderBy: ({ memberSince }, { desc }) => desc(memberSince)
  });
  return data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    memberSince: artist.memberSince,
    tier: artist.tier
  }));
}

export async function getUser(userId: string) {
  const cacheFn = dbCache(() => getUserInternal(userId), {
    tags: [getIdTag(userId, CACHE_TAGS.user)]
  });

  return cacheFn();
}
async function getUserInternal(userId: string) {
  const data = await db.query.user.findFirst({
    where: ({ id }, { eq }) => eq(id, userId)
  });
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    memberSince: data.memberSince,
    tier: data.tier,
    role: data.role,
    image: data.image,
    email: data.email
  };
}

// export function getProductCustomization({
//   productId,
//   userId,
// }: {
//   productId: string
//   userId: string
// }) {
//   const cacheFn = dbCache(getProductCustomizationInternal, {
//     tags: [getIdTag(productId, CACHE_TAGS.products)],
//   })

//   return cacheFn({ productId, userId })
// }

// export function getProducts(
//   userId: string,
//   { limit }: { limit?: number } = {}
// ) {
//   const cacheFn = dbCache(getProductsInternal, {
//     tags: [getUserTag(userId, CACHE_TAGS.products)],
//   })

//   return cacheFn(userId, { limit })
// }

// export function getProduct({ id, userId }: { id: string; userId: string }) {
//   const cacheFn = dbCache(getProductInternal, {
//     tags: [getIdTag(id, CACHE_TAGS.products)],
//   })

//   return cacheFn({ id, userId })
// }

// export function getProductCount(userId: string) {
//   const cacheFn = dbCache(getProductCountInternal, {
//     tags: [getUserTag(userId, CACHE_TAGS.products)],
//   })

//   return cacheFn(userId)
// }

// export function getProductForBanner({
//   id,
//   countryCode,
//   url,
// }: {
//   id: string
//   countryCode: string
//   url: string
// }) {
//   const cacheFn = dbCache(getProductForBannerInternal, {
//     tags: [
//       getIdTag(id, CACHE_TAGS.products),
//       getGlobalTag(CACHE_TAGS.countries),
//       getGlobalTag(CACHE_TAGS.countryGroups),
//     ],
//   })

//   return cacheFn({
//     id,
//     countryCode,
//     url,
//   })
// }

// export async function createProduct(data: typeof ProductTable.$inferInsert) {
//   const [newProduct] = await db
//     .insert(ProductTable)
//     .values(data)
//     .returning({ id: ProductTable.id, userId: ProductTable.userId })

//   try {
//     await db
//       .insert(ProductCustomizationTable)
//       .values({
//         productId: newProduct.id,
//       })
//       .onConflictDoNothing({
//         target: ProductCustomizationTable.productId,
//       })
//   } catch (e) {
//     await db.delete(ProductTable).where(eq(ProductTable.id, newProduct.id))
//   }

//   revalidateDbCache({
//     tag: CACHE_TAGS.products,
//     userId: newProduct.userId,
//     id: newProduct.id,
//   })

//   return newProduct
// }

// export async function updateProduct(
//   data: Partial<typeof ProductTable.$inferInsert>,
//   { id, userId }: { id: string; userId: string }
// ) {
//   const { rowCount } = await db
//     .update(ProductTable)
//     .set(data)
//     .where(and(eq(ProductTable.userId, userId), eq(ProductTable.id, id)))

//   if (rowCount > 0) {
//     revalidateDbCache({
//       tag: CACHE_TAGS.products,
//       userId,
//       id,
//     })
//   }

//   return rowCount > 0
// }

// export async function deleteProduct({
//   id,
//   userId,
// }: {
//   id: string
//   userId: string
// }) {
//   const { rowCount } = await db
//     .delete(ProductTable)
//     .where(and(eq(ProductTable.id, id), eq(ProductTable.userId, userId)))

//   if (rowCount > 0) {
//     revalidateDbCache({
//       tag: CACHE_TAGS.products,
//       userId,
//       id,
//     })
//   }

//   return rowCount > 0
// }

// export async function updateCountryDiscounts(
//   deleteGroup: { countryGroupId: string }[],
//   insertGroup: (typeof CountryGroupDiscountTable.$inferInsert)[],
//   { productId, userId }: { productId: string; userId: string }
// ) {
//   const product = await getProduct({ id: productId, userId })
//   if (product == null) return false

//   const statements: BatchItem<"pg">[] = []
//   if (deleteGroup.length > 0) {
//     statements.push(
//       db.delete(CountryGroupDiscountTable).where(
//         and(
//           eq(CountryGroupDiscountTable.productId, productId),
//           inArray(
//             CountryGroupDiscountTable.countryGroupId,
//             deleteGroup.map(group => group.countryGroupId)
//           )
//         )
//       )
//     )
//   }

//   if (insertGroup.length > 0) {
//     statements.push(
//       db
//         .insert(CountryGroupDiscountTable)
//         .values(insertGroup)
//         .onConflictDoUpdate({
//           target: [
//             CountryGroupDiscountTable.productId,
//             CountryGroupDiscountTable.countryGroupId,
//           ],
//           set: {
//             coupon: sql.raw(
//               `excluded.${CountryGroupDiscountTable.coupon.name}`
//             ),
//             discountPercentage: sql.raw(
//               `excluded.${CountryGroupDiscountTable.discountPercentage.name}`
//             ),
//           },
//         })
//     )
//   }

//   if (statements.length > 0) {
//     await db.batch(statements as [BatchItem<"pg">])
//   }

//   revalidateDbCache({
//     tag: CACHE_TAGS.products,
//     userId,
//     id: productId,
//   })
// }

// export async function updateProductCustomization(
//   data: Partial<typeof ProductCustomizationTable.$inferInsert>,
//   { productId, userId }: { productId: string; userId: string }
// ) {
//   const product = await getProduct({ id: productId, userId })
//   if (product == null) return

//   await db
//     .update(ProductCustomizationTable)
//     .set(data)
//     .where(eq(ProductCustomizationTable.productId, productId))

//   revalidateDbCache({
//     tag: CACHE_TAGS.products,
//     userId,
//     id: productId,
//   })
// }

// async function getProductCustomizationInternal({
//   userId,
//   productId,
// }: {
//   userId: string
//   productId: string
// }) {
//   const data = await db.query.ProductTable.findFirst({
//     where: ({ id, userId }, { and, eq }) =>
//       and(eq(id, productId), eq(userId, userId)),
//     with: {
//       productCustomization: true,
//     },
//   })

//   return data?.productCustomization
// }

// function getProductsInternal(userId: string, { limit }: { limit?: number }) {
//   return db.query.ProductTable.findMany({
//     where: ({ userId }, { eq }) => eq(userId, userId),
//     orderBy: ({ createdAt }, { desc }) => desc(createdAt),
//     limit,
//   })
// }

// function getProductInternal({ id, userId }: { id: string; userId: string }) {
//   return db.query.ProductTable.findFirst({
//     where: ({ userId, id: idCol }, { eq, and }) =>
//       and(eq(userId, userId), eq(idCol, id)),
//   })
// }

// async function getProductCountInternal(userId: string) {
//   const counts = await db
//     .select({ productCount: count() })
//     .from(ProductTable)
//     .where(eq(ProductTable.userId, userId))

//   return counts[0]?.productCount ?? 0
// }

// async function getProductForBannerInternal({
//   id,
//   countryCode,
//   url,
// }: {
//   id: string
//   countryCode: string
//   url: string
// }) {
//   const data = await db.query.ProductTable.findFirst({
//     where: ({ id: idCol, url: urlCol }, { eq, and }) =>
//       and(eq(idCol, id), eq(urlCol, removeTrailingSlash(url))),
//     columns: {
//       id: true,
//       userId: true,
//     },
//     with: {
//       productCustomization: true,
//       countryGroupDiscounts: {
//         columns: {
//           coupon: true,
//           discountPercentage: true,
//         },
//         with: {
//           countryGroup: {
//             columns: {},
//             with: {
//               countries: {
//                 columns: {
//                   id: true,
//                   name: true,
//                 },
//                 limit: 1,
//                 where: ({ code }, { eq }) => eq(code, countryCode),
//               },
//             },
//           },
//         },
//       },
//     },
//   })

//   const discount = data?.countryGroupDiscounts.find(
//     discount => discount.countryGroup.countries.length > 0
//   )
//   const country = discount?.countryGroup.countries[0]
//   const product =
//     data == null || data.productCustomization == null
//       ? undefined
//       : {
//           id: data.id,
//           userId: data.userId,
//           customization: data.productCustomization,
//         }

//   return {
//     product,
//     country,
//     discount:
//       discount == null
//         ? undefined
//         : {
//             coupon: discount.coupon,
//             percentage: discount.discountPercentage,
//           },
//   }
// }
