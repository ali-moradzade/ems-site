import {recurse} from 'cypress-recurse';

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
            const elements = $el.length - 1;

            if (elements > 0) {
                deleteAllJobsHelper(elements);
            }
        });
}

function insertJob(job: { name: string, date: string }) {
    cy.contains('Add Job').click();

    // Handling flaky inputs
    recurse(
        () => cy.get('#add_job').find('input').eq(0)
            .clear().type(job.date),

        ($input) => $input.val() === job.date,
    ).should('have.value', job.date);

    recurse(
        () => cy.get('#add_job').find('input').eq(1)
            .clear().type(job.name),

        ($input) => $input.val() === job.name,
    ).should('have.value', job.name);

    cy.get('#add_job').find('button').contains('Add Job')
        .click();

    cy.get('tr td').contains(job.name).should('exist');
}

describe('Job', () => {
    const url = 'http://localhost:3000/jobs';

    describe('Add Job', () => {
        it('given job properties, creates job', () => {
            cy.visit(url);

            const job = {
                name: 'Web Developer',
                date: '2022-10-09',
            };

            insertJob(job);
        });
    });

    describe('Job Details', () => {
        it.only('shows job details', () => {
            cy.visit(url);
            const job = {
                name: 'Graphic Designer',
                date: '2023-11-08',
            };

            insertJob(job);
            insertJob(job);
            insertJob(job);
            insertJob(job);
            insertJob(job);

            let firstTime = true; // handle job with duplicate name

            cy.get('tr td:nth-child(2)').each(($el, index) => {
                const text = $el.text();

                if (text === job.name && firstTime) {
                    cy.get('tr td:nth-child(2)').eq(index).next().click({force: true});
                    firstTime = false;

                    for (let key in job) {
                        cy.get('.modal tr td').contains(job[key]).should('exist');
                    }
                }
            });

            deleteAllJobs();
        });
    });
});
