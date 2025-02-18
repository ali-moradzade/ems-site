import {Job} from "../../store";

interface JobDetailsProps {
    job: Job;
}

export function JobDetails({job}: JobDetailsProps) {
    const {id, title, description, companyId, creationDate, expirationDate} = job;

    return (
        <div className="modal fade" id={`job_details_${id}`} tabIndex={-1}
             aria-labelledby={`job_details_${id}`} aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Job Details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body table-responsive">
                        <table className="table table-striped table-bordered table-hover"
                               id={`job_details_${id}_table`}
                        >
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <th>Title</th>
                                    <td>{title}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th>Company Id</th>
                                    <td>{companyId}</td>
                                </tr>
                                <tr>
                                    <th>Creation Date</th>
                                    <td>{creationDate.toString().split('T')[0]}</td>
                                </tr>
                                <tr>
                                    <th>Expiration Date</th>
                                    <td>{expirationDate.toString().split('T')[0]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
