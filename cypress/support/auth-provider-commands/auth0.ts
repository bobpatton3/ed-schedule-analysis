function loginViaAuth0Ui(username: string, password: string) {
    cy.visit("http://localhost:3000");
    cy.contains("a", "Login").click();

    cy.origin(
        Cypress.env('auth_url'),
        { args: { username, password } },
        ({ username, password }) => {
            cy.get('input#username').type(username)
            cy.get('input#password').type(password, { log: false })
            cy.contains('button[value=default]', 'Continue').click({ force: true })
        }
    )

    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('equal', 'http://localhost:3000/')
}

/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        loginToAuth0(): Chainable<any>;
    }
}

Cypress.Commands.add('loginToAuth0', () => {
    const username: string = Cypress.env('auth_username');
    const password: string = Cypress.env('auth_password');
    const log = Cypress.log({
        displayName: 'AUTH0 LOGIN',
        message: [`🔐 Authenticating | ${username}`],
        // @ts-ignore
        autoEnd: false,
    })
    log.snapshot('before')


    cy.session(
        `auth0-${username}`,
        () => {
            loginViaAuth0Ui(username, password);
        },
        {
            // Why does this not work?
            // validate: () => {
            //     // Validate presence of access token in localStorage.
            //     cy.wrap(localStorage)
            //         .invoke('getItem', 'authAccessToken')
            //         .should('exist');
            // },
        }
    )

    log.snapshot('after');
    log.end();
})