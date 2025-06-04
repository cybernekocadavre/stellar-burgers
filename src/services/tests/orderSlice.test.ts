import { RequestStatus, TOrder } from '../../utils/types';
import { getOrderByNumber, initialState, orderReducer } from '../orderSlice';

describe('Тест orderSlice', () => {
  test('Тест статуса ожидания (getOrderByNumber.pending)', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Тест статуса ошибки (getOrderByNumber.rejected)', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.rejected.type
    });
    expect(state.status).toBe(RequestStatus.Failed);
  });

  test('Тест успешной обработки (getOrderByNumber.fulfilled)', () => {
    const order: TOrder = {
      ingredients: [],
      _id: 'test_id',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '',
      updatedAt: '',
      number: 1
    };
    const state = orderReducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: order
    });
    expect(state).toEqual({
      data: order,
      status: RequestStatus.Success
    });
  });
});
