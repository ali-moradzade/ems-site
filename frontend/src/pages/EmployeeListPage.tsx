import {Employees} from "../components/Employees";

export function EmployeeListPage() {
    const employees = [
        {
            id: '1',
            name: 'John Doe 1',
            email: 'johndoe1@gmail.com',
            phone: '+919876543210',
            job: 'Graphic Designer',
            date: '12/09/2022',
        },
        {
            id: '2',
            name: 'John Doe 2',
            email: 'johndoe2@gmail.com',
            phone: '+919876543211',
            job: 'Web Designer',
            date: '11/09/2022',
        },
        {
            id: '3',
            name: 'John Doe 3',
            email: 'johndoe3@gmail.com',
            phone: '+919876543212',
            job: 'Web Developer',
            date: '10/09/2022',
        },
    ];

    return (
        <div>
            {/* dashboard contents */}
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-lg-3 col-md-3">
                        <div className="list-group card-border small">
                            <div className="list-group-item active">Employee Data</div>
                            <button className="list-group-item list-group-item-action" data-bs-toggle="modal"
                                    data-bs-target="#add_employee">
                                Add Employee
                            </button>
                            <button className="list-group-item list-group-item-action">
                                View All Employees
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9">
                        <Employees employees={employees}/>
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
                                    <button type="submit" className="btn btn-sm btn-success w-100">
                                        Add Employee
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
