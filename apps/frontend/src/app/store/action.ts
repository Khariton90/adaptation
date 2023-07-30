import { createAction } from "@reduxjs/toolkit";


export const createUser = createAction('user/createUser', value => ({
  payload: value
}));

export const setError = createAction('user/setError', (value: string) => ({
  payload: value
}));

export const setDataLoaded = createAction('user/setDataLoaded', (value: boolean) => ({
  payload: value
}));