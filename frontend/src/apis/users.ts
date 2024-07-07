import axios from "axios";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
}

export class UserRestClient {
    private static uniqueInstance: UserRestClient;

    // TODO: move to config file
    private url = 'http://localhost:8000/auth';

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

    async deleteUser(id: number) {
        const res = await axios.delete(`${this.url}/${id}`)

        return res.data;
    }

    static getUsersRestClient() {
        if (!this.uniqueInstance) {
            this.uniqueInstance = new UserRestClient();
        }

        return this.uniqueInstance;
    }
}
