import { JobTitle, User, UserRole } from "@org/shared-types";
import { compare, genSalt, hash } from 'bcrypt';

export const SALT_ROUNDS = 10;

export class UsersEntity implements User {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  userRole: UserRole;
  avatar: string;
  jobTitle: JobTitle;
  status: number;
  startDate: string;
  password: string;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UsersEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.userRole = user.userRole;
    this.avatar = user.avatar;
    this.jobTitle = user.jobTitle;
    this.status = user.status;
    this.startDate = user.startDate;
    this.password = user.password;
  }
}