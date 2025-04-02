import { rootReducer } from '../store';
import { authSlice } from '../reducers/auth';
import { constructorSlice } from '../reducers/constructor';
import { ingredientsSlice } from '../reducers/ingredients';
import { orderSlice } from '../reducers/orders';

describe('rootReducer', () => {
  it('Должен возвращать начальное состояние при вызове с неопределенным состоянием и неизвестным действием', () => {
    // Вызываем rootReducer с undefined состоянием и неизвестным экшеном
    const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Ожидаем, что результат будет равен объединенному начальному состоянию всех слайсов
    const expectedInitialState = {
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [constructorSlice.name]: constructorSlice.getInitialState(),
      [authSlice.name]: authSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState()
    };

    expect(result).toEqual(expectedInitialState);
  });
});
