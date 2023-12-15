describe('Тестирование сайта Читай-Город', () => {
  
  beforeEach (() => {
    cy.visit('https://www.chitai-gorod.ru/')
});

function findTestbook() {
  cy.get('input.header-search__input').should('have.class', 'header-search__input')
    .should('exist')
    .should('be.visible')
    .click();
    cy.get('input.header-search__input')
    .should('have.class', 'header-search__input')
    .should('exist')
    .should('be.visible')
    .type('тестирование{enter}');
}

function getBooks() {
  cy.get('[data-chg-product-id="2948959"] > .product-buttons > .action-button')
  .should('exist')
  .should('be.visible')
  .click();
  cy.get('[data-chg-product-id="2893273"] > .product-buttons > .action-button')
  .should('exist')
  .should('be.visible')
  .click();
  cy.get('[data-chg-product-id="2865707"] > .product-buttons > .action-button')
  .should('exist')
  .should('be.visible')
  .click();
}

  it('Найти поле ввода и ввести слово тестирование', () => {
    cy.get('input.header-search__input')
    .should('have.class', 'header-search__input')
    .should('exist')
    .should('be.visible')
    .click()
    .type('тестирование{enter}')
    cy.clearCookies();
  })

  it('Добавить 3 книги в корзину', () => {
    findTestbook()
    cy.get('[data-chg-product-id="2948959"] > .product-buttons > .action-button')
    .should('exist')
    .should('be.visible')
    .click();
    cy.get('[data-chg-product-id="2893273"] > .product-buttons > .action-button')
    .should('exist')
    .should('be.visible')
    .click();
    cy.get('[data-chg-product-id="2865707"] > .product-buttons > .action-button')
    .should('exist')
    .should('be.visible')
    .click();
    cy.contains('Корзина')
    .click();
    cy.get('.delete-many').contains('Очистить корзину')
    .should('exist')
    .should('be.visible')
    .click();
    cy.clearCookies();
  })

  it('Перейти в корзину, посмотреть цену, удалить одну книгу, посмотреть новую цену', () => {
    findTestbook()
    getBooks()
    cy.contains('Корзина')
    .click()
    cy.get('.cart-sidebar__body')
    .should('exist')
    .scrollIntoView()
    .wait(1000)
    .screenshot();
    cy.get('.product-title__head').contains('Дружеское знакомство с тестированием программ')
    .parent('.product-title')
    .parent('.cart-item__content-title')
    .parent('.cart-item__content-description')
    .parent('.cart-item__content-right')
    .children('.cart-item__actions')
    .children('.cart-item__actions-button--delete')
    .should('exist')
    .should('be.visible')
    .click();
    cy.get('.cart-sidebar__body')
    .should('exist')
    .scrollIntoView()
    .wait(1000)
    .screenshot();
    cy.scrollTo('top', { duration: 2000 });
    cy.get('.delete-many')
    .should('exist')
    .should('be.visible')
    .click();
    cy.clearCookies();
  });

})