import {JobList} from "../components/job/JobList";
import {JobCreate} from "../components/job/JobCreate";

export function JobPage() {
    return (
        <div>
            {/* dashboard contents */}
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-lg-3 col-md-3">
                        <div className="list-group card-border small">
                            <div className="list-group-item active">Jobs Data</div>
                            <button className="list-group-item list-group-item-action" data-bs-toggle="modal"
                                    data-bs-target="#add_job">
                                Add Job
                            </button>
                            <button className="list-group-item list-group-item-action">
                                View All Jobs
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9">
                        <JobList/>
                    </div>
                </div>
            </div>

            {/* Add Job Modal */}
            <JobCreate/>
        </div>
    );
}
