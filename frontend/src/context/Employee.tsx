import {Employee, EmployeesRestClient} from "../apis/employees";
import {createContext, ReactNode, useState} from "react";

export interface EmployeeContextType {
    employees: Employee[];
    setEmployees: (employees: Employee[]) => void;
    getAllEmployees: (email: string) => Promise<void>;
    createEmployee: (employee: Employee) => Promise<void>;
    updateEmployee: (id: number, attrs: Partial<Employee>) => Promise<void>;
    deleteEmployee: (id: number) => Promise<void>;
}

interface EmployeeProviderProps {
    children: ReactNode;
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({children}: EmployeeProviderProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const restClient = EmployeesRestClient.getEmployeeRestClient();

    const getAllEmployees = async (email: string) => {
        const employees = await restClient.getAllEmployees(email);

        setEmployees(employees);
    };

    const createEmployee = async (employeeData: Employee) => {
        const employee = await restClient.createEmployee(employeeData);

        setEmployees([...employees, employee]);
    };

    const updateEmployee = async (id: number, attrs: Partial<Employee>) => {
        const updatedEmployee = await restClient.updateEmployee(id, attrs);

        const updatedEmployees = employees.map(employee => {
            if (employee.id === id) {
                return updatedEmployee;
            }

            return employee;
        });

        setEmployees(updatedEmployees);
    };

    const deleteEmployee = async (id: number) => {
        await restClient.deleteEmployee(id);

        const updatedEmployees = employees.filter(employee => employee.id !== id);

        setEmployees(updatedEmployees);
    };

    const value = {
        employees,
        setEmployees,
        getAllEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee
    };

    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
}
