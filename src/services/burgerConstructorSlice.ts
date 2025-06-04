import { orderBurgerApi } from '../utils/burger-api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import {
  RequestStatus,
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '../utils/types';

export interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  requestStatus: RequestStatus;
  order: TOrder | null;
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
  requestStatus: RequestStatus.Idle,
  order: null
};

export const orderBurger = createAsyncThunk<TOrder, string[]>(
  'burgerConstructor/orderBurger',
  async (ingredientIds) => (await orderBurgerApi(ingredientIds)).order
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    sortingConstructor: (state, action) => {
      const { positionA, positionB } = action.payload;
      state.ingredients[positionA] = state.ingredients.splice(
        positionB,
        1,
        state.ingredients[positionA]
      )[0];
    },
    clearConstructor: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.order = action.payload;
          state.requestStatus = RequestStatus.Success;
          state.bun = initialState.bun;
          state.ingredients = initialState.ingredients;
        }
      )
      .addCase(orderBurger.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectConstructorsItems: (state) => state,
    selectConstructorsRequest: (state) => state.requestStatus,
    selectConstructorsOrder: (state) => state.order
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  selectConstructorsItems,
  selectConstructorsRequest,
  selectConstructorsOrder
} = burgerConstructorSlice.selectors;
export const {
  addToConstructor,
  removeFromConstructor,
  sortingConstructor,
  clearConstructor
} = burgerConstructorSlice.actions;
