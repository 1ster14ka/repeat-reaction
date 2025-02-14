import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../service/opencagedataApi';
import { exchangeCurrency } from '../service/exchangeAPI';

export const getCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();

      const { baseCurrency } = state.curr;
      console.log(baseCurrency);

      if (!baseCurrency) {
        return thunkApi.rejectWithValue('We already have base currency!');
      }
      const data = await getUserInfo(body);
      const { iso_code } = data.results[0].annotations.currency;
      return iso_code;
    } catch (error) {
      return thunkApi.rejected(error.message);
    }
  },
);

export const getExchangeInfo = createAsyncThunk(
  'currency/getExchangeInfo',
  async (credentials, thunkApi) => {
    try {
      const data = await exchangeCurrency(credentials);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
