import axios from "axios";

export interface Job {
    id: number;
    name: string;
    date: string;
}

export class JobsRestClient {
    private static uniqueInstance: JobsRestClient;

    // TODO: move to config files
    private url = 'http://localhost:8000/jobs';

    async getAllJobs(name: string): Promise<Job[]> {
        const res = await axios.get(this.url, {
            params: {
                name,
            }
        });

        return res.data;
    }

    async getJob(id: string): Promise<Job> {
        const res = await axios.get(`${this.url}/${id}`);

        return res.data;
    }

    async createJob(
        job: Job
    ) {
        const res = await axios.post(this.url, job);

        return res.data;
    }

    async updateJob(id: number, attrs: Partial<Job>): Promise<Job> {
        const res = await axios.patch(`${this.url}/${id}`, {
            ...attrs
        });

        return res.data;
    }

    async deleteJob(id: number): Promise<Job> {
        const res = await axios.delete(`${this.url}/${id}`);

        return res.data;
    }

    static getEmployeeRestClient() {
        if (!this.uniqueInstance) {
            this.uniqueInstance = new JobsRestClient();
        }

        return this.uniqueInstance;
    }
}
