describe('Сборка бургера', () => {
  const interceptEndpoints = () => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'makeOrder'
    );
  };

  const setupUserSession = () => {
    cy.setCookie('accessToken', 'testToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  };

  const visitApp = () => {
    cy.visit('http://localhost:4000/');
  };

  const makeAliases = () => {
    cy.get('[data-cy=ConstructorItemsBuns]').as('bunAddBtn');
    cy.get('[data-cy=IngredientsInConstructor]').as('ingredientAddBtn');
    cy.get('[data-cy=ConstructorItemsIngredients]').as('constructorItems');
    cy.get('[data-cy=ConstructorItemsSauces]').as('sauceAddBtn');
  };

  beforeEach(() => {
    interceptEndpoints();
    setupUserSession();
    visitApp();
    cy.wait('@getUser');
    cy.wait('@ingredients');
    makeAliases();
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('проверяем доступность приложения', function () {
    it('сервис должен быть доступен по адресу localhost:4000', function () {
      cy.visit('http://localhost:4000');
    });
  });

  describe('Добавление ингредиентов в бургер', () => {
    it('Добавление булки в бургер', () => {
      cy.get('@bunAddBtn').contains('Добавить').click();
      cy.get('[data-cy=TopBunInConstructor]').as('topBun');
      cy.get('@topBun').should('contain', 'Краторная булка N-200i');
      cy.get('[data-cy=BottomBunInConstructor]', { timeout: 20000 }).as(
        'bottomBun'
      );
      cy.get('@bottomBun').should('contain', 'Краторная булка N-200i');
    });

    it('Добавление начинки в бургер', () => {
      cy.get('@ingredientAddBtn').contains('Добавить').click();
      cy.get('@constructorItems').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });

    it('Добавление соуса в бургер', () => {
      cy.get('@sauceAddBtn').contains('Добавить').click();
      cy.get('@constructorItems').should('contain', 'Соус Spicy-X');
    });
  });

  describe('Модальные окна ингредиентов', () => {
    it('Открытие и закрытие модального окна ингредиентов', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy=Modal]').as('modal');
      cy.get('[data-cy=CloseModalButton]').as('closeModalBtn');
      cy.get('@modal').contains('Краторная булка N-200i').should('be.visible');
      cy.get('@closeModalBtn').click().should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Отображение пользователя', () => {
      cy.get('header').contains('Хитрый сов').should('exist');
    });

    it('Создание заказа', () => {
      cy.get('@bunAddBtn').contains('Добавить').click();
      cy.get('@ingredientAddBtn').contains('Добавить').click();
      cy.get('@sauceAddBtn').contains('Добавить').click();
      cy.get('[type=button]').contains('Оформить заказ').click();
      cy.wait('@makeOrder', { timeout: 1000 })
        .its('response.statusCode')
        .should('eq', 200);
      cy.get('[data-cy=Modal]').as('modal');

      cy.get('@modal').should('be.visible');
      cy.get('@modal').find('button').click().should('not.exist');

      cy.get('@constructorItems').should('contain', 'Выберите начинку');
    });
  });
});
