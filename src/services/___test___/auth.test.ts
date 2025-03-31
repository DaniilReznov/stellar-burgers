import authSlice, {
  setUser,
  setAuthorization,
  IUState
} from '../reducers/auth';

const initialState: IUState = {
  user: null,
  isAuthorized: false,
  error: ''
};

describe('authSlice reducer tests', () => {
  it('Должен установить авторизацию через setAuthorization', () => {
    const state = authSlice(initialState, setAuthorization(true));
    expect(state.isAuthorized).toBe(true);
  });

  it('Должен установить пользователя через setUser', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Daniil' }; // Мокированные данные пользователя
    const state = authSlice(initialState, setUser(user));
    expect(state.user).toEqual(user);
  });
});
