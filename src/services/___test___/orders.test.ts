import { TOrder } from '../../utils/types';
import {
  getFeeds,
  getOrderById,
  getOrders,
  makeOrder,
  orderSlice,
  resetOrder
} from '../reducers/orders';

interface IOrderState {
  order: TOrder | null;
  name: string | null;
  error: string | undefined;
  isLoading: boolean;
  orders: TOrder[];
  orderModal: TOrder[];
  profileOrders: TOrder[];
  costOrder: number | null;
  finalSum: number | null;
}

describe('orderSlice', () => {
  const initialState: IOrderState = {
    order: null,
    name: null,
    error: '',
    isLoading: false,
    orders: [],
    orderModal: [],
    profileOrders: [],
    costOrder: null,
    finalSum: null
  };

  it('Должен вернуть начальное состояние', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('Должен обработать getFeeds/fulfilled', () => {
    const action = {
      type: getFeeds.fulfilled.toString(),
      payload: {
        orders: [
          { _id: 'test-id-1', name: 'test-name-1', price: 100 },
          { _id: 'test-id-2', name: 'test-name-2', price: 200 }
        ],
        total: 300,
        totalToday: 300
      }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: action.payload.orders,
      costOrder: action.payload.total,
      finalSum: action.payload.totalToday
    });
  });

  it('Должен обработать getFeeds/rejected', () => {
    const action = {
      type: getFeeds.rejected.toString(),
      error: { message: 'Mock error' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: action.error.message,
      costOrder: 0,
      finalSum: 0,
      orders: []
    });
  });

  it('Должен обработать getOrders/pending', () => {
    const action = { type: getOrders.pending.toString() };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Должен обработать getOrders/fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.toString(),
      payload: [
        { _id: 'test-id-1', name: 'test-name-1', price: 100 },
        { _id: 'test-id-2', name: 'test-name-2', price: 200 }
      ]
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      profileOrders: action.payload
    });
  });

  it('Должен обработать getOrders/rejected', () => {
    const action = {
      type: getOrders.rejected.toString(),
      error: { message: 'Mock error' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: action.error.message
    });
  });

  it('Должен обработать getOrderById/pending', () => {
    const action = { type: getOrderById.pending.toString() };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Должен обработать getOrderById/fulfilled', () => {
    const action = {
      type: getOrderById.fulfilled.toString(),
      payload: {
        orders: [
          { _id: 'test-id-1', name: 'test-name-1', price: 100 },
          { _id: 'test-id-2', name: 'test-name-2', price: 200 }
        ]
      }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orderModal: action.payload.orders
    });
  });

  it('Должен обработать getOrderById/rejected', () => {
    const action = {
      type: getOrderById.rejected.toString(),
      error: { message: 'Mock error' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: action.error.message
    });
  });

  it('Должен обработать makeOrder/pending', () => {
    const action = { type: makeOrder.pending.toString() };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Должен обработать makeOrder/fulfilled', () => {
    const action = {
      type: makeOrder.fulfilled.toString(),
      payload: {
        name: 'test-name',
        order: { _id: 'test-id', name: 'test-name', price: 100 }
      }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      name: action.payload.name,
      order: action.payload.order
    });
  });

  it('Должен обработать makeOrder/rejected', () => {
    const action = {
      type: makeOrder.rejected.toString(),
      error: { message: 'Mock error' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: action.error.message
    });
  });

  it('Должен обработать resetOrder', () => {
    const action = { type: resetOrder.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: null,
      name: null
    });
  });
});
