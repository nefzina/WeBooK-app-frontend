import {IUser} from "../interface/IUser";
import {ICategory} from "../interface/ICategory";
import {Book} from "../interface/Book";
import {IMedia} from "../interface/IMedia";
import {IRole} from "../interface/IRole";

export class User implements IUser {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public role: IRole,
    public preferences: ICategory[],
    public books: Book[],
    public zip_code?: string,
    public city?: string,
    public profilePicture?: IMedia,
  ) {
  }
}
