import {recurse} from "cypress-recurse";
import {recurseDelay, urls, USER} from "./config";
import {login} from "./utils";

describe('Login', () => {
    it('existing user, given its credentials, logins', () => {
        cy.visit(urls.login);
        login()
    });

    it('existing user, invalid credentials, shows error', () => {
        cy.visit(urls.login);
        const password = 'invalid-pass';

        // handle flaky inputs
        recurse(
            () => cy.get('input[type=email]')
                .clear().type(USER.email),

            ($input) => $input.val() === USER.email,
            {delay: recurseDelay}
        ).should('have.value', USER.email);
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