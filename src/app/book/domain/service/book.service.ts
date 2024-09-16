import {Injectable} from '@angular/core';
import {Book} from "../models/book";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Author} from "../../../book/domain/models/author";
import {environment} from "../../../../environments/environment";
import {User} from "../../../profile/domain/models/User";
import {ICategory} from "../../../profile/domain/interface/ICategory";
import {ApiService} from "../../../domain/services/api.service";


@Injectable({
  providedIn: 'root'
})
export class BookService {
  book!: Book;
  books!: Book[];
  categories!: ICategory[];
  category!: ICategory;

  bookList: Book[] | undefined;

  mockBooks = [
    {
      id: 1,
      title: 'Du même bois',
      image: 'assets/pictures/Du-meme-bois.jpg',
      category: 'Aventure',
      author: 'Marion Fayolle',
      edition: 'Gallimard',
      resume: 'Les enfants, les bébés, ils les appellent les “petitous”. Et c\'est vrai qu\'ils sont des petits touts. Qu\'ils sont un peu de leur mère, un peu de leur père, un peu des grands-parents, un peu de ceux qui sont morts, il y a si longtemps. Tout ce qu\'ils leur ont transmis, caché, inventé. Tout. C\'est pas toujours facile d\'être un petit tout, d\'avoir en soi autant d\'histoires, autant de gens, de réussir à les faire taire pour inventer encore une petite chose à soi.',
      isbn: '2073025811',
      review: ''
    },
    {
      id: 2,
      title: 'La louisiane',
      image: 'assets/pictures/La-Louisiane.jpg',
      category: 'Policier',
      author: 'test2',
      edition: '',
      resume: '',
      isbn: '',
      review: '',
      map: 'Brest'
    },
    {
      id: 3,
      title: 'La vie heureuse',
      image: 'assets/pictures/La-vie-heureuse.jpg',
      category: 'Amour',
      author: 'test3',
      edition: '',
      resume: '',
      isbn: '',
      review: '',
      map: 'Paris'
    },
    {
      id: 4,
      title: 'Les Yeux de Mona',
      image: 'assets/pictures/Les-Yeux-de-Mona.jpg',
      category: 'Horreur',
      author: 'test4',
      edition: '',
      resume: '',
      isbn: '',
      review: '',
      map: 'Brest'
    },
    {
      id: 5,
      title: 'Un soir d\'éte',
      image: 'assets/pictures/Un-soir-d-ete.jpg',
      category: '',
      author: 'test5',
      edition: '',
      resume: '',
      isbn: '',
      review: '',
      map: 'Brest'
    },
    {
      id: 6,
      title: 'Du même bois',
      image: 'assets/pictures/Du-meme-bois.jpg',
      category: '',
      author: 'test6',
      edition: '',
      resume: '',
      isbn: '',
      review: '',
      map: 'Brest'
    },
    {
      id: 7,
      title: 'Du même bois',
      image: 'assets/pictures/Du-meme-bois.jpg',
      category: '',
      author: 'test7',
      edition: '',
      resume: '',
      isbn: '',
      review: '',
      map: 'Paris'
    },
    {
      id: 8,
      title: 'Du même bois',
      image: 'assets/pictures/Du-meme-bois.jpg',
      category: '',
      author: 'test8',
      edition: '',
      resume: '',
      isbn: '',
      review: '',
      map: 'Paris'
    },
    {
      id: 9,
      title: 'Du même bois',
      image: 'assets/pictures/Du-meme-bois.jpg',
      category: '',
      author: 'test9',
      edition: '',
      resume: '',
      isbn: '',
      review: ''
    },
    {
      id: 10,
      title: 'Du même bois',
      image: 'assets/pictures/Du-meme-bois.jpg',
      category: '',
      author: 'test10',
      edition: '',
      resume: '',
      isbn: '',
      review: ''
    },
  ]

  constructor(private apiService: ApiService) {
  }

  getBookById(id: number): Observable<Book> {
    return this.apiService.getById<Book>(id, 'books').pipe(
      tap(response => {
        this.book = response;
      })
    )
  }

  getCategories(): Observable<ICategory[]> {
    return this.apiService.get<ICategory[]>('categories').pipe(
      tap(response => this.categories = response)
    )
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.apiService.put<Book>('books', id, book)
  }

  getBookList(): Observable<Book[]> {
    return this.apiService.get<Book[]>('books').pipe(
      tap(response => {
        this.books = response
      })
    )
  }

  getBooksByCategoryId(categoryId: number) {
    return this.apiService.getById<Book[]>(categoryId, 'books/category').pipe(
      tap(response => {
        this.books = response
      })
    )
  }

  private bookId = new BehaviorSubject(0);
  getBookId = this.bookId.asObservable();

  setBookId(id: number) {
    this.bookId.next(id);
  }

  searchBooks(keyword: string): Observable<Book[]> {
    return this.apiService.get<Book[]>(`books/search?keyword=${keyword}`).pipe(
      tap(response => {
        this.books = response
      })
    )
  }
}
