import { pgTable,varchar,serial, integer, numeric } from "drizzle-orm/pg-core"

export const Budgets = pgTable('budgets', {
  id:integer('id').primaryKey({ autoincrement: true }),
  name:varchar('name').notNull(),
  amount:varchar('amount').notNull(),
  icon:varchar('icon'),
  createdBy:varchar('createdBy').notNull()
});

export const Expenses=pgTable('expenses',{
  id:integer('id').primaryKey({autoincrement:true}),
  name:varchar('name').notNull(),
  amount:numeric('amount').notNull(),
  budgetId:integer('budgetId').references(()=>Budgets.id),
  createdBy:varchar('createdBy').notNull()
});