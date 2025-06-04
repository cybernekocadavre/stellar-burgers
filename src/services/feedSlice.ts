import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TOrdersData } from './../utils/types';
import { getFeedsApi } from './../utils/burger-api';
import store from './store';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const getFeeds = createAsyncThunk<TOrdersData>(
  'order/feed',
  async (_, { dispatch }) => {
    dispatch(clearFeed());
    return await getFeedsApi();
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectFeedStatus: (state) => state.status,
    selectFeed: (state) => state
  }
});

export const { clearFeed } = feedSlice.actions;
export const {
  selectFeedOrders,
  selectTotal,
  selectTotalToday,
  selectFeedStatus,
  selectFeed
} = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
