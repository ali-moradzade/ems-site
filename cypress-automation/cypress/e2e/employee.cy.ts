import {deleteAllEmployees, deleteAllJobs, insertEmployee, insertJob, urls} from "./utils";

interface Employee {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    job: string;
    date: string;
}

const mockEmployee: Employee = {
    email: 'email@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+9809123456789',
    job: 'Graphic Designer',
    date: '2022-10-11',
};

describe('Employee', () => {
    describe('Add Employee', () => {
        it.only('given employee properties, creates employee', () => {
            const job = {
                name: 'Web Developer',
                date: '2023-02-01',
            };
            const employee = {
                email: 'alimorizz1379@gmail.com',
                firstName: 'Ali',
                lastName: 'Moradzade',
                phone: '+9809123456789',
                job: job.name,
                date: '2022-10-11',
            };

            cy.visit(urls.jobs).wait(100)
                .then(() => {
                    deleteAllJobs();
                    cy.wait(100);
                    insertJob(job);
                })
                .then(() => {
                    cy.visit(urls.employees).wait(100);
                    deleteAllEmployees();
                    insertEmployee(employee);
                })
                .then(() => {
                    cy.visit(urls.jobs).wait(100);
                    deleteAllJobs();
                })
                .then(() => {
                    cy.visit(urls.employees).wait(100);
                    deleteAllEmployees();
                });
        });

        // it('shows employee details', () => {
        //     cy.visit(url);
        //
        //     // insertMockEmployee();
        //
        //     cy.get('tr td:nth-child(3)').each(($el, index) => {
        //         const text = $el.text();
        //
        //         if (text === mockEmployee.email) {
        //             cy.get('tr td:nth-child(4)').eq(index).click();
        //
        //             // Verify details contains all user infos
        //             for (let key in mockEmployee) {
        //                 cy.get('tr td').contains(mockEmployee[key]).should('exist');
        //             }
        //         }
        //     });
        //
        //     deleteAllEmployees();
        // });
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