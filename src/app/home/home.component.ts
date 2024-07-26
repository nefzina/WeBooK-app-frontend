import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {BookService} from "../book/domain/service/book.service";
import {HeaderComponent} from "../components/header/header.component";
import {FooterComponent} from "../components/footer/footer.component";
import {LoginComponent} from "../auth/ui/login/login.component";
import {RegisterComponent} from "../auth/ui/register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    LoginComponent,
    RegisterComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
   mockBooks: any[]= [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.mockBooks = this.bookService.mockBooks;
  }
}
