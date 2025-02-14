import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getCurrency, getExchangeInfo } from './opreations';

const initialState = {
  baseCurrency: '',
  exchangeInfo: null,
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: 'currentCurrency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
        state.isLoading = false;
      })
      .addCase(getExchangeInfo.fulfilled, (state, action) => {
        state.exchangeInfo = action.payload;
        // state.isLoading = false;

        // console.log(state);
      })
      .addMatcher(
        isAnyOf(getCurrency.pending, getExchangeInfo.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
          // state.exchangeInfo = null;
        },
      )
      .addMatcher(
        isAnyOf(getCurrency.rejected, getExchangeInfo.rejected),
        state => {
          state.isError = true;
          state.isLoading = false;
        },
      )
      .addMatcher(
        isAnyOf(getCurrency.fulfilled, getExchangeInfo.fulfilled),
        state => {
          state.isLoading = false;
          state.isError = false;
        },
      );
  },
});

export const currency = slice.reducer;
export const { setCurrency } = slice.actions;
