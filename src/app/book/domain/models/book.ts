import {IMedia} from "../../../profile/domain/interface/IMedia";
import {ICategory} from "../../../profile/domain/interface/ICategory";
import {IUser} from "../../../profile/domain/interface/IUser";

export class Book{
  id: number;
  name: string;
  coverImage: IMedia;
  author: string;
  edition: string;
  resume: string;
  isbn: string;
  review: string;
  bookCategory: ICategory;
  owner:IUser;

  constructor(book_id: number, book_name: string, book_image: IMedia, book_author: string,
              book_edition: string, book_resume: string, book_isbn: string, book_review: string,
              book_category:ICategory, owner: IUser) {
    this.id = book_id;
    this.name = book_name;
    this.coverImage = book_image;
    this.author = book_author;
    this.edition = book_edition;
    this.resume = book_resume;
    this.isbn = book_isbn;
    this.review = book_review;
    this.bookCategory=book_category;
    this.owner= owner;
  }


}
