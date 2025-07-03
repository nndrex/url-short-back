import UrlRepository from "@domain/repositories/url.repository";

export class UrlUseCase {
    
    constructor( private urlRepository: UrlRepository) {
        this.urlRepository = urlRepository;
        // Initialization logic can go here if needed.
    }
    async getByDomain(domain: string) {
        console.log(`Fetching URL by domain: ${domain}`);
        console.log(this.urlRepository)
        return await this.urlRepository.findByDomain(domain);
    }

    async getAll() {
        console.log("Fetching all URLs");
        return await this.urlRepository.findAll();
    }

    async getByUserId(userId: number) {
        console.log(`Fetching URLs for user ID: ${userId}`);
        return await this.urlRepository.findByUserId(userId);
    }
}
