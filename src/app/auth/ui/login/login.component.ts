import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthenticationService} from "../../domain/services/authentication.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LoginRequestDto} from "../../domain/dtos/LoginRequestDto";
import {MatIcon} from "@angular/material/icon";
import {UserIdService} from "../../../services/userId.service";
import {LoginResponseDto} from "../../domain/dtos/LoginResponseDto";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, FormsModule, MatButtonModule, MatIcon, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  loginError = "";
  hidePassword = true;


  constructor(private authService: AuthenticationService, private router: Router, private userIdService: UserIdService) {
  }


  login() {

    if (this.email !== "" && this.password !== "") {
      const loginDto = new LoginRequestDto(this.email, this.password);

      this.authService.authenticate(loginDto).subscribe(
        (user: LoginResponseDto | null) => {
          console.log(user);
          if (user) {
            this.userIdService.setUserId(user.id);
            if(user.role.type === "admin") this.router.navigate(['/back-office']);
              else this.router.navigate(['/home']);
          } else {
            this.loginError = "Email ou mot de passe incorrect.";
          }
        },
        (error) => {
          this.loginError = "Une erreur s'est produite lors de la tentative de connexion.";
        }
      )
      ;
    } else {
      console.error('Les champs email et mot de passe sont obligatoires.'); // Affiche une erreur si le nom d'utilisateur ou le mot de passe est vide
    }
  }

  passwordForgotten() {

  }
}


