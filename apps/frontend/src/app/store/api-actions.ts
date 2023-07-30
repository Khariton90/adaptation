import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiRoute, UserDto } from "../types/consts";
import { AppDispatch, State } from "../types/state";
import { AxiosInstance } from "axios";
import { createUser, setDataLoaded, setError } from "./action";


export const createNewUser = createAsyncThunk<void, UserDto, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'user/createNewUser',
  async ({firstname, lastname, email, jobTitle, startDate, avatar}, {dispatch, extra: api}) => {
    try {
      console.log(avatar);
      const {data} = await api.post(ApiRoute.NewUser, {firstname, lastname, email, jobTitle, avatar, startDate});
      dispatch(setDataLoaded(true))
      dispatch(createUser(data));
      dispatch(setDataLoaded(false))
    } catch {
      dispatch(setError("Ошибка"))
    }
  }
)

export const uploadAvatar = createAsyncThunk<void, FormData, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'data/uploadProductImage',
  async (file, { dispatch, extra: api }) => {
    await api.post<string>(ApiRoute.UploadAvatar, file);
  },
)