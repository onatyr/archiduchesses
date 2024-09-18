import {pgEnum, pgTable, serial, uuid, varchar} from 'drizzle-orm/pg-core';

export const sunlightEnum = pgEnum('sunlight', ['LOW', 'MEDIUM', 'HIGH']);
export const wateringEnum = pgEnum('watering', ['LOW', 'MEDIUM', 'HIGH']);

export const plants = pgTable('plants', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 256}),
    type: varchar('type', {length: 256}),
    sunlight: sunlightEnum('sunlight'),
    watering: wateringEnum('watering')
});

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 256})
});
