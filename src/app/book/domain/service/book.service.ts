import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { ɵFormGroupValue, ɵTypedOrUntyped } from '@angular/forms';
import { Author } from '../../../book/domain/models/author';
import { environment } from '../../../../environments/environment';
import { User } from '../../../profile/domain/models/User';
import { ICategory } from '../../../profile/domain/interface/ICategory';
import { ApiService } from '../../../domain/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  book!: Book;
  books!: Book[];
  categories!: ICategory[];
  category!: ICategory;

  bookList: Book[] | undefined;

  constructor(private apiService: ApiService) {}

  getBookById(id: number): Observable<Book> {
    return this.apiService.getById<Book>(id, 'books').pipe(
      tap((response) => {
        this.book = response;
      })
    );
  }

  getCategories(): Observable<ICategory[]> {
    return this.apiService
      .get<ICategory[]>('categories')
      .pipe(tap((response) => (this.categories = response)));
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.apiService.put<Book>('books', id, book);
  }

  getBookList(): Observable<Book[]> {
    return this.apiService.get<Book[]>('books').pipe(
      tap((response) => {
        this.books = response;
      })
    );
  }

  getBooksByCategoryId(categoryId: number) {
    return this.apiService.getById<Book[]>(categoryId, 'books/category').pipe(
      tap((response) => {
        this.books = response;
      })
    );
  }

  // Récupérer les livres pour plusieurs catégories
  getBooksByFavoriteCategories(
    categories: ICategory[]
  ): Observable<{ [key: number]: Book[] }> {
    const requests = categories.map((category) =>
      this.getBooksByCategoryId(category.id).pipe(
        map((books) => ({ [category.id]: books }))
      )
    );

    // Exécution parallèle des requêtes et agrégation des résultats
    return forkJoin(requests).pipe(
      map((results) => Object.assign({}, ...results))
    );
  }

  private bookId = new BehaviorSubject(0);
  getBookId = this.bookId.asObservable();

  setBookId(id: number) {
    this.bookId.next(id);
  }

  searchBooks(keyword: string): Observable<Book[]> {
    return this.apiService.get<Book[]>(`books/search?keyword=${keyword}`).pipe(
      tap((response) => {
        this.books = response;
      })
    );
  }

  createBook(book: Book, event: Event): Observable<Book> {
    const formData = new FormData();
    formData.append(
      'book',
      new Blob([JSON.stringify(book)], { type: 'application/json' })
    );

    // Check if the event target is an instance of HTMLInputElement
    const input = event.target as HTMLInputElement;

    // Check if the input element has files
    if (input.files?.length) {
      const file: File = input.files[0];
      formData.append('coverImage', file);

      return this.apiService.post<Book>('books', formData).pipe(
        tap((response) => {
          return response;
        })
      );
    } else return new Observable<Book>((observable) => observable.complete()); // empty observable if no file is selected
  }
}
