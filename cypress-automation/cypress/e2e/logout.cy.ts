import {recurse} from "cypress-recurse";
import {recurseDelay, urls} from "./utils";

describe('Logout', () => {
    const user = {
        email: 'alimorizz1379@gmail.com',
        password: '1234',
    };

    it('after successful login, pressing logout, logs user out', () => {
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

        cy.get('#logout_btn').click();
        cy.url().should('include', '/login');
    });
});