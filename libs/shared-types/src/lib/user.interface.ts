import { JobTitle } from "./job-title.enum";
import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  userRole: UserRole;
  jobTitle: JobTitle;
  status: number;
  startDate: string;
  password: string;
}