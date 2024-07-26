import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {BookService} from "../book/domain/service/book.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {forkJoin, map, Observable, startWith} from "rxjs";
import {Author} from "../book/domain/models/author";
import {Book} from "../book/domain/models/book";

export interface BookGroup {
  name: string;
  author: string;
}
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().includes(filterValue));
};
@Component({
  selector:
    'app-page-recherche',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './page-recherche.component.html',
    styleUrl: './page-recherche.component.scss'
})

export class PageRechercheComponent implements OnInit {
  searchText = '';
  books: any[] = [];
  mockBooks: any[] = [];
  categories = ['Historique', 'Aventure', 'Policier', 'Amour', 'Science-fiction', 'Fantasy', 'Fantastique', 'Horreur', 'Nouvelle', 'Biographie', 'Autobiographie', 'Journal', 'Poésie', 'En prose', 'Pastorale', 'Philosophique', 'Sonnet', 'Ode', 'Haïku', 'Théâtral', 'Epistolaire', 'Argumentatif'];
  locations: [number, string][] = [
    [1, 'Ain'],
    [3, 'Allier'],
    [7, 'Ardèche'],
    [15, 'Cantal'],
    [26, 'Drôme'],
    [38, 'Isère'],
    [42, 'Loire'],
    [43, 'Haute-Loire'],
    [63, 'Puy de Dôme'],
    [69, 'Rhône'],
    [73, 'Savoie'],
    [74, 'Haute-Savoie'],
    [21, 'Côte d\'Or'],
    [25, 'Doubs'],
    [39, 'Jura'],
    [58, 'Nièvre'],
    [70, 'Haute-Saône'],
    [71, 'Saône et Loire'],
    [89, 'Yonne'],
  ];
  value = '';
  authors: string[] | undefined;
  suggestions: string[] = this.mockBooks;
  filteredSuggestions: string[] = [];
  lat: number = 48.8566;
  lng: number = 2.3488;
  zoom: number = 12;
  bookFrom = this._formBuilder.group({ bookGroup: '' });
  bookGroups: BookGroup[] = this.bookService.mockBooks;
  bookGroupOptions: Observable<BookGroup[]> | undefined;
  private dataSource: (Author | Book)[] | undefined;

  constructor(private bookService: BookService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mockBooks = this.bookService.mockBooks;
    this.loadData()
    //this.suggestions = this.bookService.mockBooks.map(book => book.name);
    this.bookGroupOptions = this.bookFrom.get('bookGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }
  onSearchChange(): void {
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectSuggestion(suggestion: string): void {
    this.searchText = suggestion;
    this.filteredSuggestions = [];
    // this.searchBooks();
  }

  // searchBooks(): void {
  //   if (this.searchText.trim() !== '') {
  //     this.bookService.searchBooks(this.searchText).subscribe(
  //       (books) => {
  //         this.books = books;
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la récupération des livres :', error);
  //       }
  //     );
  //   }
  // }

  private _filterGroup(value: string): BookGroup[] {
    if (value) {
      return this.bookGroups.map(group => ({ author: group.author, name: group.name }));
    }
    return this.bookGroups;
  }
  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target ? target.value : '';
    this.bookService.getBooksByCategory(category).subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    );
  }

  onAuthorChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const authorId = target ? target.value : '';
    this.bookService.getBooksByAuthor(authorId).subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    );
  }
  onLocationChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const location = target ? target.value : '';
    this.bookService.getBooksByLocation(location).subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    );
  }
  private resetBookOrder() {
  }
  showMap() {
    // @ts-ignore
    this.showMap = true;
  }
  loadData() {
    forkJoin({
      authorsList: this.bookService.getAuthorList(),
      bookList: this.bookService.getBookList()
    }).subscribe({
      next: (result) => {
        const authorsListData = result.authorsList;
        const bookListData = result.bookList;
        this.dataSource = [...authorsListData, ...bookListData];
      }
    })
  }
}
