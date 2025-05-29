import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { BookService } from '../../book/domain/service/book.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../../auth/ui/login/login.component';
import { RegisterComponent } from '../../auth/ui/register/register.component';
import { UserIdService } from '../../domain/services/userId.service';
import { IUser } from '../../profile/domain/interface/IUser';
import { ProfileService } from '../../profile/domain/services/profile.service';
import { Category } from '../../book/domain/models/category';
import { Book } from '../../book/domain/models/book';
import { ApiService } from '../../domain/services/api.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    LoginComponent,
    RegisterComponent,
    NgForOf,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  id!: number;
  preferences!: Category[];
  booksByCategory: { [key: number]: Book[] } = {};

  constructor(
    private bookService: BookService,
    private userIdService: UserIdService,
    private profileService: ProfileService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.userIdService.getUserId.subscribe((id) => {
      this.id = id;
    });
    if (!!this.id) {
      this.profileService.getUserById(this.id).subscribe((response) => {
        if (response.preferences) {
          this.preferences = response.preferences;
          this.loadRecommendedBooks();
        }
      });
    }
  }

  loadRecommendedBooks(): void {
    this.bookService
      .getBooksByFavoriteCategories(this.preferences)
      .subscribe({

        next: (data) => {
          this.booksByCategory = data;
          console.log('Books by category:', this.booksByCategory);
        },
        error: err => console.error('Error fetching books:' + err),
      });
  }

  getImageSrc(filename: string): string{
    return this.apiService.getImageUrl(filename);
  }
}
