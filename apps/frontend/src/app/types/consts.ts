import { JobTitle } from "@org/shared-types";

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Dash = '/dashboard',
  CreateUser = '/dashboard/create-user',
  NotFound = '*',
}

export enum ApiRoute {
  NewUser = 'users/create-user',
  UploadAvatar = 'users/upload',
}

export type UserDto = {
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  jobTitle: JobTitle;
  startDate: string;
}

export const jobTitleList = {
  [JobTitle.Manager]: "Менеджер",
  [JobTitle.SalesMan]: "Продавец",
  [JobTitle.AssistLeader]: "Помощник руководителя",
};