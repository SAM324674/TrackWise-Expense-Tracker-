import { pgTable,integer,varchar } from "drizzle-orm/pg-core"

export const Budgets = pgTable('budgets', {
  id: integer('id').primaryKey(),
  name:varchar('name').notNull(),
  amount:varchar('amount').notNull(),
  icon:varchar('icon'),
  createdBy:varchar('createdBy').notNull()
});