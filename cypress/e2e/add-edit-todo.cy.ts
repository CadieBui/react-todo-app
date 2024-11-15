import { generateTodos } from '../support/helpers/todoHelpers';

describe('add edit todo', () => {
  const todos = generateTodos(2);
  it('should show validation errors for empty required fields', () => {
    cy.visit('/add');
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="todo-title-error"]').should('be.visible');
  });

  beforeEach(() => {
    cy.visit('/add');
    cy.get('[data-testid="todo-title"]').type(todos[0].title);
    cy.get('[data-testid="todo-due-date"]').type(todos[0].dueDate);
    cy.get('[data-testid="todo-priority"]').select(todos[0].priority);
    cy.get('[data-testid="submit-button"]').click();
  });

  it('should successfully create a todo', () => {
    cy.url().should('include', '/');
    cy.get('[data-testid="todo-title"]').should('contain', todos[0].title);
  });

  it('should fail add duplicate title', () => {
    cy.visit('/add');
    cy.get('[data-testid="todo-title"]').type(todos[0].title);
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[id="error-duplicate-title-toast"]').should('be.visible');
  })

  it('should successfully edit a todo', () => {
    cy.get('[data-testid="todo-edit-item"]').first().click();
    cy.get('[data-testid="todo-title"]').clear().type(todos[1].title);
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should('include', '/');
    cy.get('[data-testid="todo-title"]').should('contain', todos[1].title);
  });

  it('should fail edit a todo', () => {
    cy.get('[data-testid="todo-edit-item"]').first().click();
    cy.get('[data-testid="todo-title"]').clear();
    cy.get('[data-testid="todo-due-date"]').clear();
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="todo-title-error"]').should('be.visible');
    cy.get('[data-testid="todo-due-date-error"]').should('be.visible');
  });

  it('should fail edit duplicate title', () => {
    cy.visit('/add');
    cy.get('[data-testid="todo-title"]').type(todos[1].title);
    cy.get('[data-testid="todo-due-date"]').type(todos[1].dueDate);
    cy.get('[data-testid="todo-priority"]').select(todos[1].priority);
    cy.get('[data-testid="submit-button"]').click();

    cy.wait(1000);

    cy.get('[data-testid="todo-edit-item"]').first().click();
    cy.get('[data-testid="todo-title"]').clear().type(todos[1].title);
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[id="error-duplicate-title-toast"]').should('be.visible');
  })
});
