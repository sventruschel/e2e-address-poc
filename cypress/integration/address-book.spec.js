/// <reference types="cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Address Book", () => {
  const email = chance.email();
  const pass = "Ikwilerin123!";

  const first = chance.first();
  const last = chance.last();

  const firstName = chance.first();
  const lastName = chance.last();
  const emailAddress = chance.email();
  const company = chance.company();
  const position = chance.profession();
  const phone = chance.phone();
  const remark = chance.string();

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("can visit the landing page", () => {
    cy.visit("https://e2e-addressbook.betty.app/");
  });

  it("should contain title", () => {
    cy.contains("Address Book - Login");
  });

  it("sign up new user", () => {
    cy.get('[data-component="new-account"]').click();

    cy.url().should("include", "new-account");

    cy.get('[data-component="first-name"] > input').type(first);
    cy.get('[data-component="last-name"] > input').type(last);
    cy.get('[data-component="email"] > input').type(email);
    cy.get('[data-component="password"] > input').type(pass);
    cy.get('[data-component="create-account"]').click();
  });

  it("go back to login", () => {
    cy.get('[data-component="back-to-login"]').click();
    cy.url().should("include", "login");
    cy.contains("Address Book - Login");
  });

  it("login", () => {
    cy.get('[data-component="email"] > input').type(email);
    cy.get('[data-component="password"] > input').type(pass);
    cy.get('[data-component="login"]').click();

    cy.contains(first);
    cy.contains("Contacts");
  });

  it("open and close create dialog", () => {
    cy.get('[data-component="create-contact"]')
      .contains("Create contact")
      .click();
    cy.get('[data-component="create-dialog"]').should(
      "not.have.css",
      "visibility",
      "hidden"
    );
    cy.get('[data-component="close-create"]').click();
    cy.get('[data-component="create-dialog"]').should(
      "have.css",
      "visibility",
      "hidden"
    );
    cy.get('[data-component="create-contact"]')
      .contains("Create contact")
      .click();
    cy.get('[data-component="create-dialog"]').should(
      "not.have.css",
      "visibility",
      "hidden"
    );
    cy.get('[data-component="cancel-create"]').click();
    cy.get('[data-component="create-dialog"]').should(
      "have.css",
      "visibility",
      "hidden"
    );
  });

  it("create a new contact", () => {
    cy.restoreLocalStorage();
    cy.get('[data-component="create-contact"]').click();
    cy.get('[data-component="create-dialog"]').should(
      "not.have.css",
      "visibility",
      "hidden"
    );

    cy.get('[data-component="first-name"] > input').type(firstName);
    cy.get('[data-component="last-name"] > input').type(lastName);
    cy.get('[data-component="company"] > input').type(company);
    cy.get('[data-component="position"] > input').type(position);
    cy.get('[data-component="email"]').type(emailAddress);
    cy.get('[data-component="phone"] > input').type(phone);
    cy.get('[data-component="remark"]').type(remark);
    cy.get('[data-component="create-contact-submit"]').click();

    cy.get('[data-component="searchfield"] > input').type(emailAddress);

    cy.get('[data-component="create-dialog"]').should(
      "have.css",
      "visibility",
      "hidden"
    );

    const dataTable = cy.get('[data-component="contacts-table"]');
    cy.contains('[data-component="contacts-table"]', firstName);
    cy.contains('[data-component="contacts-table"]', lastName);
    cy.contains('[data-component="contacts-table"]', company);
    cy.contains('[data-component="contacts-table"]', emailAddress);
    cy.contains('[data-component="contacts-table"]', phone);
  });
});
