import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ApiService} from "./api.service";
import {response} from "express";
import {Category} from "../../book/domain/models/category";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories!:Category[];
  constructor(private apiService:ApiService) { }

  getCategories(): Observable<Category[]> {
    return this.apiService.get<Category[]>('categories').pipe(
      tap(response => {
        this.categories = response;

        return response;
      })
    )
  }
}
