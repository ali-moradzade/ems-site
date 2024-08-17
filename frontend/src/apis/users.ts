import axios from "axios";
import {CONFIG} from "../config";

export interface User {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
}

export class UserRestClient {
    private static uniqueInstance: UserRestClient;
    private url = `${CONFIG.BACKEND_URL}/auth`;

    static getUsersRestClient() {
        if (!this.uniqueInstance) {
            this.uniqueInstance = new UserRestClient();
        }

        return this.uniqueInstance;
    }

    async getAllUsers(email?: string): Promise<User[]> {
        const res = await axios.get(this.url, {
            params: {email}
        });

        return res.data;
    }

    async getUser(id: number) {
        const res = await axios.get(`${this.url}/${id}`);

        return res.data;
    }

    async signup(email: string, password: string, firstName: string, lastName: string) {
        const res = await axios.post(`${this.url}/signup`, {
            email, password, firstName, lastName,
        });

        return res.data;
    }

    async login(email: string, password: string): Promise<User> {
        const res = await axios.post(`${this.url}/login`, {
            email, password
        });

        return res.data;
    }

    async updateUser(id: number, attrs: Partial<User>): Promise<User> {
        const res = await axios.put(`${this.url}/${id}`, attrs);

        return res.data;
    }

    async deleteUser(id: number) {
        const res = await axios.delete(`${this.url}/${id}`);

        return res.data;
    }
}
