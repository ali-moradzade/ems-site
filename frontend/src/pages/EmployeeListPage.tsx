import {Navbar} from "../components/Navbar";

export function EmployeeListPage() {
    return (
        <div>
            <Navbar userFullName={'Mocked Full Name'}/>

            {/* dashboard contents */}
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-lg-3 col-md-3">
                        <div className="list-group card-border small">
                            <div className="list-group-item active">Employee Data</div>
                            <a href="#" className="list-group-item" data-bs-toggle="modal"
                               data-bs-target="#add_employee">
                                Add Employee
                            </a>
                            <a href="#" className="list-group-item">View All Employees</a>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9">
                        <table className="table table-striped table-hover bg-light table-bordered rounded shadow small">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email ID</th>
                                    <th>Details</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>johndoe@gmail.com</td>
                                    <td><a href="#" data-bs-toggle="modal" data-bs-target="#employee_details1"
                                           className="btn btn-info btn-sm w-100">Details</a></td>
                                    <td><a href="#" data-bs-toggle="modal" data-bs-target="#edit_employee1"
                                           className="btn btn-warning btn-sm w-100">Edit</a></td>
                                    <td><a href="#" data-bs-toggle="modal" data-bs-target="#delete_employee1"
                                           className="btn btn-danger btn-sm w-100">Delete</a></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>johndoe@gmail.com</td>
                                    <td><a href="#" data-bs-toggle="modal" data-bs-target="#employee_details"
                                           className="btn btn-info btn-sm w-100">Details</a></td>
                                    <td><a href="#" className="btn btn-warning btn-sm w-100">Edit</a></td>
                                    <td><a href="#" className="btn btn-danger btn-sm w-100">Delete</a></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>johndoe@gmail.com</td>
                                    <td><a href="#" data-bs-toggle="modal" data-bs-target="#employee_details"
                                           className="btn btn-info btn-sm w-100">Details</a></td>
                                    <td><a href="#" className="btn btn-warning btn-sm w-100">Edit</a></td>
                                    <td><a href="#" className="btn btn-danger btn-sm w-100">Delete</a></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>johndoe@gmail.com</td>
                                    <td><a href="#" data-bs-toggle="modal" data-bs-target="#employee_details"
                                           className="btn btn-info btn-sm w-100">Details</a></td>
                                    <td><a href="#" className="btn btn-warning btn-sm w-100">Edit</a></td>
                                    <td><a href="#" className="btn btn-danger btn-sm w-100">Delete</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Employee Modal */}
            <div className="modal fade" id="add_employee" tabIndex={-1} aria-labelledby="add_employee"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Employee Details</h1>
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
                                           placeholder="Employee Name"
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control form-control-sm"
                                           placeholder="Employee Email"
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input type="tel" className="form-control form-control-sm"
                                           placeholder="Employee Phone Number"
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <select className="form-control form-control-sm">
                                        <option value="Graphic Designer">Graphic Designer</option>
                                        <option value="Web Designer">Web Designer Designer</option>
                                        <option value="Web Developer">Web Developer</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-sm btn-success w-100">Update Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Employee Details Modal */}
            <div className="modal fade" id="employee_details1" tabIndex={-1} aria-labelledby="employee_details1"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel2">Employee Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped table-bordered table-hover">
                                <tr>
                                    <th>ID</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Joining Date</th>
                                    <td>29 July 2020</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>John Doe</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>johndoe@gmail.com</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>+919876543210</td>
                                </tr>
                                <tr>
                                    <th>Job</th>
                                    <td>Graphic Designer</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Employee Modal */}
            <div className="modal fade" id="edit_employee1" tabIndex={-1} aria-labelledby="edit_employee1"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel3">Edit Employee Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm" value="12/08/2020"
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm"
                                           placeholder="Employee Name"
                                           value="John Doe" required/>
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control form-control-sm"
                                           placeholder="Employee Email"
                                           value="johndoe@gmail.com" required/>
                                </div>
                                <div className="mb-3">
                                    <input type="tel" className="form-control form-control-sm"
                                           placeholder="Employee Phone Number" value="+919876543210"
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm" placeholder="Job"
                                           value="Graphic Designer" required/>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-sm btn-success w-100">Add New Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Employee Modal */}
            <div className="modal fade" id="delete_employee1" tabIndex={-1} aria-labelledby="delete_employee1"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel4">Delete Employee Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <p>Are you sure you want to delete <span className="fw-bold">"John Doe"</span>? </p>
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
        </div>
    );
}
