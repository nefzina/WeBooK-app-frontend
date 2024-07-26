import {Injectable} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Observable, tap} from "rxjs";
import {User} from "../models/User";
import {ICategory} from "../interface/ICategory";
import {IUser} from "../interface/IUser";
import {IPasswords} from "../interface/IPasswords";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user!: User;
  categories!: ICategory[];
  category!: ICategory;
  users!: IUser[];

  constructor(private apiService: ApiService) {
  }

  getAllUsers(): Observable<IUser[]> {
    return this.apiService.get<IUser[]>('users').pipe(
      tap(response => {
        this.users = response
      })
    )
  }

  getUserById(id: number): Observable<User> {
    return this.apiService.getById<User>(id, 'users').pipe(
      tap(response => {
        this.user = response
        console.log(response)
      })
    )
  }

  getCategories(): Observable<ICategory[]> {
    return this.apiService.get<ICategory[]>('categories').pipe(
      tap(response => this.categories = response)
    )
  }

  getCategoryById(id: number): Observable<ICategory> {
    return this.apiService.getById<ICategory>(id, 'categories').pipe(
      tap(response => this.category = response)
    )
  }

  updateUser(id: number, user: User) {
    return this.apiService.put<IUser>('users', id, user)
  }

  patchPassword(id: number, passwords: IPasswords) {
    return this.apiService.patch('users', id, passwords)
  }
}
