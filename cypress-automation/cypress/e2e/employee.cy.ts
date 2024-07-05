const url = 'http://localhost:3000/employees';

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

function insertMockEmployee() {
    // Insert Mock Employee
    cy.contains('Add Employee').click();

    cy.get('#add_employee').find('input').eq(0)
        .type(mockEmployee.date);
    cy.get('#add_employee').find('input').eq(1)
        .type(mockEmployee.firstName);
    cy.get('#add_employee').find('input').eq(2)
        .type(mockEmployee.lastName);
    cy.get('#add_employee').find('input').eq(3)
        .type(mockEmployee.email);
    cy.get('#add_employee').find('input').eq(4)
        .type(mockEmployee.phone);
    cy.get('#add_employee').find('select')
        .select(mockEmployee.job);

    cy.get('#add_employee').find('button').contains('Add Employee')
        .click();

    // Verify it is inserted
    cy.get('tr td').contains(mockEmployee.email).should('exist');
}

function deleteAllEmployees() {
    cy.get('tr td:nth-child(3)').each(($el) => {
        const email = $el.text();

        cy.get('tr td:nth-child(6)').eq(0).click({force: true});
        cy.get('form').contains('Delete').click({force: true});

        // Verify deleted
        cy.contains(email).should('not.exist');
    });
}

describe('Employee', () => {
    describe('Add Employee', () => {
        it('given employee properties, creates employee', () => {
            const employee = {
                email: 'alimorizz1379@gmail.com',
                firstName: 'Ali',
                lastName: 'Moradzade',
                phone: '+9809123456789',
                job: 'Web Developer',
                date: '2022-10-11',
            };

            cy.visit(url);

            cy.contains('Add Employee').click();

            cy.get('#add_employee').find('input').eq(0)
                .type(employee.date);
            cy.get('#add_employee').find('input').eq(1)
                .type(employee.firstName);
            cy.get('#add_employee').find('input').eq(2)
                .type(employee.lastName);
            cy.get('#add_employee').find('input').eq(3)
                .type(employee.email);
            cy.get('#add_employee').find('input').eq(4)
                .type(employee.phone);
            cy.get('#add_employee').find('select')
                .select(employee.job);

            cy.get('#add_employee').find('button').contains('Add Employee')
                .click();

            // Verify it is inserted
            cy.get('tr td').contains(employee.email).should('exist');

            deleteAllEmployees();
        });

        it('shows employee details', () => {
            cy.visit(url)

            insertMockEmployee()

            cy.get('tr td:nth-child(3)').each(($el, index) => {
                const text = $el.text();

                if (text === mockEmployee.email) {
                    cy.get('tr td:nth-child(4)').eq(index).click();

                    // Verify details contains all user infos
                    for (let key in mockEmployee) {
                        cy.get('tr td').contains(mockEmployee[key]).should('exist');
                    }
                }
            });
        });
    });
});