import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const baseTable = {
  createdAt: timestamp('created_at').notNull(),
  id: uuid().notNull().primaryKey(),
  updatedAt: timestamp('updated_at'),
};

export const catsTable = pgTable('Cat', {
  ...baseTable,
  bornDate: timestamp('born_date').notNull(),
  name: text().notNull(),
});
