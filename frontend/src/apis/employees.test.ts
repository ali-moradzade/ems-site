import {EmployeesRestClient} from "./employees";

const mockEmployee = {
    email: 'email@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+9809123456789',
    job: 'Graphic Designer',
    date: '2022-10-11',
};

// TODO: this test breaks with change of db everytime, fix it
describe('Employees API', () => {
    const restClient = EmployeesRestClient.getEmployeeRestClient();

    test('getAllEmployees, given email, returns all employees', async () => {
        const employees = await restClient.getAllEmployees(mockEmployee.email);

        expect(employees.length).toEqual(0)
    })

    test('createEmployee, given properties, creates employee', async () => {
        const employee = await restClient.createEmployee(mockEmployee);

        expect(employee).toBeDefined();
        expect(employee.email).toEqual(mockEmployee.email);
    })
})
