import store from '../store';
import { clearFeed, getFeeds, feedReducer, initialState } from '../feedSlice';
import { RequestStatus, TOrdersData } from '../../utils/types';

describe('feedSlice', () => {
  beforeEach(() => {
    store.dispatch(clearFeed());
  });

  const orderData: TOrdersData = {
    orders: [
      {
        ingredients: [],
        _id: 'test_id',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '',
        updatedAt: '',
        number: 1
      }
    ],
    total: 120,
    totalToday: 20
  };

  test('Тест статуса ожидания (getFeeds.pending)', async () => {
    const state = feedReducer(initialState, getFeeds.pending(''));
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Тест статуса ошибки (getFeeds.rejected)', async () => {
    const state = feedReducer(
      initialState,
      getFeeds.rejected(new Error('Error'), '')
    );
    expect(state.status).toBe(RequestStatus.Failed);
  });

  test('Тест успешной обработки (getFeeds.fulfilled)', async () => {
    const state = feedReducer(initialState, getFeeds.fulfilled(orderData, ''));
    expect(state).toEqual({
      status: RequestStatus.Success,
      orders: orderData.orders,
      total: orderData.total,
      totalToday: orderData.totalToday
    });
  });
});
