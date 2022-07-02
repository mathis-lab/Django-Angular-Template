import { Roles } from "./user-roles";

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    firstName: string;
    lastName: string;
    connected: boolean = false;
    groups: Array<Roles> = [];
    access?: string; // Token
    refresh?: string; // Refresh Token
}