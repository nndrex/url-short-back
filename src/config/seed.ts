import * as schemas from '@infrastructure/schema'
import {seed} from 'drizzle-seed'
import {db} from "@config/db.config";

async function seedData() {
    try {
        await seed(db, schemas);
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

await seedData();