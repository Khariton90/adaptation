import { Request } from '@nestjs/common/decorators';
import { UserRole } from "./user-role.enum";

export interface ExtendedUserRequest extends Request {
  user: {
    sub: string;
    email: string;
    role: UserRole;
  };
}