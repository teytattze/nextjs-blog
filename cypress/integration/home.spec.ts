describe('Navbar UI', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('display logo link', () => {
		cy.get('a').should('have.length', 3);
		cy.get('a')
			.first()
			.should('have.text', 'MyBlog')
			.should('have.attr', 'href')
			.and('include', '/');
	});

	it('display login link', () => {
		cy.get('[data-testid=nav-link-login]')
			.should('have.text', 'Login')
			.should('have.attr', 'href')
			.and('include', '/login');
	});
});
