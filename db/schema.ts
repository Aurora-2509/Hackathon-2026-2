import { sqliteTable, text, real, index } from 'drizzle-orm/sqlite-core';
export const clothingItems=sqliteTable('clothing_items',{
 id:text('id').primaryKey(),name:text('name').notNull(),category:text('category').notNull(),original_category:text('original_category').notNull(),color:text('color').notNull().default('unknown'),style:text('style').notNull().default('unknown'),image_url:text('image_url'),product_url:text('product_url'),price:real('price'),currency:text('currency').notNull().default('USD'),source:text('source').notNull().default('mvasil/polyvore-outfits')
},table=>[index('idx_clothing_category_id').on(table.category,table.id)]);
