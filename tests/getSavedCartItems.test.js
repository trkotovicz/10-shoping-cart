const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('I - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {

    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('II - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {

    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
