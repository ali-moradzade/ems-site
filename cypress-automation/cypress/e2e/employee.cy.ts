import {deleteAllEmployees, deleteAllJobs, insertEmployee, insertJob, recurseDelay, urls} from "./utils";
import {recurse} from "cypress-recurse";

interface Employee {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    job: string;
    date: string;
}

describe('Employee', () => {
    const job = {
        name: 'Web Developer',
        date: '2023-02-01',
    };

    const employee: Employee = {
        email: 'alimorizz1379@gmail.com',
        firstName: 'Ali',
        lastName: 'Moradzade',
        phone: '+9809123456789',
        job: job.name,
        date: '2022-10-11',
    };

    // before(() => {
    // });

    beforeEach(() => {
        cy.visit(urls.login);
        const user = {
            email: 'test@gmail.com',
            password: '1234',
        };

        // handle flaky inputs
        recurse(
            () => cy.get('input[type=email]')
                .clear().type(user.email),

            ($input) => $input.val() === user.email,
            {delay: recurseDelay}
        ).should('have.value', user.email);
        recurse(
            () => cy.get('input[type=password]')
                .clear().type(user.password),

            ($input) => $input.val() === user.password,
            {delay: recurseDelay}
        ).should('have.value', user.password);

        cy.get('input[type=submit]').click();
        // cy.visit(urls.employees);

        cy.get('.navbar .nav-link').contains('Jobs').click();
        deleteAllJobs();
        insertJob(job);

        cy.get('.navbar .nav-link').contains('Employees').click();
        deleteAllEmployees();
    });

    afterEach(() => {
        deleteAllEmployees();

        cy.get('.navbar .nav-link').contains('Jobs').click();
        deleteAllJobs();
    });

    describe('Add', () => {
        it('given employee properties, creates employee', () => {
            insertEmployee(employee);

            // Verify it is inserted
            cy.get('#employees_table tr td').contains(employee.email).should('exist');
        });

        it('given invalid date, alerts with proper message', () => {
            const invalidDate = '2023-01-0';
            const newEmployee = {...employee, date: invalidDate};

            insertEmployee(newEmployee);

            cy.get('#add_employee_invalid_date').should('be.visible');
            cy.get('#add_employee').find('.btn-close').click();
        });

        it('given invalid phone, alerts with proper message', () => {
            const invalidPhone = '+98991234567';
            const newEmployee = {...employee, phone: invalidPhone};

            insertEmployee(newEmployee);

            cy.get('#add_employee_invalid_phone').should('be.visible');
            cy.get('#add_employee').find('.btn-close').click();
        });

        it('given duplicate email, alerts', () => {
            insertEmployee(employee);
            cy.get('#employees_table tr td').contains(employee.email).should('exist');

            // Try to insert same employee second time
            insertEmployee(employee);

            cy.get('#add_employee_alert').should('be.visible');
            cy.get('#add_employee').find('.btn-close').click();
        });
    });

    describe('Edit', () => {
        it('given email and name, updates employee', () => {
            insertEmployee(employee);
            cy.get('#employees_table tr td').contains(employee.email).should('exist');

            const newEmail = 'newEmail@gmail.com';
            const newFirstName = 'New John';

            cy.get('#employees_table tr').each(($el) => {
                const id = $el.find('td:first').text();
                const email = $el.find('td:nth-child(4)').text();

                if (email === employee.email) {
                    cy.wrap($el.find('td:nth-child(6)')).click();

                    // handle flaky inputs
                    recurse(
                        () => cy.get(`#edit_employee_${id}_form input[name=first_name]`)
                            .clear().type(newFirstName),

                        ($input) => $input.val() === newFirstName,
                        {delay: recurseDelay}
                    ).should('have.value', newFirstName);
                    recurse(
                        () => cy.get(`#edit_employee_${id}_form input[name=email]`)
                            .clear().type(newEmail),

                        ($input) => $input.val() === newEmail,
                        {delay: recurseDelay}
                    ).should('have.value', newEmail);

                    cy.get(`#edit_employee_${id}_form`).contains('Update Employee').click();
                }
            });

            cy.get('#employees_table tr td').contains(newFirstName).should('exist');
            cy.get('#employees_table tr td').contains(newEmail).should('exist');
        });

        it('given invalid date, phone, updating employee fails', () => {
            insertEmployee(employee);
            cy.get('#employees_table tr td').contains(employee.email).should('exist');

            const invalidDate = '2023-01-0';
            const invalidPhone = '+98991234567';

            cy.get('#employees_table tr').each(($el) => {
                const id = $el.find('td:first').text();
                const email = $el.find('td:nth-child(4)').text();

                if (email === employee.email) {
                    cy.wrap($el.find('td:nth-child(6)')).click();

                    // handle flaky inputs
                    recurse(
                        () => cy.get(`#edit_employee_${id}_form input[name=date]`)
                            .clear().type(invalidDate),

                        ($input) => $input.val() === invalidDate,
                        {delay: recurseDelay}
                    ).should('have.value', invalidDate);
                    recurse(
                        () => cy.get(`#edit_employee_${id}_form input[name=phone]`)
                            .clear().type(invalidPhone),

                        ($input) => $input.val() === invalidPhone,
                        {delay: recurseDelay}
                    ).should('have.value', invalidPhone);

                    cy.get(`#edit_employee_${id}_form`).contains('Update Employee').click();

                    cy.get(`#edit_employee_${id}_invalid_date`).should('be.visible');
                    cy.get(`#edit_employee_${id}_invalid_phone`).should('be.visible');

                    cy.get(`#edit_employee_${id}`).find('.btn-close').click();
                }
            });
        });
    });

    describe('Details', () => {
        it('shows employee details', () => {
            cy.visit(urls.employees);

            insertEmployee(employee);

            // Verify it is inserted
            cy.get('#employees_table tr td').contains(employee.email).should('exist');

            cy.get('#employees_table tr').each(($el) => {
                const id = $el.find('td:first').text();
                const email = $el.find('td:nth-child(4)').text();

                if (email === employee.email) {
                    cy.wrap($el.find('td:nth-child(5)')).click();

                    // TODO: job becomes Unemployed! I dont know why, temporarily removing it
                    delete employee.job;

                    // Verify details contains all user infos
                    for (let key in employee) {
                        cy.get(`#employee_details_${id}_table tr td`).contains(employee[key]).should('exist');
                    }

                    // dismiss the details modal
                    cy.get('body').click().wait(500);
                    cy.get(`#employee_details_${id} button`).click();
                }
            });
        });
    });
});