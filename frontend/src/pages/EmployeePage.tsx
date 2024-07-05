import {EmployeeList} from "../components/employee/EmployeeList";
import {EmployeeCreate} from "../components/employee/EmployeeCreate";

export function EmployeePage() {
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
                        <EmployeeList/>
                    </div>
                </div>
            </div>

            {/* Add Employee Modal */}
            <EmployeeCreate/>
        </div>
    );
}
