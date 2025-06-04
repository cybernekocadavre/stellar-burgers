import type {} from 'cypress';

const testUrl = 'http://localhost:4000';
const modal = '[data-cy="modal"]';

beforeEach(() => {
  window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
  cy.setCookie('accessToken', '9P36vGVYXkHb=oWdyXfAc?Fc42-5vWzC');

  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

  cy.visit(testUrl);
  cy.viewport('macbook-13');
});

afterEach(function () {
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe('Тесты страницы конструктора бургера', function () {
  it('Тест добавления булок и начинок в конструктор', () => {
    cy.get('[data-cy="ingredient-type-bun"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]').should('be.visible');
    cy.get('[data-cy="constructor-bun-2"]').should('be.visible');

    cy.get('[data-cy="ingredient-type-main"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-item"]').should('be.visible');

    cy.get('[data-cy="ingredient-type-sauce"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-item"]').should('be.visible');
  });

  it('Тест работы модальных окон', () => {
    //открытие модального окна ингредиента;
    cy.get('[data-id="ingredient-id-1"]').click();
    cy.get(modal).should('be.visible');

    //закрытие по клику на крестик;
    cy.get('[data-cy="modal-close"]').click();
    cy.get(modal).should('not.exist');

    //закрытие по клику на оверлей
    cy.get('[data-id="ingredient-id-1"]').click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(modal).should('not.exist');
  });

  it('Тест оформления заказа', () => {
    //Собирается бургер.
    cy.get('[data-cy="ingredient-type-bun"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-type-main"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-type-sauce"]').contains('Добавить').click();

    //Вызывается клик по кнопке «Оформить заказ»
    cy.get('[data-cy="order-button"]').click();

    //Проверяется, что модальное окно открылось и номер заказа верный.
    cy.get(modal).contains('46436').should('exist');

    //Закрывается модальное окно и проверяется успешность закрытия.
    cy.get('[data-cy="modal-close"]').click();
    cy.get(modal).should('not.exist');

    //Проверяется, что конструктор пуст.
    cy.get('[data-cy="constructor-bun-1"]')
      .contains('Выберите булки')
      .should('exist');
    cy.get('[data-cy="constructor-bun-2"]')
      .contains('Выберите булки')
      .should('exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Выберите начинку')
      .should('exist');
  });
});
