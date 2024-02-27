export const API_URL = 'http://api.valantis.store:40000/';
export const PASSWORD = 'Valantis';
import { createAsyncThunk } from '@reduxjs/toolkit';
import md5 from 'md5';

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const authString = `${PASSWORD}_${timestamp}`;
const hashedAuthString = md5(authString);

interface APIResponse {
  result: any;
}

async function sendRequest(action: string, params?: any, retriesLeft = 3): Promise<any> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'X-Auth': hashedAuthString,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        action,
        params,
      }),
    });

    if (!response.ok) {
      console.log('Идентификатор ошибки: ', await response.text());
    }

    const result: APIResponse = await response.json();

    return result.result;
  } catch (error) {
    // console.log('Ошибка: ', error);
    if (retriesLeft > 0) {
      return sendRequest(action, params, retriesLeft - 1);
    } else {
      throw error;
    }
  }
}

export const fetchAllIds = createAsyncThunk('fetchAllIds', async () => {
  return sendRequest('get_ids');
});

export const fetchItems = createAsyncThunk('fetchItems', async (ids: string[]) => {
  return sendRequest('get_items', { ids });
});

export const filterItems = createAsyncThunk(
  'filterItems',
  async (parameter: { [key: string]: number | string }) => {
    return sendRequest('filter', parameter);
  },
);
