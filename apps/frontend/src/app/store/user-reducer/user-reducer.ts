import { createReducer } from "@reduxjs/toolkit";
import { createUser, setDataLoaded, setError } from "../action";

export type UserReducer = {
  user: unknown;
  error: null | string;
  isDataLoaded: boolean;
}

const initialState: UserReducer = {
  user: {},
  error: null,
  isDataLoaded: false
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(createUser, (state, action) => {
    state.user = action.payload
  })
  builder.addCase(setError, (state, action) => {
    state.error = action.payload
  })
  builder.addCase(setDataLoaded, (state, action) => {
    state.isDataLoaded = action.payload
  })
})

export { userReducer };