import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  department: text("department").notNull(),
  title: text("title").notNull(),
  salary: decimal("salary", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(),
  location: text("location").notNull(),
  hireDate: timestamp("hire_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;
