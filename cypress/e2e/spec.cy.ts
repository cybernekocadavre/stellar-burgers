const BASE_URL = 'http://localhost:4000';
const BUN = `[data-cy='643d69a5c3f7b9001cfa093d']`;
const INGREDIENT = `[data-cy='643d69a5c3f7b9001cfa093e']`;

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  it('Можно добавить булку и начинку', () => {
    cy.get(BUN).find('button').click();
    cy.get(INGREDIENT).find('button').click();
  });
});

describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  it('Открывается при клике на ингредиент', () => {
    cy.get(BUN).click();
  });

  it('Закрывается по нажатию на крестик', () => {
    cy.get(BUN).click();
    cy.get('[data-cy="modal-close"]').click();
  });

  it('Закрывается по клику вне окна (оверлей)', () => {
    cy.get(BUN).click();
    cy.get('[data-cy="overlay"]').click({ force: true });
  });
});

describe('Процесс оформления заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'test-accessToken');
    localStorage.setItem('refreshToken', 'test-refreshToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    cy.visit(BASE_URL);
  });

  afterEach(() => {
    cy.clearCookies();
    localStorage.clear();
  });

  it('Оформление заказа и закрытие модалки', () => {
    cy.get(BUN).find('button').click();
    cy.get(INGREDIENT).find('button').click().click(); // дважды для начинки
    cy.contains('button', 'Оформить заказ').click();

    cy.get('[data-cy="orderNumber"]').should('contain.text', '46543');
    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="bunTop"]').should('contain.text', 'Выберите булки');
    cy.get('[data-cy="ingredient"]').should('contain.text', 'Выберите начинку');
    cy.get('[data-cy="bunBottom"]').should('contain.text', 'Выберите булки');
  });
});
