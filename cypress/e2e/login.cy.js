/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login');

    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi alert yang muncul
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email tidak boleh kosong');
    });
  });

  it('should display alert when password is empty', () => {
    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi alert yang muncul
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password tidak boleh kosong');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email dan password yang salah
    cy.get('input[placeholder="Email"]').type('xyasty@email.com');
    cy.get('input[placeholder="Password"]').type('rahasia!');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi alert yang muncul
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email dan password yang benar
    cy.get('input[placeholder="Email"]').type('inuza@gmail.com');
    cy.get('input[placeholder="Password"]').type('password');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    // user masuk ke halaman utama
    cy.get('nav')
      .contains(/^Home$/)
      .should('be.visible');
    cy.get('nav')
      .contains(/^Leaderboard$/)
      .should('be.visible');
    cy.get('nav')
      .contains(/^Logout$/)
      .should('be.visible');
    cy.get('.floating-create-btn').should('be.visible');

    // klik tombol logout
    cy.get('nav')
      .contains(/^Logout$/)
      .click();
  });
});
