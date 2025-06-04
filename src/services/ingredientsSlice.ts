import { getIngredientsApi } from './../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, RequestStatus } from '../utils/types';

interface TIngredientsState {
  data: TIngredient[];
  status: RequestStatus;
}

export const initialState: TIngredientsState = {
  data: [],
  status: RequestStatus.Idle
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorIngredientsData: (state: TIngredientsState) => state.data,
    selectorIngredientsStatus: (state: TIngredientsState) => state.status
  }
});

export const selectorIngredients = ingredientsSlice.selectors;
export const { selectorIngredientsData, selectorIngredientsStatus } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
