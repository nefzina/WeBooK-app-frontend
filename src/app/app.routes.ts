import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BookDetailComponent} from "./book/ui/book-detail/book-detail.component";
import {PageRechercheComponent} from "./page-recherche/page-recherche.component";
import {LoginComponent} from "./auth/ui/login/login.component";
import {RegisterComponent} from "./auth/ui/register/register.component";
import {GuideComponent} from "./guide/guide.component";
import {AuthGuard} from "./auth/application/AuthGuard";
import {AddBookComponent} from "./book/ui/add-book/add-book.component";
import {PageBookComponent} from "./book/ui/page-book/page-book.component";
import {UpdateBookComponent} from "./book/ui/update-book/update-book.component";
import {AdminAuthGuard} from "./auth/application/AdminAuthGuard";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'page-book/:id', component: PageBookComponent },
  {path: 'recherche', component: PageRechercheComponent},
  {path: 'addBook', component: AddBookComponent, canActivate: [AuthGuard]},
  {path: 'updateBook/:id', component: UpdateBookComponent},
  {
    path: 'profile',
    loadComponent: () => import('./profile/ui/profile.component')
      .then(r => r.ProfileComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'update-profile',
    loadComponent: () => import('./profile/ui/update-profile/update-profile.component')
      .then(r => r.UpdateProfileComponent),
    canActivate: [AuthGuard],

  },
  {
    path: 'back-office',
    loadComponent: () => import('./profile/ui/admin-back-office/admin-back-office.component')
      .then(r => r.AdminBackOfficeComponent),
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'guide',
    component: GuideComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {path: '**', redirectTo: ''},
];
