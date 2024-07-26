import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BookService} from "../../domain/service/book.service";
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {Book} from "../../domain/models/book";
import {UploadService} from "../../../services/upload.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-page-book',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    CommonModule,
    NgForOf
  ],
  templateUrl: './page-book.component.html',
  styleUrl: './page-book.component.scss'
})
export class PageBookComponent implements OnInit{
  id:number=0;
  book!:Book;

  constructor(
    private bookService: BookService,
    private uploadService: UploadService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    // Récupérer l'ID du livre depuis l'URL
    this.id = +this.route.snapshot.paramMap.get('id')!;
    // Utiliser l'ID pour charger les informations du livre
    this.bookService.getBookById(this.id).subscribe((response) => {
      console.log(response); // Vérifiez que les données sont bien reçues
      this.book = response;
    });
  }


  uploadFile(event: Event) {
    this.uploadService.uploadFile(event).subscribe(
      {
        next: (res) => {
          this.book.coverImage = res;
          this.bookService.getBookById(this.id).subscribe((res) => {
            this.book = res;
          });
        },
        error: (err) => console.error('Upload error', err),
      }
    )
  }

  getBookCoverUrl(filename: string): string {
    return `${environment.API_URL}/uploads/${filename}`;
  }


}
