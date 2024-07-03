import {Navbar} from "../components/Navbar";
import {Jobs} from "../components/Jobs";

export function JobsListPage() {
    const jobs = [
        {
            id: '1',
            name: 'Graphic Designer',
            date: '10/09/2022',
        },
        {
            id: '2',
            name: 'Web Designer',
            date: '11/09/2022',
        },
        {
            id: '3',
            name: 'Web Developer',
            date: '12/09/2022',
        },
    ];

    return (
        <div>
            <Navbar activeLink={'/jobs'}/>

            {/* dashboard contents */}
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-lg-3 col-md-3">
                        <div className="list-group card-border small">
                            <div className="list-group-item active">Jobs Data</div>
                            <a href="#" className="list-group-item list-group-item-action" data-bs-toggle="modal"
                               data-bs-target="#add_job">
                                Add Job
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                View All Jobs
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9">
                        <Jobs jobs={jobs}/>
                    </div>
                </div>
            </div>

            {/* Add Job Modal */}
            <div className="modal fade" id="add_job" tabIndex={-1} aria-labelledby="add_job"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Add Job Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="date" className="form-control form-control-sm" required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm"
                                           placeholder="Job Name"
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-sm btn-success w-100">
                                        Add Job
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
