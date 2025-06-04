import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../ingredientsSlice';
import { burgerConstructorSlice } from '../burgerConstructorSlice';
import { feedSlice } from '../feedSlice';
import { orderSlice } from '../orderSlice';
import { userSlice } from '../userSlice';
import { ordersSlice } from '../ordersSlice';

const rootReducer = {
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [userSlice.name]: userSlice.reducer
};

describe('Тест rootReducer', () => {
  test('должен правильно инициализироваться', () => {
    const store = configureStore({
      reducer: rootReducer,
      devTools: false
    });

    expect(store.getState()).toEqual({
      [ingredientsSlice.name]: ingredientsSlice.reducer(undefined, {
        type: '@@INIT'
      }),
      [burgerConstructorSlice.name]: burgerConstructorSlice.reducer(undefined, {
        type: '@@INIT'
      }),
      [feedSlice.name]: feedSlice.reducer(undefined, { type: '@@INIT' }),
      [orderSlice.name]: orderSlice.reducer(undefined, { type: '@@INIT' }),
      [ordersSlice.name]: ordersSlice.reducer(undefined, { type: '@@INIT' }),
      [userSlice.name]: userSlice.reducer(undefined, { type: '@@INIT' })
    });
  });
});
