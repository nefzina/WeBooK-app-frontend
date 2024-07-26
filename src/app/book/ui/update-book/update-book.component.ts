import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Book } from "../../domain/models/book";
import { UploadService } from "../../../services/upload.service";
import { CategoryService } from "../../../services/category.service";
import { BookService } from "../../domain/service/book.service";
import { environment } from "../../../../environments/environment";
import { UserIdService } from "../../../services/userId.service";
import { ProfileService } from "../../../profile/domain/services/profile.service";
import { IUser } from "../../../profile/domain/interface/IUser";
import { Category } from "../add-book/category.model";
import { IMedia } from "../../../profile/domain/interface/IMedia";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink
  ],
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  book!: Book;
  user!: IUser;
  coverImage: IMedia | null = null;
  fileEvent!: Event;
  userId: number = 0;
  bookId: number = 0;
  selectedFile: File | null = null;
  categories: Category[] = [];
  successMessage: string = '';

  constructor(
    private bookService: BookService,
    private userIdService: UserIdService,
    private categoryService: CategoryService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(this.bookId).subscribe((response) => {
      this.book = response;
      this.coverImage = response.coverImage;
    });
    this.userIdService.getUserId.subscribe(id => {
      this.userId = id;
      console.log('User ID', this.userId);
    });

    if (this.userId) {
      this.profileService.getUserById(this.userId).subscribe((response) => {
        this.user = response;
        this.book.owner = response;
      });
    }
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileEvent = event;

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverImage = { filename: e.target.result } as IMedia;
      };
      reader.readAsDataURL(this.selectedFile);

      this.uploadService.uploadFile(event).subscribe({
        next: (res: IMedia | null) => {
          if (res) {
            this.coverImage = res;
            this.book.coverImage = res; // Mise à jour de l'objet book avec la nouvelle image
          }
        },
        error: (err: any) => console.error('Upload error', err)
      });
    }
  }


  onSubmit() {

    this.updateBook();
  }

  updateBook() {
    if (this.coverImage) { // Pour bien s'assurer que l'image est incluse dans l'objet book avant l'envoi
      this.book.coverImage = this.coverImage;
    }
    this.bookService.updateBook(this.bookId, this.book).subscribe(
      () => {
        console.log(this.coverImage);
        this.successMessage = 'Livre mis à jour avec succès';
        this.redirectAfterUpdate();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du livre', error);
      }
    );
  }

  redirectAfterUpdate() {
    setTimeout(() => {
      this.ngZone.run(() => {
       this.router.navigate(['/page-book', this.bookId]);
      });
    }, 2000);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getBookCoverUrl(filename: string): string {
    return `${environment.API_URL}/uploads/${filename}`;
  }

  protected readonly Event = Event;
  protected readonly event = event;
}
