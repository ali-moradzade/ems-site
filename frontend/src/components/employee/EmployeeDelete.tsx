import {Employee} from "../../apis/employees";
import {useEmployeeContext} from "../../hooks/use-employee-context";
import {FormEvent, useRef} from "react";

interface EmployeeDeleteProps {
    employee: Employee;
}

export function EmployeeDelete({employee}: EmployeeDeleteProps) {
    const {id, firstName, lastName} = employee;
    const {deleteEmployee} = useEmployeeContext();

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        deleteEmployee(id).then();

        closeRef.current?.click();
    };

    return (
        <div className="modal fade" id={`delete_employee_${id}`} tabIndex={-1}
             aria-labelledby={`delete_employee_${id}`} aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Delete Employee Confirmation</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ref={closeRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} id={`delete_employee_${id}_form`}>
                            <div className="mb-3">
                                <p>
                                    Are you sure you want to delete <span
                                    className="fw-bold">"{`${firstName} ${lastName}`}"</span>?
                                </p>
                            </div>
                            <div className="mb-3 float-end">
                                <button className="btn btn-danger btn-sm" name="delete_btn">Yes</button>
                                <button className="btn btn-secondary btn-sm ms-2" name="cancel">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
