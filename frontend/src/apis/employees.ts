import axios from "axios";

export interface Employee {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    job: string;
    date: string;
}

export class EmployeesRestClient {
    private static uniqueInstance: EmployeesRestClient;

    // TODO: move to config files
    private url = 'http://localhost:8000/employees';

    async getAllEmployees(email: string): Promise<Employee[]> {
        const res = await axios.get(this.url, {
            params: {
                email,
            }
        });

        return res.data;
    }

    async getEmployee(id: string): Promise<Employee> {
        const res = await axios.get(`${this.url}/${id}`);

        return res.data;
    }

    async createEmployee(
        // TODO: fix this, create Employee do not need id
        employee: Partial<Employee>
    ) {
        const res = await axios.post(this.url, employee);

        return res.data;
    }

    async updateEmployee(id: number, attrs: Partial<Employee>): Promise<Employee> {
        const res = await axios.patch(`${this.url}/${id}`, {
            ...attrs
        });

        return res.data;
    }

    async deleteEmployee(id: number): Promise<Employee> {
        const res = await axios.delete(`${this.url}/${id}`);

        return res.data;
    }

    static getEmployeeRestClient() {
        if (!this.uniqueInstance) {
            this.uniqueInstance = new EmployeesRestClient();
        }

        return this.uniqueInstance;
    }
}
