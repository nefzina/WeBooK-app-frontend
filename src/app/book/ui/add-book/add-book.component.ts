import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators} from "@angular/forms";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {AuthenticationService} from "../../../auth/domain/services/authentication.service";
import {Router} from "@angular/router";
import {passwordMatchValidator} from "../../../auth/application/passwordMatch";
import {BookService} from "../../domain/service/book.service";
import {Book} from "../../domain/models/book";
import {Category} from "./category.model";
import {CategoryService} from "../../../services/category.service";
import {UserIdService} from "../../../services/userId.service";
import {UploadService} from "../../../services/upload.service";
import {IMedia} from "../../../profile/domain/interface/IMedia";
import {AddBookService} from "../../domain/service/addBook.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatGridTile,
    MatGridList,
    CommonModule
  ],
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  categories: Category[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  id: number = 0;


  constructor(
    private fb: FormBuilder,
    private addBookService: AddBookService,
    private router: Router,
    private categoryService: CategoryService,
    private authService: AuthenticationService,
    private userIdService: UserIdService,
    private uploadService: UploadService
  ) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      edition: [''],
      review: [''],
      resume: [''],
      isbn: [''],
      coverImage: [''],
      categoryId: ['', Validators.required]
    });
  }

  coverImage!: IMedia;
  fileEvent!: Event;

  ngOnInit(): void {
    this.loadCategories();
    this.userIdService.getUserId.subscribe(id => {
      this.id = id;
      console.log('User ID:', this.id);
    });
  }


  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data
      },
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: Event): void {
    this.fileEvent = event;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const maxSize = 300; // Taille maximale souhaitée
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

  uploadFile() {
    this.uploadService.uploadFile(this.fileEvent).subscribe(
      {
        next: (res) => {
          console.log("res", res);
          this.coverImage = res;
          this.createBook();
        },
        error: (err) => console.error('Upload error', err),
      }
    )
  }

  createBook() {
    const newBook: Book = this.bookForm.value;
    if (this.coverImage) {
      newBook.coverImage = this.coverImage;
      newBook.bookCategory = this.categories[this.bookForm.get(["categoryId"])?.value - 1];
    }
    console.log("this.newBook", newBook);
    this.addBookService.createBook(newBook).subscribe({
      next: (res) => {
        this.router.navigate(['/profile'])
        return res
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.uploadFile();
    }
  }
}
