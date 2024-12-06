import { boolean, pgEnum, pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

export const sunlightEnum = pgEnum('sunlight', [
  'Low Light',
  'Partial Shade',
  'Bright Indirect Light',
  'Full Sun',
]);
export const wateringEnum = pgEnum('watering', [
  'Minimal',
  'Sparing',
  'Moderate',
  'Frequent',
]);
export const locationEnum = pgEnum('location', ['INTERIOR', 'EXTERIOR']);
export const taskTypeEnum = pgEnum('task_type', ['watering']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  creationDate: timestamp('creation_date').defaultNow().notNull(),
});

export const plants = pgTable('plants', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .references(() => users.id)
        .notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    sunlight: sunlightEnum('sunlight'),
    watering: wateringEnum('watering'),
    adoptionDate: timestamp('adoption_date', { mode: 'string' }).defaultNow(),
    roomId: uuid('room_id').references(() => rooms.id),
    imageUrl: varchar('image_url'),
});

export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    plantId: uuid('plant_id')
        .references(() => plants.id)
        .notNull(),
    type: taskTypeEnum('task_type').notNull(),
    dueDate: timestamp('due_date', { mode: 'string' }),
    done: boolean('done').default(false).notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
    usersToPlaces: many(usersToPlaces),
}));

export const places = pgTable('places', {
  id: uuid('id').primaryKey().defaultRandom(),
  label: varchar('name', { length: 256 }).notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});

export const placesRelations = relations(places, ({ many }) => ({
    usersToPlaces: many(usersToPlaces),
}));

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
    label: varchar('name', { length: 256 }).notNull(),
    placeId: uuid('place_id')
        .references(() => places.id)
        .notNull(),
    location: locationEnum('location')
});

export const usersToPlaces = pgTable(
    'users_to_places',
    {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id),
        placeId: uuid('place_id')
            .notNull()
            .references(() => places.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.placeId] }),
    }),
);

export const usersToPlacesRelations = relations(usersToPlaces, ({ one }) => ({
    places: one(places, {
        fields: [usersToPlaces.placeId],
        references: [places.id],
    }),
    user: one(users, {
        fields: [usersToPlaces.userId],
        references: [users.id],
    }),
}));