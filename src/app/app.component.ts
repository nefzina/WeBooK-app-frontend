import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/ui/profile.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {LoginComponent} from "./auth/ui/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from "./auth/ui/register/register.component";
import { MatFormField} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {AddBookComponent} from "./book/ui/add-book/add-book.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    MatFormField,
    RegisterComponent,
    HttpClientModule,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    MatCardModule, MatButtonModule,
    MatIconModule, HeaderComponent,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule,
    LoginComponent,
    AddBookComponent],


  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeBook_front-v2';
}
