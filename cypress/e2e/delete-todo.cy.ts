import { generateTodos } from '../support/helpers/todoHelpers';
import { t } from 'i18next';
describe('delete todo', () => {
  const todos = generateTodos(1);
  beforeEach(() => {
    cy.visit('/add');
    
    cy.get('[data-testid="todo-title"]').type(todos[0].title)
    cy.get('[data-testid="todo-due-date"]').type(todos[0].dueDate);
    cy.get('[data-testid="todo-priority"]').select(todos[0].priority)
    cy.get('[data-testid="submit-button"]').click();
  })

  it('should successfully delete a todo', () => {
    cy.get('[data-testid="todo-item"]')
      .should('have.length', 1)
      .and('contain', todos[0].title)

    cy.get('[data-testid="todo-delete-item"]').click()

    cy.on('window:confirm', (text) => {
      expect(text).to.equal(t('todo.actions.deleteConfirm'))
      return true // 確認刪除
    })

    cy.get('[data-testid="todo-item"]')
      .should('have.length', 0)

    cy.get('[id="success-delete-toast"]')
      .should('be.visible')
  })

  it('should cancel delete', () => {
    cy.get('[data-testid="todo-delete-item"]').click()

    cy.on('window:confirm', () => false)

    cy.get('[data-testid="todo-item"]')
      .should('have.length', 1)
      .and('contain', todos[0].title)
  })
})