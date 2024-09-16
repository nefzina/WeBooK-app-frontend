import {Observable} from "rxjs";
import {LoginRequestDto} from "../dtos/LoginRequestDto";
import {LoginResponseDto} from "../dtos/LoginResponseDto";

export interface IAuthenticationService {
  authenticate(user: LoginRequestDto): Observable<LoginResponseDto|null>;
  passwordForgotten(): void;
}

// interface qui définit méthode authenticate implémentée dans Authentication-service qui est un service injectable dans angular. Ce service utilise HttpClient pour envoyer des requêtes HTTP à un serveur.
