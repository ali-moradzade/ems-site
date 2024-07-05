const url = 'http://localhost:3000/employees';

describe('template spec', () => {
    describe('Add Employee', () => {
        it('given employee properties, creates employee', () => {
            cy.visit(url);

            // Insert Employee
            cy.contains('Add Employee').click();

            cy.get('#add_employee').find('input').eq(0)
                .type('2023-01-01');
            cy.get('#add_employee').find('input').eq(1)
                .type('John');
            cy.get('#add_employee').find('input').eq(2)
                .type('Doe');
            cy.get('#add_employee').find('input').eq(3)
                .type('johndoe@gmail.com');
            cy.get('#add_employee').find('input').eq(4)
                .type('+989012345678');
            cy.get('#add_employee').find('select')
                .select('Graphic Designer');

            cy.get('#add_employee').find('button').contains('Add Employee')
                .click();

            // Verify it is inserted
            cy.get('tr td').contains('johndoe@gmail.com').should('exist');

            // Delete the employee
            cy.get('tr td:nth-child(3)').each(($el, index) => {
                const text = $el.text();

                if (text === 'johndoe@gmail.com') {
                    cy.get('tr td:nth-child(6)').eq(index).click();
                    cy.get('form').contains('Delete').click({force: true});
                }
            });

            // Verify deleted
            cy.contains('johndoe@gmail.com').should('not.exist');
        });
    });
});