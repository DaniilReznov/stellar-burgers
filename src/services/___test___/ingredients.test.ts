/** @jest-environment jsdom */
import { TIngredient } from '@utils-types';
import { renderHook } from '@testing-library/react';
import { ingredientsSlice } from '../reducers/ingredients';
import '@testing-library/jest-dom';

interface IIngredients {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined | null;
}

const initialState: IIngredients = {
  ingredients: [],
  isLoading: false,
  error: ''
};

describe('ingredientsSlice', () => {
  it('Должен вернуть начальное состояние', () => {
    const { result } = renderHook(() =>
      ingredientsSlice.reducer(undefined, { type: 'unknown' })
    );
    expect(result.current).toEqual(initialState);
  });
  it('Должен обработать fetchIngredients/pending', () => {
    const { result } = renderHook(() =>
      ingredientsSlice.reducer(initialState, {
        type: 'ingredients/fetchIngredients/pending'
      })
    );
    expect(result.current.isLoading).toBe(true);
  });
  it('Должен обработать fetchIngredients/fulfilled', () => {
    const ingredients = [
      {
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
      }
    ];
    const { result } = renderHook(() =>
      ingredientsSlice.reducer(initialState, {
        type: 'ingredients/fetchIngredients/fulfilled',
        payload: ingredients
      })
    );
    expect(result.current.ingredients).toEqual(ingredients);
    expect(result.current.isLoading).toBe(false);
  });
  it('Должен обработать fetchIngredients/rejected', () => {
    const error = { message: 'Mock error' };
    const { result } = renderHook(() =>
      ingredientsSlice.reducer(initialState, {
        type: 'ingredients/fetchIngredients/rejected',
        error
      })
    );
    expect(result.current.error).toEqual(error.message);
    expect(result.current.isLoading).toBe(false);
  });
});
