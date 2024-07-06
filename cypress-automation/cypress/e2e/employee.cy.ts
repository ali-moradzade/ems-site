import {deleteAllEmployees, deleteAllJobs, insertEmployee, insertJob, urls} from "./utils";

interface Employee {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    job: string;
    date: string;
}


describe('Employee', () => {
    let job: { name: string; date: string };

    beforeEach(() => {
        job = {
            name: 'Web Developer',
            date: '2023-02-01',
        };

        cy.visit(urls.jobs).wait(100);
        deleteAllJobs();
        insertJob(job);

        cy.visit(urls.employees).wait(100);
        deleteAllEmployees();
    });

    afterEach(() => {
        cy.visit(urls.jobs).wait(100);
        deleteAllJobs();

        cy.visit(urls.employees).wait(100);
        deleteAllEmployees();
    });

    describe('Add Employee', () => {
        it('given employee properties, creates employee', () => {
            cy.visit(urls.employees).wait(100);

            const employee = {
                email: 'alimorizz1379@gmail.com',
                firstName: 'Ali',
                lastName: 'Moradzade',
                phone: '+9809123456789',
                job: job.name,
                date: '2022-10-11',
            };

            insertEmployee(employee);
        });

        it.only('shows employee details', () => {
            cy.visit(urls.employees).wait(100);

            const mockEmployee: Employee = {
                email: 'email@gmail.com',
                firstName: 'John',
                lastName: 'Doe',
                phone: '+9809123456789',
                job: job.name,
                date: '2022-10-11',
            };

            insertEmployee(mockEmployee);

            cy.get('#employees_table tr').each(($el) => {
                const id = $el.find('td:first').text();
                const email = $el.find('td:nth-child(3)').text();

                if (email === mockEmployee.email) {
                    cy.wrap($el.find('td:nth-child(4)')).click({force: true});

                    // Verify details contains all user infos
                    for (let key in mockEmployee) {
                        cy.get(`#employee_details_${id}_table tr td`).contains(mockEmployee[key]).should('exist');
                    }
                }
            });
        });
        //
        // it('given email and name, updates employee', () => {
        //     cy.visit(url);
        //
        //     // insertMockEmployee();
        //
        //     const email = 'newEmail@gmail.com';
        //     const firstName = 'New John';
        //
        //     cy.get('tr td:nth-child(3)').each(($el, index) => {
        //         const text = $el.text();
        //
        //         if (text === mockEmployee.email) {
        //
        //             cy.get('tr :nth-child(5)').eq(index + 1).click();
        //
        //             cy.get('.modal-dialog').find('input').eq(1).clear().type(firstName);
        //             cy.get('.modal-dialog').find('input').eq(3).clear().type(email);
        //
        //             cy.get('.modal-dialog').contains('Update Employee').click();
        //
        //             cy.get('tr td').contains(firstName).should('exist');
        //             cy.get('tr td').contains(email).should('exist');
        //         }
        //     });
        //
        //     deleteAllEmployees();
        // });
    });
});