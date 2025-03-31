import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorReducer',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.bun = action.payload;
            break;
          default:
            state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredients: TIngredient) => ({
        payload: { ...ingredients, id: nanoid() }
      })
    },
    removeIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    },
    resetState: (state) => (state = initialState),
    moveIngredientsUp(state, action) {
      const current = action.payload;
      if (current > 0) {
        state.ingredients[current] = state.ingredients.splice(
          current - 1,
          1,
          state.ingredients[current]
        )[0];
      }
    },
    moveIngredientsDown(state, action) {
      const current = action.payload;
      if (current >= 0) {
        state.ingredients[current] = state.ingredients.splice(
          current + 1,
          1,
          state.ingredients[current]
        )[0];
      }
    },
    deleteIngredient(state, action) {
      const current = action.payload;
      state.ingredients.splice(current, 1);
    }
  },
  selectors: {
    stateSelector: (state) => state
  }
});

export const { stateSelector } = constructorSlice.selectors;
export const {
  addIngredients,
  removeIngredients,
  resetState,
  moveIngredientsUp,
  moveIngredientsDown,
  deleteIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;
