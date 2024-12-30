import { Model, ObjectId } from "mongoose"
import { USER_ROLE } from "./user.contant"

export interface TUser {
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
    isBlocked?: boolean,
  }


  export interface UserModel extends Model<TUser> {
    // interface method checking if the user is exists
    isUserExistsByCustomId(id: string): Promise<TUser>
    isPasswordMatched( plainPassword: string, hashPassword: string,): Promise<boolean>

  }

  export type TuserRole = keyof typeof USER_ROLE