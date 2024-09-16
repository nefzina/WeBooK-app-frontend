import {IMedia} from "./IMedia";

export interface Book {
  id: number,
  title: string,
  coverImage: IMedia,
  author: string,
  edition: string,
  review: string,
  resume: string,
  isbn: string,
  ownerId: number,
}
