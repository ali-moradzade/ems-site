interface Job {
    name: string;
    date: string;
}

const mockJob: Job = {
    name: 'Graphic Designer',
    date: '2023-02-01',
};

function insertMockJob() {
    // Insert Mock Employee
    cy.contains('Add Job').click();

    cy.get('#add_job').find('input').eq(0)
        .type(mockJob.date);
    cy.get('#add_job').find('input').eq(1)
        .type(mockJob.name);

    cy.get('#add_job').find('button').contains('Add Job')
        .click();

    // Verify it is inserted
    cy.get('tr td').contains(mockJob.name).should('exist');
}

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

// TODO: Does not work
function deleteAllJobs() {
    cy.get('table')
        .then(($el) => {
            const rows = $el.find('tr').length;
            cy.log(rows.toString())
            if (rows > 0) {
                deleteAllJobsHelper(rows);
            }
        });
}

describe('Job', () => {
    const url = 'http://localhost:3000/jobs';

    describe('Add Job', () => {
        it('given job properties, creates job', () => {
            cy.visit(url);

            const job: Job = {
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
        });
    });
});
