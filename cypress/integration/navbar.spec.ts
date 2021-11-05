describe('Navbar UI', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('links should work when unauthenticated', () => {
		cy.getByTestId('nav-link-login').click();
		cy.url().should('deep.equal', 'http://localhost:3000/login');

		cy.getByTestId('nav-link-register').click();
		cy.url().should('deep.equal', 'http://localhost:3000/register');

		cy.getByTestId('nav-link-logo').click();
		cy.url().should('deep.equal', 'http://localhost:3000/');
	});
});
