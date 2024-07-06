function deleteAllJobsHelper(rowCount: number) {
    if (rowCount < 1) {
        return;
    }

    cy.get('tbody > tr td:nth-child(5)').last().click({force: true});
    cy.get('.modal-body > form')?.find('.btn-danger').last().click({force: true})
        .then(() => {
            deleteAllJobsHelper(--rowCount);
        });
}

function deleteAllJobs() {
    cy.get('table tbody')
        .then(($el) => {
            const elements = $el.length;

            if (elements > 1) {
                deleteAllJobsHelper(elements);
            }
        });
}

describe('Job', () => {
    const url = 'http://localhost:3000/jobs';

    describe('Add Job', () => {
        it('given job properties, creates job', () => {
            cy.visit(url);

            const job  = {
                name: 'Web Developer',
                date: '2022-10-09',
            };

            cy.contains('Add Job').click();

            cy.get('#add_job').find('input').eq(0)
                .type(job.date);
            cy.get('#add_job').find('input').eq(1)
                .type(job.name);

            cy.get('#add_job').find('button').contains('Add Job')
                .click();

            cy.get('tr td').contains(job.name).should('exist');

            deleteAllJobs();
        });
    });
});
