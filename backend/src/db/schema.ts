import {uuid, boolean, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

export const studentinfo = pgTable("studentinfo" , {
    id : serial("id").primaryKey(),
    name : text("name").notNull(),
    dept : text("dept").notNull(),
});





