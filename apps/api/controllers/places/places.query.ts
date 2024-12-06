import {db} from "../../database/database";
import {places, usersToPlaces} from "../../database/schema";
import {eq, inArray} from "drizzle-orm";

export function getAllPlacesByUserId(userId: string) {
    return db.select()
        .from(places)
        .where(inArray(places.id,
            db.select({
                placeId: usersToPlaces.placeId
            })
                .from(usersToPlaces)
                .where(eq(usersToPlaces.userId, userId))
                .$dynamic()
        ))
        .$dynamic();
}