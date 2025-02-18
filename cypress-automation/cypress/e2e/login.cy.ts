import {recurse} from "cypress-recurse";
import {recurseDelay, urls} from "./utils";

describe('Login', () => {
    const user = {
        email: 'alimorizz1379@gmail.com',
        password: '1234',
    };

    it('existing user, given its credentials, logins', () => {
        cy.visit(urls.login);

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

        cy.get('button[type=submit]').click();

        cy.url().should('include', '/dashboard');
    });

    it('existing user, invalid credentials, shows error', () => {
        cy.visit(urls.login);
        const password = 'invalid-pass';

        // handle flaky inputs
        recurse(
            () => cy.get('input[type=email]')
                .clear().type(user.email),

            ($input) => $input.val() === user.email,
            {delay: recurseDelay}
        ).should('have.value', user.email);
        recurse(
            () => cy.get('input[type=password]')
                .clear().type(password),

            ($input) => $input.val() === password,
            {delay: recurseDelay}
        ).should('have.value', password);

        cy.get('button[type=submit]').click();

        cy.get('#login_alert').should('be.visible')
    });
});