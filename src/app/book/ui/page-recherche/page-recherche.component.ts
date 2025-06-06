import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../domain/service/book.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { forkJoin, map, Observable, startWith } from 'rxjs';
import { Author } from '../../domain/models/author';
import { Book } from '../../domain/models/book';
import { ICategory } from '../../../profile/domain/interface/ICategory';
import { response } from 'express';
import { ApiService } from '../../../domain/services/api.service';

@Component({
  selector: 'app-page-recherche',
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
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './page-recherche.component.html',
  styleUrl: './page-recherche.component.scss',
})
export class PageRechercheComponent implements OnInit {
  books: Book[] = [];
  categories!: ICategory[];
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
    [21, "Côte d'Or"],
    [25, 'Doubs'],
    [39, 'Jura'],
    [58, 'Nièvre'],
    [70, 'Haute-Saône'],
    [71, 'Saône et Loire'],
    [89, 'Yonne'],
  ];

  isFiltersMenuDisplayed: boolean = false;

  constructor(
    private bookService: BookService,
    private _formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.bookService
      .getCategories()
      .subscribe((response) => (this.categories = response));
  }

  searchBooks(keyword: string): void {
    if (keyword.trim() !== '') {
      this.bookService.searchBooks(keyword).subscribe((books) => {
        this.books = books;
      });
    }
  }

  onCategoryChange(event: Event): void {
    const selectedCategoryId = Number(
      (event.target as HTMLSelectElement).value
    );
    this.bookService
      .getBooksByCategoryId(selectedCategoryId)
      .subscribe((books) => {
        this.books = books;
        console.log(books);
      });
  }

  getImageSrc(filename: string): string {
    return this.apiService.getImageUrl(filename);
  }

  openFiltersMenu():void{
    this.isFiltersMenuDisplayed = true;
  }

  closeFiltersMenu():void{
    this.isFiltersMenuDisplayed = false;
  }
}
