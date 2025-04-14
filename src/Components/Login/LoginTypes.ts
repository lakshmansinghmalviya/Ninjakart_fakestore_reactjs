export interface LoginRequest {
    password: string;
    username: string;
}

export interface LoginResponse {
    token: string;
}