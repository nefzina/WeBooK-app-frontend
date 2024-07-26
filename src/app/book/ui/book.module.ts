import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookService} from "../domain/service/book.service";
import {RouterModule, Routes} from "@angular/router";
import {BookDetailComponent} from "./book-detail/book-detail.component";

const bookRoutes: Routes = [
  { path: 'book', component: BookDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(bookRoutes)
  ],
  providers: [
  ]
})
export class BookModule { }
