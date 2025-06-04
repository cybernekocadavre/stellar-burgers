import { getOrderByNumberApi } from './../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '../utils/types';

interface TOrderState {
  data: TOrder | null;
  status: RequestStatus;
}

export const initialState: TOrderState = {
  data: null,
  status: RequestStatus.Idle
};

export const getOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorOrderData: (state: TOrderState) => state.data,
    selectorOrderStatus: (state: TOrderState) => state.status
  }
});

export const selectorIngredients = orderSlice.selectors;
export const { selectorOrderData, selectorOrderStatus } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
