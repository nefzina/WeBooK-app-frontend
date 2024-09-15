import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Book} from "../../book/domain/models/book";
import {IUser} from "../../profile/domain/interface/IUser";
import {environment} from "../../../environments/environment";
import {LoginRequestDto} from "../../auth/domain/dtos/LoginRequestDto";
import {User} from "../../auth/domain/models/User";
import {IPasswords} from "../../profile/domain/interface/IPasswords";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${environment.API_URL}/${endpoint}`, {
      // headers: this.getAuthHeaders(),
      withCredentials: true,
    })
  }

  getById<T>(id: number, endpoint: string): Observable<T> {
    return this.http.get<T>(`${environment.API_URL}/${endpoint}/${id}`, {
      withCredentials: true,
    })
  }

  post<T>(endpoint: string, body: Book | IUser | LoginRequestDto | User): Observable<T> {
    return this.http.post<T>(`${environment.API_URL}/${endpoint}`, body, {
      withCredentials: true,
    });
  }

  postUpload<T>(endpoint: string, body: FormData): Observable<T> {
    return this.http.post<T>(`${environment.API_URL}/${endpoint}`, body, {
      withCredentials: true,
    });
  }

  put<T>(endpoint: string, id: number, body: IUser | Book): Observable<T> {
    return this.http.put<T>(`${environment.API_URL}/${endpoint}/${id}`, body, {
      withCredentials: true,
    });
  }

  patch<T>(endpoint: string, id: number, body: IPasswords): Observable<T> {
    return this.http.patch<T>(`${environment.API_URL}/${endpoint}/${id}/pw`, body, {
      withCredentials: true,
    });
  }

  delete<T>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<T>(`${environment.API_URL}/${endpoint}/${id}`, {
      withCredentials: true,
    })
  }
}
