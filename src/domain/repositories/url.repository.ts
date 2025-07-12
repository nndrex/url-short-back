import { Url } from "../entities/url.entity";

export default interface UrlRepository {
  create(url: Url): Promise<Url>;
  findById(id: string): Promise<Url | null>;
  findByDomain(domain: string): Promise<Url | null>;
  findByUserId(userId:number): Promise<Url[]>;
  findAll(): Promise<Url[]>;
  update(url: Url): Promise<Url>;
  delete(id: string): Promise<void>;
}