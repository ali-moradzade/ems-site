import {Navbar} from "../components/Navbar";

export function DashboardPage() {
    return (
        <div>
            <Navbar/>

            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-lg-3 col-md-3">
                        <div className="card card-border">
                            <div className="card-body">
                                <h4 className="card-title">254 <small className="text-muted">Employees</small></h4>
                            </div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-primary">View All</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="card card-border">
                            <div className="card-body">
                                <h4 className="card-title">24 <small className="text-muted">Jobs</small></h4>
                            </div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-primary">View All</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
