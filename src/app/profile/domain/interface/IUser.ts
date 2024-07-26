import {Book} from "./Book";
import {ICategory} from "./ICategory";
import {IMedia} from "./IMedia";
import {IRole} from "./IRole";

export interface IUser {
  id: number,
  username: string,
  email: string,
  role: IRole,
  preferences: ICategory[],
  books: Book[],
  zip_code?: string,
  city?: string,
  profilePicture?: IMedia,

}
