import {Job, JobsRestClient} from "../apis/jobs";
import {createContext, ReactNode, useState} from "react";

export interface JobContextType {
    jobs: Job[];
    setJobs: (jobs: Job[]) => void;
    getAllJobs: (email?: string) => Promise<void>;
    createJob: (job: Partial<Job>) => Promise<void>;
    updateJob: (id: number, attrs: Partial<Job>) => Promise<void>;
    deleteJob: (id: number) => Promise<void>;
}

interface JobProviderProps {
    children: ReactNode;
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({children}: JobProviderProps) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const restClient = JobsRestClient.getJobsRestClient();

    const getAllJobs = async (name?: string) => {
        const jobs = await restClient.getAllJobs(name);

        setJobs(jobs);
    };

    const createJob = async (jobData: Partial<Job>) => {
        const job = await restClient.createJob(jobData);

        setJobs([...jobs, job]);
    };

    const updateJob = async (id: number, attrs: Partial<Job>) => {
        const updatedJob = await restClient.updateJob(id, attrs);

        const updatedJobs = jobs.map(job => {
            if (job.id === id) {
                return updatedJob;
            }

            return job;
        });

        setJobs(updatedJobs);
    };

    const deleteJob = async (id: number) => {
        await restClient.deleteJob(id);

        const updatedJobs = jobs.filter(job => job.id !== id);

        setJobs(updatedJobs);
    };

    const value = {
        jobs,
        setJobs,
        getAllJobs,
        createJob,
        updateJob,
        deleteJob,
    };

    return (
        <JobContext.Provider value={value}>
            {children}
        </JobContext.Provider>
    );
}
