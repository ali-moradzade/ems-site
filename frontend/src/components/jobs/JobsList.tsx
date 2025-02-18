import {JobDetails} from "./JobDetails";
import {useGetAllJobsQuery} from "../../store";
import {useState} from "react";

export function JobsList() {
    const {data: jobs} = useGetAllJobsQuery();
    const [notification, setNotification] = useState<string | null>(null); // State to hold notification message

    if (!jobs) {
        return (
            <div>Error getting jobs</div>
        );
    }

    const handleApply = (jobTitle: string) => {
        setNotification(`You applied for the job: ${jobTitle} successfully.`);
        setTimeout(() => setNotification(null), 10000);
    };

    const handleCloseNotification = () => {
        setNotification(null);
    };

    const renderedJobs = jobs.map(({id, title}) => {
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#job_details_${id}`}
                            className="btn btn-info btn-sm w-100 w-lg-auto">
                        Details
                    </button>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm w-100 w-lg-auto"
                            onClick={() => handleApply(title)}
                    >
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
        <div className="container-fluid mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    {notification && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {notification}
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleCloseNotification}
                            ></button>
                        </div>
                    )}

                    <div className="table-responsive m-3 shadow-sm rounded ">
                        <table className="table table-striped table-hover bg-light table-bordered rounded  small"
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

                </div>
            </div>
        </div>
    );
}
