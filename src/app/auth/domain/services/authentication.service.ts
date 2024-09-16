import {Injectable} from '@angular/core';
import {IAuthenticationService} from "./IAuthentication-service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {LoginRequestDto} from "../dtos/LoginRequestDto";
import {User} from "../models/User";
import {environment} from "../../../../environments/environment";
import {LoginResponseDto} from "../dtos/LoginResponseDto";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(user: LoginRequestDto): Observable<LoginResponseDto | null> {
    return this.httpClient.post<LoginResponseDto>(`${environment.API_URL}/login`, JSON.stringify(user), {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true,
      observe: "response"
    }).pipe(
      map(response => {
        if (response.status === 200) {
          localStorage.setItem('loggedIn', "true");
          localStorage.setItem('role', <string>response.body?.role.type.toString());
          this.setLoggedIn(true);
          return response.body;
        }
        return null;
      }))
  }

  private loggedInStatus = new BehaviorSubject<boolean>(this.getLoggedInFromLocalStorage());

  // Observable that other components can subscribe to
  loggedIn$ = this.loggedInStatus.asObservable();

  // Method to update logged-in status and localStorage
  setLoggedIn(status: boolean): void {
    this.loggedInStatus.next(status);
    localStorage.setItem('loggedIn', status ? 'true' : 'false');
  }

  // Method to retrieve logged-in status from localStorage
  getLoggedInFromLocalStorage(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  register(user: User): Observable<Boolean> {
    return this.httpClient.post<any>(`${environment.API_URL}/register`, JSON.stringify(user), {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true,
      observe: "response"
    }).pipe(
      map(response => {
        return response.status === 201;
      }))
  }

  logout(): void {
    this.setLoggedIn(false);
    localStorage.removeItem('role');
    //this.httpClient.post<any>("http://localhost:8080/logout", { withCredentials: true }).subscribe();
  }

  passwordForgotten() {

  }
}
