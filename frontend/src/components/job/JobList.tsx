import {useJobContext} from "../../hooks/use-job-context";
import {JobDetails} from "./JobDetails";
import {JobEdit} from "./JobEdit";
import {JobDelete} from "./JobDelete";

export function JobList() {
    const {jobs} = useJobContext();

    const renderedJobs = jobs.map(({id, name}) => {
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#job_details_${id}`}
                            className="btn btn-info btn-sm w-100">
                        Details
                    </button>
                </td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#edit_job_${id}`}
                            className="btn btn-warning btn-sm w-100">
                        Edit
                    </button>
                </td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#delete_job_${id}`}
                            className="btn btn-danger btn-sm w-100">
                        Delete
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

    const renderedEditJobsModals = jobs.map(job => {
        return (
            <div key={job.id}>
                <JobEdit job={job}/>
            </div>
        );
    });

    const renderedDeleteJobsModals = jobs.map(job => {
        return (
            <div key={job.id}>
                <JobDelete job={job}/>
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
                        <th>ID</th>
                        <th>Job Name</th>
                        <th>Details</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedJobs}
                </tbody>
            </table>

            {/* Employee Details Modals */}
            {renderedJobsDetailsModals}

            {/* Edit Employee Modal */}
            {renderedEditJobsModals}

            {/* Delete Employee Modal */}
            {renderedDeleteJobsModals}
        </div>
    );
}
