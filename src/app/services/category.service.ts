import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Category} from "../book/ui/add-book/category.model";
import {ApiService} from "./api.service";
import {response} from "express";


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
