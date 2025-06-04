import {
  burgerConstructorSlice,
  IBurgerConstructorState
} from '../burgerConstructorSlice';
import { RequestStatus, TIngredient } from '../../utils/types';

describe('burgerConstructorSlice', () => {
  let state: IBurgerConstructorState;

  const ingredient1: TIngredient = {
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
  };
  const ingredient2: TIngredient = {
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
  };

  beforeEach(() => {
    state = {
      bun: null,
      ingredients: [],
      requestStatus: RequestStatus.Idle,
      order: null
    };
  });

  test('обработка экшена добавления ингредиента', () => {
    const action = {
      type: burgerConstructorSlice.actions.addToConstructor.type,
      payload: ingredient1
    };
    const newState = burgerConstructorSlice.reducer(state, action);

    expect(newState.bun).toBe(null);
    expect(newState.ingredients).toContain(ingredient1);
  });

  test('обработка экшена удаления ингредиента', () => {
    const constructorIngredients = {
      ...ingredient1,
      id: '1'
    };
    state.ingredients.push(constructorIngredients);
    const action = {
      type: burgerConstructorSlice.actions.removeFromConstructor.type,
      payload: ingredient1._id
    };
    const newState = burgerConstructorSlice.reducer(state, action);

    expect(newState.bun).toBe(null);
    expect(newState.ingredients).not.toContain(ingredient1);
  });

  test('обработка экшена изменения порядка ингредиентов в начинке', () => {
    const constructorIngredients = {
      ...ingredient1,
      id: '1'
    };
    const constructorIngredients2 = {
      ...ingredient2,
      id: '2'
    };
    state.ingredients.push(constructorIngredients, constructorIngredients2);
    const position = { positionA: 0, positionB: 1 };
    const action = {
      type: burgerConstructorSlice.actions.sortingConstructor.type,
      payload: position
    };
    const newState = burgerConstructorSlice.reducer(state, action);

    expect(newState.ingredients[0]).toEqual(
      expect.objectContaining(ingredient2)
    );
    expect(newState.ingredients[1]).toEqual(
      expect.objectContaining(ingredient1)
    );
  });
});
