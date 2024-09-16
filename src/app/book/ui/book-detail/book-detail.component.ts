import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../domain/service/book.service";
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Observable, switchMap} from "rxjs";


@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent{
  mockBook: any;
  //book$! = Observable<Book>;

  constructor(
    private route : ActivatedRoute,
    private bookService: BookService,
  ) {  }
  ngOnInit(): void {

    // this.book$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.bookService.getBookById(params.get('id')!)));

    // let bookId = this.route.snapshot.params['book_id'];
    // this.mockBook = this.bookService.getBookById(bookId);

    // const id = this.route.snapshot.paramMap.get('book_id');
    //   if (id !== null) {
    //   this.mockBook = this.bookService.mockBooks.find(book => book.book_id === +id);
    // } else {
    //   throw new Error('ID is missing in the URL');
    // }

    //this.bookService.getBookList('CONFIG').pipe().subscribe(bookList => this.bookList = bookList);

  }

}
