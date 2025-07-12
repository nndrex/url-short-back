import { eq } from "drizzle-orm";
import { Url } from "../../domain/entities/url.entity";
import IUrlRepository from "../../domain/repositories/url.repository";
import {urls} from "../schemas/url.schema";
import {db} from "@config/db.config";

export default class UrlRepository implements IUrlRepository {
    findById(id: string): Promise<Url | null> {
        throw new Error("Method not implemented.");
    }
    async findByDomain(domain: string): Promise<Url | null> {
        const url = await db.select().from(urls).where(eq(urls.domain,domain)).limit(1);
        return url[0] as Url
    }
    async findByUserId(userId: number): Promise<Url[]> {
        const dbUrls = await db.select().from(urls).where(eq(urls.userId, userId)).limit(100);
        return dbUrls as Url[];
    }
    async findAll(): Promise<Url[]> {
        const dbUrls  = await db.select().from(urls).limit(100);
        return dbUrls as Url[];
    }
    async create(url: Url): Promise<Url> {
        const insertedId = await db.insert(urls).values({
            domain: url.domain,
            fullUrl: url.fullUrl,
            isActive: url.isActive,
            userId: url.userId
        }).returning()
        return insertedId[0] as Url
    }
    update(url: Url): Promise<Url> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}