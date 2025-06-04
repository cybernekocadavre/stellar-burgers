import { RequestStatus, TIngredient } from '../../utils/types';
import {
  getIngredients,
  ingredientsReducer,
  initialState
} from '../ingredientsSlice';

describe('Тест ingredientsSlice', () => {
  test('Тест статуса ожидания (getIngredients.pending)', () => {
    const state = ingredientsReducer(initialState, getIngredients.pending(''));
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Тест статуса ошибки (getIngredients.rejected)', () => {
    const state = ingredientsReducer(
      initialState,
      getIngredients.rejected(new Error('Error'), '')
    );
    expect(state.status).toBe(RequestStatus.Failed);
  });
  test('Тест успешной обработки (getIngredients.fulfilled)', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Соус',
        type: 'main',
        proteins: 10,
        fat: 15,
        carbohydrates: 20,
        calories: 200,
        price: 100,
        image: 'url',
        image_mobile: 'url',
        image_large: 'url'
      },
      {
        _id: '2',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 15,
        carbohydrates: 20,
        calories: 200,
        price: 100,
        image: 'url',
        image_mobile: 'url',
        image_large: 'url'
      }
    ];
    const state = ingredientsReducer(
      initialState,
      getIngredients.fulfilled(ingredients, '')
    );
    expect(state).toEqual({
      data: ingredients,
      status: RequestStatus.Success
    });
  });
});
