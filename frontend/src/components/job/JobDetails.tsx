import {Job} from "../../apis/jobs";

interface JobDetailsProps {
    job: Job;
}

export function JobDetails({job}: JobDetailsProps) {
    const {id, name, date} = job;

    return (
        <div className="modal fade" id={`job_details_${id}`} tabIndex={-1}
             aria-labelledby={`job_details_${id}`} aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Job Details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-striped table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <th>Job Added Date</th>
                                    <td>{date}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
