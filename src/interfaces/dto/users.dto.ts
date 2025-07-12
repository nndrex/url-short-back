export interface CreateUserDTO {
    email: string;
    password: string;
    name: string;
}
export interface CreateUserResponseDTO {
    id: number;
    email: string;
    name: string;
    isActive: boolean;
}

