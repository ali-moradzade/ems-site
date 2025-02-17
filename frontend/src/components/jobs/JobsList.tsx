import {JobDetails} from "./JobDetails";
import {useGetAllJobsQuery} from "../../store";

export function JobsList() {
    const {data: jobs} = useGetAllJobsQuery('');

    if (!jobs) {
        return (
            <div>Error getting jobs</div>
        );
    }

    const renderedJobs = jobs.map(({id, title}) => {
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#job_details_${id}`}
                            className="btn btn-info btn-sm w-100">
                        Details
                    </button>
                </td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#delete_job_${id}`}
                            className="btn btn-danger btn-sm w-100">
                        Apply
                    </button>
                </td>
            </tr>
        );
    });

    const renderedJobsDetailsModals = jobs.map(job => {
        return (
            <div key={job.id}>
                <JobDetails job={job}/>
            </div>
        );
    });

    return (
        <div>
            <table className="table table-striped table-hover bg-light table-bordered rounded shadow small"
                   id="jobs_table"
            >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Job Title</th>
                        <th>Details</th>
                        <th>Apply</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedJobs}
                </tbody>
            </table>

            {/* Employee Details Modals */}
            {renderedJobsDetailsModals}
        </div>
    );
}
