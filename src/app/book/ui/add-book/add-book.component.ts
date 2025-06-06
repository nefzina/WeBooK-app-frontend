import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { BookService } from '../../domain/service/book.service';
import { Book } from '../../domain/models/book';
import { CategoryService } from '../../../domain/services/category.service';
import { UserIdService } from '../../../domain/services/userId.service';
import { IMedia } from '../../../profile/domain/interface/IMedia';
import { Category } from '../../domain/models/category';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatGridTile, MatGridList, CommonModule],
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  categories: Category[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  id: number = 0;
  regex = {
    title: '^(?!\\s*$)[a-zA-Z0-9\\s\\-_,!?+àçéèêôîûù]{1,100}$',
    author: '^(?!\\s*$)[a-zA-Z\\sàçéèêôîûù]{1,35}$',
    isbn: '^(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})$',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private userIdService: UserIdService,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.pattern(this.regex.title)],
      author: ['', Validators.pattern(this.regex.author)],
      edition: [''],
      review: [''],
      resume: [''],
      isbn: ['', Validators.pattern(this.regex.isbn)],
      categoryId: ['', Validators.required],
    });
  }

  coverImage!: IMedia;
  fileEvent!: Event;
  input!: HTMLInputElement;

  ngOnInit(): void {
    this.loadCategories();
    this.userIdService.getUserId.subscribe((id) => {
      this.id = id;
      console.log('User ID:', this.id);
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error(err),
    });
  }

  onFileSelected(event: Event): void {
    this.fileEvent = event;
    this.input = event.target as HTMLInputElement;    // Check if the event target is an instance of HTMLInputElement
    if (this.input.files && this.input.files[0]) {
      const file = this.input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const maxSize = 300;
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
              }
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg'); // Format de l'image (JPEG, PNG, etc.)
            this.selectedImage = dataUrl;
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  createBook() {
    if (!this.input.files?.[0]) {
      throw new Error('No file selected.');
    }

    const newBook: Book = this.bookForm.value;
    newBook.bookCategory =
      this.categories[this.bookForm.get(['categoryId'])?.value - 1];

    this.bookService.createBook(newBook, this.input).subscribe({
      next: (res) => {
        this.router.navigate(['/profile']);
        return res;
      },
      error: (err) => console.error(err),
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.createBook();
    }
  }
}
