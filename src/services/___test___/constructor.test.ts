import constructorReducer, {
  addIngredients,
  removeIngredients,
  resetState,
  moveIngredientsUp,
  IConstructorState,
  moveIngredientsDown,
  deleteIngredient
} from '../reducers/constructor';
import { TIngredient } from '@utils-types';
jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'test-id')
}));

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Mock Ingredient',
  type: 'main',
  proteins: 12,
  fat: 15,
  carbohydrates: 10,
  calories: 200,
  price: 50,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

describe('constructorSlice reducer', () => {
  it('Добавление ингредиента', () => {
    const initialState: IConstructorState = {
      bun: null,
      ingredients: []
    };

    const action = addIngredients(mockIngredient);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual({
      ...mockIngredient,
      id: 'test-id'
    });
  });

  it('Добавление булки в конструктор', () => {
    const initialState: IConstructorState = {
      bun: null,
      ingredients: []
    };

    const mockBun: TIngredient = {
      ...mockIngredient,
      type: 'bun'
    };

    const action = addIngredients(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toEqual({
      ...mockBun,
      id: 'test-id'
    });
    expect(state.ingredients.length).toBe(0);
  });

  it('Удаление по id', () => {
    const initialState: IConstructorState = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'test-id-1' },
        { ...mockIngredient, id: 'test-id-2' }
      ]
    };

    const action = removeIngredients([{ ...mockIngredient, id: 'test-id-1' }]);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0].id).toBe('test-id-1');
  });

  it('Сброс до начального состояния', () => {
    const initialState: IConstructorState = {
      bun: { ...mockIngredient, type: 'bun', id: 'test-bun-id' },
      ingredients: [{ ...mockIngredient, id: 'test-id-1' }]
    };

    const action = resetState();
    const state = constructorReducer(initialState, action);

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('Поднятие ингредиента', () => {
    const initialState: IConstructorState = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'test-id-1' },
        { ...mockIngredient, id: 'test-id-2' }
      ]
    };

    const action = moveIngredientsUp(1);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients[0].id).toBe('test-id-2');
    expect(state.ingredients[1].id).toBe('test-id-1');
  });

  it('Понижение ингредиента', () => {
    const initialState: IConstructorState = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'test-id-1' },
        { ...mockIngredient, id: 'test-id-2' }
      ]
    };

    const action = moveIngredientsDown(0);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients[0].id).toBe('test-id-2');
    expect(state.ingredients[1].id).toBe('test-id-1');
  });

  it('Удаление ингредиента', () => {
    const initialState: IConstructorState = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'test-id-1' },
        { ...mockIngredient, id: 'test-id-2' }
      ]
    };

    const action = deleteIngredient(0);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0].id).toBe('test-id-2');
  });
});
