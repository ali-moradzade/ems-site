interface JobsProps {
    jobs: {
        id: string;
        name: string;
        date: string;
    }[];
}

export function Jobs({jobs}: JobsProps) {
    const renderedJobs = jobs.map(({id, name}) => {
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                    <a href="#" data-bs-toggle="modal" data-bs-target={`#job_details_${id}`}
                       className="btn btn-info btn-sm w-100">
                        Details
                    </a>
                </td>
                <td>
                    <a href="#" data-bs-toggle="modal" data-bs-target={`#edit_job_${id}`}
                       className="btn btn-warning btn-sm w-100">
                        Edit
                    </a>
                </td>
                <td>
                    <a href="#" data-bs-toggle="modal" data-bs-target={`#delete_job_${id}`}
                       className="btn btn-danger btn-sm w-100">
                        Delete
                    </a>
                </td>
            </tr>
        );
    });

    const renderedJobsDetailsModals = jobs.map(({id, name, date}) => {
        return (
            <div className="modal fade" id={`job_details_${id}`} tabIndex={-1}
                 aria-labelledby={`job_details_${id}`}
                 aria-hidden="true" key={id}
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
    });

    const renderedEditJobsModals = jobs.map(({id, name, date}) => {
        return (
            <div className="modal fade" id={`edit_job_${id}`} tabIndex={-1} aria-labelledby={`edit_job_${id}`}
                 key={id}
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">
                                Edit Job Details
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm" value={date}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm"
                                           placeholder="Employee Name"
                                           value={name} required/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    const renderedDeleteJobsModals = jobs.map(({id, name}) => {
        return (
            <div className="modal fade" id={`delete_job_${id}`} tabIndex={-1}
                 aria-labelledby={`delete_job_${id}`} key={id} aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Delete Job Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <p>Are you sure you want to delete <span className="fw-bold">"{name}"</span>? </p>
                                </div>
                                <div className="mb-3 float-end">
                                    <button className="btn btn-danger btn-sm">Delete</button>
                                    <button className="btn btn-secondary btn-sm ms-2">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <table className="table table-striped table-hover bg-light table-bordered rounded shadow small">
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
